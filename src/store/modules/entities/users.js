import api from '@/api';
import { delay } from '@/utils';

import { FETCHING_REWARDS_SUCCESS } from '@/store/modules/entities/rewards';
import { FETCHING_TRANSACTIONS_SUCCESS } from '@/store/modules/entities/transactions';

export const FETCHING_USER = 'users/FETCHING_USER';
export const FETCHING_USER_SUCCESS = 'users/FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAILURE = 'users/FETCHING_USER_FAILURE';
export const FETCHING_TASKS = 'users/FETCHING_TASKS';
export const FETCHING_TASKS_SUCCESS = 'users/FETCHING_TASKS_SUCCESS';
export const FETCHING_TASKS_FAILURE = 'users/FETCHING_TASKS_FAILURE';
export const SET_USERS = 'users/SET_USERS';

export const FETCH_USER = 'users/FETCH_USER';
export const FETCH_ALL_TASKS = 'users/FETCH_ALL_TASKS';
export const FETCH_TASKS = 'users/FETCH_TASKS';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getUser: state => id => state.byId[id],
  getAllUsers: state => state.allIds.map(id => state.byId[id]),
};

const mutations = {
  [SET_USERS](state, payload) {
    const { byId, allIds } = payload;
    state.byId = {
      ...state.byId,
      ...byId,
    };
    state.allIds = allIds;
  },
  [FETCHING_USER_SUCCESS](state, payload) {
    const { userId, data } = payload;
    state.byId = {
      ...state.byId,
      [userId]: {
        ...state.byId[userId],
        ...data,
      },
    };
    state.allIds = [...new Set([...state.allIds, userId])];
  },
  [FETCHING_TASKS_SUCCESS](state, payload) {
    const { id, data } = payload;
    state.byId = {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        tasks: data,
      },
    };
  },
  [FETCHING_REWARDS_SUCCESS](state, payload) {
    const { id, data } = payload;
    const orginalRewards = (state.byId[id] && state.byId[id].transactions) || [];

    state.byId = {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        rewards: [...new Set([...orginalRewards, ...data.result])],
      },
    };
  },
  [FETCHING_TRANSACTIONS_SUCCESS](state, payload) {
    const { userId, data } = payload;
    const orginalTransactions = (state.byId[userId] && state.byId[userId].transactions) || [];

    state.byId = {
      ...state.byId,
      [userId]: {
        ...state.byId[userId],
        transactions: [...new Set([...orginalTransactions, ...data.result])],
      },
    };
  },
};

const actions = {
  [FETCH_USER]({ commit, getters }, { userId }) {
    commit(FETCHING_USER, {
      userId,
    });
    return api.account.getAccount(getters.getUser(userId).accessToken)
      .then(data => commit(FETCHING_USER_SUCCESS, {
        userId,
        data,
      }))
      .catch(error => commit(FETCHING_USER_FAILURE, {
        userId,
        error,
      }));
  },
  [FETCH_ALL_TASKS]({ state, dispatch }) {
    return Promise.all(
      state.allIds.map(
        userId => dispatch(FETCH_TASKS, {
          userId,
        }),
      ));
  },
  [FETCH_TASKS]({ commit, rootState, getters }, { userId }) {
    commit(FETCHING_TASKS, {
      id: userId,
    });
    return delay(750).then(() => api.task.getTasks(rootState.home.appID, getters.getUser(userId).accessToken))
      .then(data => commit(FETCHING_TASKS_SUCCESS, {
        id: userId,
        data,
      }))
      .catch(error => commit(FETCHING_TASKS_FAILURE, {
        id: userId,
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
