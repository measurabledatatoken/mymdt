const state = {
  errorMessage: null,
  errorTitle: null,
  showErrorPrompt: null,
};

const getters = {
  errorMessage: state => state.errorMessage,
  errorTitle: state => state.errorTitle,
  showErrorPrompt: state => state.showErrorPrompt,
};

const mutations = {
  setErrorMessage(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  setErrorTitle(state, errorTitle) {
    state.errorTitle = errorTitle;
  },
  setShowErrorPrompt(state, showErrorPrompt) {
    state.showErrorPrompt = showErrorPrompt;
  },
};

const actions = {

};


export default{
  state,
  getters,
  actions,
  mutations,
};
