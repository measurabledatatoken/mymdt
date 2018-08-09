import router from '@/router';

export const SET_ERROR_MESSAGE = 'common/SET_ERROR_MESSAGE';
export const SET_ERROR_TITLE = 'common/SET_ERROR_TITLE';
export const SET_ERROR_REDIRECT = 'common/SET_ERROR_REDIRECT';
export const SET_SHOW_ERROR_PROMPT = 'common/SET_SHOW_ERROR_PROMPT';
export const SET_IS_LOADING = 'common/SET_IS_LOADING';

export const SET_NAVIGATION_TITLE = 'common/SET_NAVIGATION_TITLE';
export const SET_HIDE_NAVIGATION_BACK_BUTTON =
  'common/SET_HIDE_NAVIGATION_BACK_BUTTON';
export const SET_LOCALE = 'common/SET_LOCALE';
export const ADD_NAVIGATION_STACK = 'common/ADD_NAVIGATION_STACK';
export const POP_NAVIGATION_STACK = 'common/POP_NAVIGATION_STACK';
export const POP_NAVIGATION_STACK_TO_PATH =
  'common/POP_NAVIGATION_STACK_TO_PATH';
export const FLUSH_NAVIGATION_STACK = 'common./FLUSH_NAVIGATION_STACK';
export const SET_SHOW_HOME_LOADING_END = 'common/SET_SHOW_HOME_LOADING_END';

// Actions
export const BACK_TO_FIRSTPAGE = 'common/BACK_TO_FIRSTPAGE';
export const BACK_TO_PATH = 'common/BACK_TO_PATH';

export const OPEN_ERROR_PROMPT = 'common/OPEN_ERROR_PROMPT';
export const DISMISS_ERROR_PROMPT = 'common/DISMISS_ERROR_PROMPT';

const state = {
  errorMessage: null,
  errorTitle: null,
  showErrorPrompt: null,
  isLoading: false,
  navigationTitle: '',
  hideNavigationBackButton: false,
  locale: null,
  navigationStack: [],

  showHomeLoadingEnd: false,
};

const getters = {
  // eslint-disable-next-line
  isPathExistInNavigationStack: (state, getters, rootState, rootGetters) => (path) => {
    for (let i = 0; i < state.navigationStack.length; i += 1) {
      const navigationPath = state.navigationStack[i];
      if (navigationPath === path) {
        return true;
      }
    }
    return false;
  },
  // eslint-disable-next-line
  getPathDepthInNavigationStack: (state, getters, rootState, rootGetters) => (path) => {
    let depth = 0;
    for (let i = state.navigationStack.length - 1; i >= 0; i -= 1) {
      const navigationPath = state.navigationStack[i];
      depth += 1;
      if (navigationPath === path) {
        break;
      }
    }
    return depth;
  },
};

const mutations = {
  [SET_ERROR_MESSAGE](state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  [SET_ERROR_TITLE](state, errorTitle) {
    state.errorTitle = errorTitle;
  },
  [SET_ERROR_REDIRECT](state, errorRedirect) {
    state.errorRedirect = errorRedirect;
  },
  [SET_SHOW_ERROR_PROMPT](state, showErrorPrompt) {
    state.showErrorPrompt = showErrorPrompt;
  },
  [SET_IS_LOADING](state, isLoading) {
    state.isLoading = isLoading;
  },
  [SET_NAVIGATION_TITLE](state, navigationTitle) {
    state.navigationTitle = navigationTitle;
  },
  [SET_HIDE_NAVIGATION_BACK_BUTTON](state, hideNavigationBackButton) {
    state.hideNavigationBackButton = hideNavigationBackButton;
  },
  [SET_LOCALE](state, locale) {
    state.locale = locale;
  },
  [ADD_NAVIGATION_STACK](state, navigationPath) {
    state.navigationStack.push(navigationPath);
  },
  [POP_NAVIGATION_STACK](state) {
    state.navigationStack.pop();
  },
  [POP_NAVIGATION_STACK_TO_PATH](state, path) {
    const stackLength = state.navigationStack.length;
    while (stackLength > 0) {
      const lastPath = state.navigationStack.pop();

      if (lastPath === path) {
        break;
      }
    }
  },
  [FLUSH_NAVIGATION_STACK](state) {
    state.navigationStack = [];
  },
  [SET_SHOW_HOME_LOADING_END](state, showHomeLoadingEnd) {
    state.showHomeLoadingEnd = showHomeLoadingEnd;
  },
};

const actions = {
  [BACK_TO_FIRSTPAGE](context) {
    const depth = context.state.navigationStack.length;
    router.go(-depth);
  },
  [BACK_TO_PATH](context, path) {
    const depth = context.getters.getPathDepthInNavigationStack(path);
    router.go(-depth);
  },
  [OPEN_ERROR_PROMPT]({ commit }, { message, title, redirectUrl }) {
    commit(SET_ERROR_MESSAGE, message);
    commit(SET_ERROR_TITLE, title);
    commit(SET_ERROR_REDIRECT, redirectUrl);
    commit(SET_SHOW_ERROR_PROMPT, true);
  },
  [DISMISS_ERROR_PROMPT]({ commit }) {
    commit(SET_ERROR_MESSAGE, null);
    commit(SET_ERROR_TITLE, null);
    commit(SET_ERROR_REDIRECT, null);
    commit(SET_SHOW_ERROR_PROMPT, false);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
