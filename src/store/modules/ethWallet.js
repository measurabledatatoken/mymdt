import api from '@/api';
// import { delay } from '@/utils';

import { REQUEST } from '@/store/modules/api';
// import { FETCH_USER } from '@/store/modules/entities/users';

export const FETCHING_TRANSACTIONS =
  'ethWalletTransaction/FETCHING_TRANSACTIONS';
export const FETCHING_TRANSACTIONS_SUCCESS =
  'ethWalletTransaction/FETCHING_TRANSACTIONS_SUCCESS';
export const FETCHING_TRANSACTIONS_FAILURE =
  'ethWalletTransaction/FETCHING_TRANSACTIONS_FAILURE';

export const FETCH_TRANSACTIONS = 'ethWalletTransaction/FETCH_TRANSACTIONS';
export const CANCEL_TRANSACTION = 'ethWalletTransaction/CANCEL_TRANSACTION';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getETHWalletTransaction: state => id => state.byId[id],
  getETHWalletTransactions: (state, getters) => (ids = []) =>
    ids.map(id => getters.getETHWalletTransaction(id)),
};

const mutations = {
  [FETCHING_TRANSACTIONS_SUCCESS](state, payload) {
    const { data } = payload;
    state.byId = {
      ...state.byId,
      ...data.entities.transactions,
    };
    state.allIds = [...new Set([...state.allIds, ...data.result])];
  },
};

const actions = {
  async [FETCH_TRANSACTIONS]({ commit, dispatch }, { walletAddress }) {
    commit(FETCHING_TRANSACTIONS, {
      walletAddress,
    });

    try {
      const data = await dispatch(REQUEST, {
        api: api.ethWallet.getTransactions,
        args: [walletAddress],
      });

      commit(FETCHING_TRANSACTIONS_SUCCESS, {
        walletAddress,
        data,
      });
    } catch (error) {
      commit(FETCHING_TRANSACTIONS_FAILURE, {
        error,
      });
    }
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
