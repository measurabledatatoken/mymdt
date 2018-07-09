import api from '@/api';
import {
  SET_IS_LOADING,
  OPEN_ERROR_PROMPT,
} from '@/store/modules/common';
import { forcePromiseToRunForAtLeast } from '@/utils';

export const GET_BETA_TESTING_SESSION = 'betaTesting/GET_BETA_TESTING_SESSION';
export const REQUEST_BETA_TESTING_SESSION = 'betaTesting/REQUEST_BETA_TESTING_SESSION';

const SET_DEVICE_ID = 'betaTesting/SET_DEVICE_ID';

const state = {
  deviceId: '',
};

const actions = {
  [GET_BETA_TESTING_SESSION]({ commit, dispatch }, deviceId) {
    commit(SET_DEVICE_ID, {
      deviceId,
    });
    commit(SET_IS_LOADING, true);
    return forcePromiseToRunForAtLeast(api.device.getBetaTestingSession(deviceId), 500)
      .then((data) => {
        commit(SET_IS_LOADING, false);
        return data.session_exists;
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
        return true;
      })
      .catch(() => {
        commit(SET_IS_LOADING, false);
        return false;
      });
  },
};

const mutations = {
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
