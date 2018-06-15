import {
  FETCHING_TRANSACTIONS,
  FETCHING_TRANSACTIONS_SUCCESS,
  FETCHING_TRANSACTIONS_FAILURE,
} from '@/store/modules/entities/transactions';

const state = {
  isFetchingTransactions: false,
  fetchingTransactionsSuccess: false,
  fetchingTransactionsError: null,
};

const mutations = {
  [FETCHING_TRANSACTIONS](state) {
    state.isFetchingTransactions = true;
  },
  [FETCHING_TRANSACTIONS_SUCCESS](state) {
    state.isFetchingTransactions = false;
    state.fetchingTransactionsSuccess = true;
    state.fetchingTransactionsError = true;
  },
  [FETCHING_TRANSACTIONS_FAILURE](state, payload) {
    state.isFetchingTransactions = false;
    state.fetchingTransactionsSuccess = false;
    state.fetchingTransactionsError = payload.error;
  },
};

export default {
  state,
  mutations,
};
