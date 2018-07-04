import api from '@/api';
import {
  SET_IS_LOADING,
  OPEN_ERROR_PROMPT,
} from '@/store/modules/common';

export const GET_BETA_TESTING_SESSION = 'device/GET_BETA_TESTING_SESSION';
export const REQUEST_BETA_TESTING_SESSION = 'device/REQUEST_BETA_TESTING_SESSION';

const SET_BETA_TESTING_RESULT = 'device/SET_BETA_TESTING_RESULT';

const state = {
  betaTestingSessionChecked: false,
  betaTestingSessionExists: false,
};

const actions = {
  [GET_BETA_TESTING_SESSION]({ commit, dispatch }, deviceId) {
    commit(SET_BETA_TESTING_RESULT, {
      checked: false,
      exists: false,
    });
    commit(SET_IS_LOADING, true);
    return api.device.getBetaTestingSession(deviceId)
      .then((session) => {
        commit(SET_IS_LOADING, false);
        commit(SET_BETA_TESTING_RESULT, {
          checked: true,
          exists: !!session,
        });
      })
      .catch(() => {
        commit(SET_IS_LOADING, false);
        dispatch(OPEN_ERROR_PROMPT, {
          message: {
            messageId: 'message.common.unknow_error',
          },
          title: {
            messageId: 'message.common.error_title',
          },
        });
      });
  },
  [REQUEST_BETA_TESTING_SESSION]({ commit }, accessCode) {
    commit(SET_IS_LOADING, true);

    return api.device.requestBetaTestingSession(accessCode)
      .then(() => {
        commit(SET_IS_LOADING, false);
        commit(SET_BETA_TESTING_RESULT, {
          exists: true,
        });
        return true;
      })
      .catch((error) => {
        commit(SET_IS_LOADING, false);
        throw error;
      });
  },
};

const mutations = {
  [SET_BETA_TESTING_RESULT](state, payload) {
    const { checked, exists } = payload;
    state.betaTestingSessionChecked = checked || state.betaTestingSessionChecked;
    state.betaTestingSessionExists = exists || state.betaTestingSessionExists;
  },
};

export default {
  state,
  actions,
  mutations,
};
