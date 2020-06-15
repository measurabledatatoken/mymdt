import api from '@/api';

import { SET_USERS } from '@/store/modules/entities/users';
import { regTrackingSuperProperties } from '@/utils';
import { REQUEST } from '@/store/modules/api';

// Mutations
export const SET_MDT_PRICE = 'home/SET_MDT_PRICE';
export const SET_NEED_EXIT_BTN = 'home/SET_NEED_EXIT_BTN';
export const SET_SELECTED_USER = 'home/SET_SELECTED_USER';
export const SET_APP_CONFIG = 'home/SET_APP_CONFIG';
export const SET_PRICE_UNIT = 'home/SET_PRICE_UNIT';
export const SET_IS_USER_ACCOUNTS_DIRTY = 'home/SET_IS_USER_ACCOUNTS_DIRTY';
export const SET_APP_ID = 'home/SET_APP_ID';
export const SET_NDA_AGREEMENT = 'home/SET_NDA_AGREEMENT';
export const SET_HEADER_BACKGROUND_COLOR = 'home/SET_HEADER_BACKGROUND_COLOR';

// Actions
export const REQUEST_MDT_PRICE = 'home/SET_MDT_PRICE';
export const REQUEST_APP_CONFIG = 'home/REQUEST_APP_CONFIG';
export const REQUEST_USER_ACCOUNTS = 'home/REQUEST_USER_ACCOUNTS';
export const CHECK_ACCOUNTS_EXIST = 'home/CHECK_ACCOUNTS_EXIST';

const state = {
  mdtPrice: 0,
  needExit: false,
  appID: '',
  selectedUserId: null,
  isUserAccountsDirty: false,
  priceUnit: 'USD',
  ndaAgreement: false,
  // AppConfig
  appConfig: null,
  headerBackgroundColor: null,
};

const getters = {
  // eslint-disable-next-line
  getSelectedUser: (state, getters, rootState, rootGetters) =>
    rootGetters.getUser(state.selectedUserId),
};

const mutations = {
  [SET_MDT_PRICE](state, mdtPrice) {
    state.mdtPrice = mdtPrice;
  },
  [SET_NEED_EXIT_BTN](state, needExit) {
    state.needExit = needExit;
  },
  [SET_SELECTED_USER](state, userId) {
    state.selectedUserId = userId;
    regTrackingSuperProperties({ 'Email Address': userId });
  },
  [SET_IS_USER_ACCOUNTS_DIRTY](state, isUserAccountsDirty) {
    state.isUserAccountsDirty = isUserAccountsDirty;
  },
  [SET_APP_CONFIG](state, appConfig) {
    state.appConfig = appConfig;
  },
  [SET_PRICE_UNIT](state, priceUnit) {
    state.priceUnit = priceUnit;
  },
  [SET_APP_ID](state, appID) {
    state.appID = appID;
  },
  [SET_NDA_AGREEMENT](state, ndaAgreement) {
    state.ndaAgreement = ndaAgreement;
  },
  [SET_HEADER_BACKGROUND_COLOR](state, headerBackgroundColor) {
    state.headerBackgroundColor = headerBackgroundColor;
  },
};

const actions = {
  async [REQUEST_MDT_PRICE]({ commit, dispatch, state }) {
    const priceUnit = state.priceUnit;
    try {
      const data = await dispatch(REQUEST, {
        api: api.misc.getMDTPrice,
        args: [priceUnit],
      });
      commit(SET_MDT_PRICE, data);
    } catch (error) {
      console.error('getMDTPrice failed', error);
    }
  },
  async [REQUEST_APP_CONFIG]({ commit, dispatch }) {
    try {
      const data = await dispatch(REQUEST, {
        api: api.misc.getAppConfig,
      });
      commit(SET_APP_CONFIG, data);
    } catch (error) {
      console.error('getAppConfig failed', error);
    }
  },
  async [REQUEST_USER_ACCOUNTS]({ commit, rootState, dispatch }) {
    const credentials = rootState.login.credentials;
    const validCredentials = [];
    credentials.forEach(credential => {
      if (credential.access_token.length > 0) {
        validCredentials.push(credential);
      }
    });

    try {
      const normalizeduserAccountData = await dispatch(REQUEST, {
        api: api.account.getUserAccountsData,
        args: [validCredentials],
        setLoading: true,
      });
      if (normalizeduserAccountData.result.length > 0) {
        commit(SET_USERS, {
          byId: normalizeduserAccountData.entities.users,
          allIds: normalizeduserAccountData.result,
        });

        commit(SET_SELECTED_USER, normalizeduserAccountData.result[0]);
      }
    } catch (error) {
      console.error(`error in REQUEST_USER_ACCOUNTS${error}`);
    }
  },
  async [CHECK_ACCOUNTS_EXIST]({ dispatch }, emails) {
    try {
      const result = await dispatch(REQUEST, {
        api: api.account.checkAccountsExist,
        args: [emails],
      });

      // return false if there is email which does not exist
      return !Object.keys(result).some(key => !result[key]);
    } catch (error) {
      console.error(`error in CHECK_ACCOUNTS_EXIST${error}`);
    }
    return false;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
