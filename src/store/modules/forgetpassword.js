import api from './../../api';

const state = {
  forgetSuccess: null,
};

const getters = {
  forgetSuccess: state => state.forgetSuccess,
};

const mutations = {
  setForgetSuccess(state, forgetSuccess) {
    state.forgetSuccess = forgetSuccess;
  },
};

const actions = {
  confirmForgetPassword(context, emailAddress) {
    api.forgetPassword(emailAddress)
      .then(
        () => context.commit('setForgetSuccess', true),
      )
      .catch(
        () => {
          context.commit('setForgetSuccess', false);
        },
      );
  },
};


export default{
  state,
  getters,
  actions,
  mutations,
};
