import { FETCHING_TASKS, FETCHING_TASKS_SUCCESS, FETCHING_TASKS_FAILURE } from '@/store/modules/entities/users';

const updateUser = (userState = {
  isFetching: false,
  fetchingSuccess: false,
  fetchingError: null,
}, mutationType, payload) => {
  switch (mutationType) {
    case FETCHING_TASKS: {
      return {
        ...userState,
        isFetching: true,
      };
    }
    case FETCHING_TASKS_SUCCESS: {
      return {
        isFetching: false,
        fetchingSuccess: true,
        fetchingError: null,
      };
    }
    case FETCHING_TASKS_FAILURE: {
      return {
        ...userState,
        isFetching: true,
        fetchingSuccess: false,
        fetchingError: payload.error,
      };
    }
    default: {
      return userState;
    }
  }
};

const state = {};

const mutations = {
  [FETCHING_TASKS](state, payload) {
    state[payload.id] = updateUser(state[payload.id], FETCHING_TASKS, payload);
  },
  [FETCHING_TASKS_SUCCESS](state, payload) {
    state[payload.id] = updateUser(state[payload.id], FETCHING_TASKS_SUCCESS, payload);
  },
  [FETCHING_TASKS_FAILURE](state, payload) {
    state[payload.id] = updateUser(state[payload.id], FETCHING_TASKS_FAILURE, payload);
  },
};

export default{
  state,
  mutations,
};
