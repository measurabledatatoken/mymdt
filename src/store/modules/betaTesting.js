import api from '@/api';
import { REQUEST } from '@/store/modules/api';

export const GET_BETA_TESTING_SESSION = 'betaTesting/GET_BETA_TESTING_SESSION';
export const REQUEST_BETA_TESTING_SESSION = 'betaTesting/REQUEST_BETA_TESTING_SESSION';

const SET_DEVICE_ID = 'betaTesting/SET_DEVICE_ID';

const state = {
  deviceId: '',
};

const actions = {
  async [GET_BETA_TESTING_SESSION]({ commit, dispatch }, deviceId) {
    commit(SET_DEVICE_ID, {
      deviceId,
    });

    try {
      const response = await dispatch(REQUEST, {
        api: api.device.getBetaTestingSession,
        args: deviceId,
        setLoading: true,
        runForAtLeast: 500,
        openErrorPrompt: 'default',
      });
      return response.session_exists;
    } catch (error) {
      return false;
    }
  },
  async [REQUEST_BETA_TESTING_SESSION]({ dispatch }, { deviceId, accessCode }) {
    try {
      await dispatch(REQUEST, {
        api: api.device.requestBetaTestingSession,
        args: [deviceId, accessCode],
        setLoading: true,
        runForAtLeast: 500,
        openErrorPrompt: false,
      });

      return true;
    } catch (error) {
      return false;
    }
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
