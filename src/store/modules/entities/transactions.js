import api from '@/api';
import { delay } from '@/utils';

export const FETCHING_TRANSACTIONS = 'transaction/FETCHING_TRANSACTIONS';
export const FETCHING_TRANSACTIONS_SUCCESS = 'transaction/FETCHING_TRANSACTIONS_SUCCESS';
export const FETCHING_TRANSACTIONS_FAILURE = 'transaction/FETCHING_TRANSACTIONS_FAILURE';

export const FETCH_TRANSACTIONS = 'transaction/FETCH_TRANSACTIONS';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getTransaction: state => id => state.byId[id],
  getTransactions: (state, getters) => (ids = []) => ids.map(id => getters.getTransaction(id)),
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
  [FETCH_TRANSACTIONS]({ commit, rootGetters }, { userId }) {
    commit(FETCHING_TRANSACTIONS, {
      userId,
    });
    return Promise.all([
      api.transaction.getTransactions(rootGetters.getUser(userId).accessToken),
      delay(750),
    ])
      .then(([data]) => commit(FETCHING_TRANSACTIONS_SUCCESS, {
        userId,
        data,
      }))
      .catch(error => commit(FETCHING_TRANSACTIONS_FAILURE, {
        userId,
        error,
      }));
  },
};

export default{
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
