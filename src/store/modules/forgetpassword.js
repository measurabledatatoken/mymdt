import api from '@/api';
import { REQUEST } from '@/store/modules/api';

// Mutations
export const SET_FORGET_SUCCESS = 'forgetPassword/SET_FORGET_SUCCESS';

// Actions
export const REQUEST_FORGET_PASSWORD = 'forgetPassword/REQUEST_FORGET_PASSWORD';

const state = {
  forgetSuccess: null,
};

const mutations = {
  [SET_FORGET_SUCCESS](state, forgetSuccess) {
    state.forgetSuccess = forgetSuccess;
  },
};

const actions = {
  async [REQUEST_FORGET_PASSWORD]({ commit, dispatch }, emailAddress) {
    try {
      await dispatch(REQUEST, {
        api: api.auth.forgetPassword,
        args: [emailAddress],
      });
      commit([SET_FORGET_SUCCESS], true);
    } catch (error) {
      console.log('REQUEST_FORGET_PASSWORD ERROR: ' + error);
      commit([SET_FORGET_SUCCESS], false);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
