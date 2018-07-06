import api from '@/api';
import {
  SET_IS_LOADING,
  OPEN_ERROR_PROMPT,
} from '@/store/modules/common';
import { runAtLeast } from '@/utils';

export const GET_BETA_TESTING_SESSION = 'device/GET_BETA_TESTING_SESSION';
export const REQUEST_BETA_TESTING_SESSION = 'device/REQUEST_BETA_TESTING_SESSION';

const SET_BETA_TESTING_RESULT = 'device/SET_BETA_TESTING_RESULT';
const SET_DEVICE_ID = 'device/SET_DEVICE_ID';

const state = {
  deviceId: '',
  betaTestingSessionChecked: false,
  betaTestingSessionExists: false,
};

const actions = {
  [GET_BETA_TESTING_SESSION]({ commit, dispatch }, deviceId) {
    commit(SET_BETA_TESTING_RESULT, {
      checked: false,
      exists: false,
    });
    commit(SET_DEVICE_ID, {
      deviceId,
    });
    commit(SET_IS_LOADING, true);
    return runAtLeast(api.device.getBetaTestingSession(deviceId), 500)
      .then((data) => {
        commit(SET_IS_LOADING, false);
        commit(SET_BETA_TESTING_RESULT, {
          checked: true,
          exists: data.session_exists,
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
  [REQUEST_BETA_TESTING_SESSION]({ commit }, { deviceId, accessCode }) {
    commit(SET_IS_LOADING, true);

    return api.device.requestBetaTestingSession(deviceId, accessCode)
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
  [SET_DEVICE_ID](state, payload) {
    const { deviceId } = payload;
    state.deviceId = deviceId || state.deviceId;
  },
};

export default {
  state,
  actions,
  mutations,
};
