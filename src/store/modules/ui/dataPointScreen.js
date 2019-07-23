import {
  FETCHING_DATA_POINT_REWARDS,
  FETCHING_DATA_POINT_REWARDS_SUCCESS,
  FETCHING_DATA_POINT_REWARDS_FAILURE,
  FETCHING_DATA_POINT_CONFIG,
  FETCHING_DATA_POINT_CONFIG_SUCCESS,
  FETCHING_DATA_POINT_CONFIG_FAILURE,
  FETCHING_DATA_POINT_SUMMARY,
  FETCHING_DATA_POINT_SUMMARY_SUCCESS,
  FETCHING_DATA_POINT_SUMMARY_FAILURE,
} from '@/store/modules/dataPoint';

const state = {
  config: {
    byUserId: {},
  },
  rewards: {
    byUserId: {},
  },
  summary: {
    byUserId: {},
  },
};

const moduleGetters = {
  getDataPointConfigUiState: state => userId =>
    state.config.byUserId[userId] || {
      isFetching: false,
      fetchingSuccess: false,
      fetchingError: null,
    },
  getDataPointRewardsUiState: state => userId =>
    state.rewards.byUserId[userId] || {
      isFetching: false,
      fetchingSuccess: false,
      fetchingError: null,
    },
  getDataPointSummaryUiState: state => userId =>
    state.summary.byUserId[userId] || {
      isFetching: false,
      fetchingSuccess: false,
      fetchingError: null,
    },
};

const mutations = {
  [FETCHING_DATA_POINT_REWARDS](state, payload) {
    const { userId } = payload;

    state.rewards.byUserId = {
      ...state.rewards.byUserId,
      [userId]: {
        ...state.rewards.byUserId[userId],
        isFetching: true,
      },
    };
  },
  [FETCHING_DATA_POINT_REWARDS_SUCCESS](state, payload) {
    const { userId } = payload;

    state.rewards.byUserId = {
      ...state.rewards.byUserId,
      [userId]: {
        ...state.rewards.byUserId[userId],
        isFetching: false,
        fetchingSuccess: true,
        fetchingError: null,
      },
    };
  },
  [FETCHING_DATA_POINT_REWARDS_FAILURE](state, payload) {
    const { error, userId } = payload;

    state.rewards.byUserId = {
      ...state.rewards.byUserId,
      [userId]: {
        ...state.rewards.byUserId[userId],
        isFetching: false,
        fetchingSuccess: false,
        fetchingError: error,
      },
    };
  },
  [FETCHING_DATA_POINT_CONFIG](state, payload) {
    const { userId } = payload;

    state.config.byUserId = {
      ...state.config.byUserId,
      [userId]: {
        ...state.config.byUserId[userId],
        isFetching: true,
      },
    };
  },
  [FETCHING_DATA_POINT_CONFIG_SUCCESS](state, payload) {
    const { userId } = payload;

    state.config.byUserId = {
      ...state.config.byUserId,
      [userId]: {
        ...state.config.byUserId[userId],
        isFetching: false,
        fetchingSuccess: true,
        fetchingError: null,
      },
    };
  },
  [FETCHING_DATA_POINT_CONFIG_FAILURE](state, payload) {
    const { error, userId } = payload;

    state.config.byUserId = {
      ...state.config.byUserId,
      [userId]: {
        ...state.config.byUserId[userId],
        isFetching: false,
        fetchingSuccess: false,
        fetchingError: error,
      },
    };
  },
  [FETCHING_DATA_POINT_SUMMARY](state, payload) {
    const { userId } = payload;

    state.summary.byUserId = {
      ...state.summary.byUserId,
      [userId]: {
        ...state.summary.byUserId[userId],
        isFetching: true,
      },
    };
  },
  [FETCHING_DATA_POINT_SUMMARY_SUCCESS](state, payload) {
    const { userId } = payload;

    state.summary.byUserId = {
      ...state.summary.byUserId,
      [userId]: {
        ...state.summary.byUserId[userId],
        isFetching: false,
        fetchingSuccess: true,
        fetchingError: null,
      },
    };
  },
  [FETCHING_DATA_POINT_SUMMARY_FAILURE](state, payload) {
    const { error, userId } = payload;

    state.summary.byUserId = {
      ...state.summary.byUserId,
      [userId]: {
        ...state.summary.byUserId[userId],
        isFetching: false,
        fetchingSuccess: false,
        fetchingError: error,
      },
    };
  },
};

export default {
  state,
  mutations,
  getters: moduleGetters,
};
