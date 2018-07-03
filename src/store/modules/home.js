import api from '@/api';

import { SET_USERS } from '@/store/modules/entities/users';

// Mutations
export const SET_MDT_PRICE = 'home/SET_MDT_PRICE';
export const SET_NEED_EXIT_BTN = 'home/SET_NEED_EXIT_BTN';
export const SET_SELECTED_USER = 'home/SET_SELECTED_USER';
export const SET_APP_CONFIG = 'home/SET_APP_CONFIG';
export const SET_PRICE_UNIT = 'home/SET_PRICE_UNIT';
export const SET_IS_USER_ACCOUNTS_DIRTY = 'home/SET_IS_USER_ACCOUNTS_DIRTY';
export const SET_APP_ID = 'home/SET_APP_ID';

// Actions
export const REQUEST_MDT_PRICE = 'home/SET_MDT_PRICE';
export const REQUEST_APP_CONFIG = 'home/REQUEST_APP_CONFIG';
export const REQUEST_USER_ACCOUNTS = 'home/REQUEST_USER_ACCOUNTS';

const state = {
  mdtPrice: 0,
  needExit: false,
  appID: '',
  selectedUserId: null,
  isUserAccountsDirty: false,
  priceUnit: 'USD',

  // AppConfig
  appConfig: null,
};

const getters = {
  // eslint-disable-next-line
  getSelectedUser: (state, getters, rootState, rootGetters) => rootGetters.getUser(state.selectedUserId),
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
};

const actions = {
  [REQUEST_MDT_PRICE]({ commit, state }) {
    const priceUnit = state.priceUnit;
    api.misc.getMDTPrice(priceUnit)
      .then(
        (data) => {
          if (!priceUnit) {
            commit(SET_MDT_PRICE, data.price_usd);
          } else {
            const priceUnitKey = `price_${priceUnit.toLowerCase()}`;
            commit(SET_MDT_PRICE, data[priceUnitKey]);
          }
        },
      )
      .catch(
        (error) => {
          console.log('getMDTPrice failed', error);
        },
      );
  },
  [REQUEST_APP_CONFIG](context) {
    api.misc.getAppConfig()
      .then(
        (data) => {
          context.commit(SET_APP_CONFIG, data);
        },
      )
      .catch(
        (error) => {
          console.log('getAppConfig failed', error);
        },
      );
  },
  [REQUEST_USER_ACCOUNTS](context) {
    const credentials = context.rootState.login.credentials;

    api.account.getUserAccountsData(credentials)
      .then(
        (normalizeduserAccountData) => {
          if (normalizeduserAccountData.result.length > 0) {
            context.commit(SET_USERS, {
              byId: normalizeduserAccountData.entities.users,
              allIds: normalizeduserAccountData.result,
            });

            context.commit(SET_SELECTED_USER, normalizeduserAccountData.result[0]);
          }
        },
      )
      .catch(
        (err) => {
          console.log(`Error in REQUEST_USER_ACCOUNTS${err}`);
        },
      );
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
