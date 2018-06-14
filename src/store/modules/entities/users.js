import api from '@/api';
import { delay } from '@/utils';

export const FETCHING_TASKS = 'users/FETCHING_TASKS';
export const FETCHING_TASKS_SUCCESS = 'users/FETCHING_TASKS_SUCCESS';
export const FETCHING_TASKS_FAILURE = 'users/FETCHING_TASKS_FAILURE';
export const SET_USERS = 'users/SET_USERS';

export const GET_ALL_TASKS = 'task/GET_ALL_TASKS';
export const GET_TASKS = 'task/GET_TASKS';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  // eslint-disable-next-line
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
};

const actions = {
  [GET_ALL_TASKS]({ state, dispatch }) {
    return Promise.all(
      state.allIds.map(
        userId => dispatch(GET_TASKS, {
          userId,
        }),
      ));
  },
  [GET_TASKS]({ commit, rootState, getters }, { userId }) {
    commit(FETCHING_TASKS, {
      id: userId,
    });
    return Promise.all([
      api.task.getTasks(rootState.home.appID, getters.getUser(userId).accessToken),
      delay(2000),
    ])
      .then(([data]) => commit(FETCHING_TASKS_SUCCESS, {
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
