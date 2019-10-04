import { FETCHING_TRANSACTIONS_SUCCESS } from '@/store/modules/ethWallet';

export const GET_TRANSACTION_BY_ID =
  'ethWalletTransaction/GET_TRANSACTION_BY_ID';
export const GET_TRANSACTIONS_BY_IDS =
  'ethWalletTransaction/GET_TRANSACTIONS_BY_IDS';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  [GET_TRANSACTION_BY_ID]: state => id => state.byId[id],
  [GET_TRANSACTIONS_BY_IDS]: (_state, getters) => (ids = []) =>
    ids.map(id => getters[GET_TRANSACTION_BY_ID](id)),
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

export default {
  state,
  getters: moduleGetters,
  mutations,
};
