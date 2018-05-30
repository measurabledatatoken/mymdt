import api from './../../api';

const FETCHING = 'transactions/FETCHING';
const FETCHING_SUCCESS = 'transactions/FETCHING_SUCCESS';
const FETCHING_FAILURE = 'transactions/FETCHING_FAILURE';

const state = {
  all: [],
  fetching: false,
  fetchSuccess: false,
  fetchFailure: null,
};

const mutations = {
  [FETCHING](state) {
    state.fetching = true;
    state.fetchSuccess = false;
    state.fetchFailure = null;
  },
  [FETCHING_SUCCESS](state, data) {
    state.fetching = false;
    state.fetchSuccess = true;
    state.fetchFailure = null;
    state.all = data;
  },
  [FETCHING_FAILURE](state, error) {
    state.fetching = false;
    state.fetchSuccess = false;
    state.fetchFailure = error;
  },
};

const actions = {
  getAccountTransactions({ commit }) {
    commit(FETCHING);
    api.account.getAccountTransactions()
      .then(
        (data) => {
          commit(FETCHING_SUCCESS, data);
        },
      )
      .catch(
        (error) => {
          commit(FETCHING_FAILURE, error);
        },
      );
  },
};

export default{
  state,
  actions,
  mutations,
};
