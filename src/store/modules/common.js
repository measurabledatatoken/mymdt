export const SET_ERROR_MESSAGE = 'common/SET_ERROR_MESSAGE';
export const SET_ERROR_TITLE = 'common/SET_ERROR_TITLE';
export const SET_SHOW_ERROR_PROMPT = 'common/SET_SHOW_ERROR_PROMPT';
export const SET_NAVIGATION_TITLE = 'common/SET_NAVIGATION_TITLE';
export const SET_LOCALE = 'common/SET_LOCALE';

const state = {
  errorMessage: null,
  errorTitle: null,
  showErrorPrompt: null,
  navigationTitle: '',
  locale: null,
};

const mutations = {
  [SET_ERROR_MESSAGE](state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  [SET_ERROR_TITLE](state, errorTitle) {
    state.errorTitle = errorTitle;
  },
  [SET_SHOW_ERROR_PROMPT](state, showErrorPrompt) {
    state.showErrorPrompt = showErrorPrompt;
  },
  [SET_NAVIGATION_TITLE](state, navigationTitle) {
    state.navigationTitle = navigationTitle;
  },
  [SET_LOCALE](state, locale) {
    state.locale = locale;
  },
};

export default{
  state,
  mutations,
};
