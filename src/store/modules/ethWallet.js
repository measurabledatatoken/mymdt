import api from '@/api';

import { REQUEST } from '@/store/modules/api';

export const FETCHING_TRANSACTIONS = 'ethWallet/FETCHING_TRANSACTIONS';
export const FETCHING_TRANSACTIONS_SUCCESS =
  'ethWallet/FETCHING_TRANSACTIONS_SUCCESS';
export const FETCHING_TRANSACTIONS_FAILURE =
  'ethWallet/FETCHING_TRANSACTIONS_FAILURE';

export const FETCHING_BALANCE_SUCCESS = 'ethWallet/FETCHING_BALANCE_SUCCESS';

export const FETCH_TRANSACTIONS = 'ethWallet/FETCH_TRANSACTIONS';
export const FETCH_BALANCE = 'ethWallet/FETCH_BALANCE';

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
  async [FETCH_BALANCE]({ commit, dispatch }, walletAddress) {
    try {
      const data = await dispatch(REQUEST, {
        api: api.ethWallet.getBalance,
        args: [walletAddress],
      });

      commit(FETCHING_BALANCE_SUCCESS, {
        walletAddress,
        balance: data.balance,
      });
      // eslint-disable-next-line
    } catch {}
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
