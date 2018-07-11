import api from '@/api';

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
  [REQUEST_FORGET_PASSWORD](context, emailAddress) {
    api.auth
      .forgetPassword(emailAddress)
      .then(() => context.commit([SET_FORGET_SUCCESS], true))
      .catch(() => {
        context.commit([SET_FORGET_SUCCESS], false);
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
