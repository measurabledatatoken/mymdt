import api from '@/api';
import { delay } from '@/utils';

import { REQUEST } from '@/store/modules/api';

export const FETCHING_DATA_POINT_REWARDS =
  'dataPointRewards/FETCHING_DATA_POINT_REWARDS';
export const FETCHING_DATA_POINT_REWARDS_SUCCESS =
  'dataPointRewards/FETCHING_DATA_POINT_REWARDS_SUCCESS';
export const FETCHING_DATA_POINT_REWARDS_FAILURE =
  'dataPointRewards/FETCHING_DATA_POINT_REWARDS_FAILURE';
export const FETCH_DATA_POINT_REWARDS =
  'dataPointRewards/FETCH_DATA_POINT_REWARDS';

export const FETCHING_DATA_POINT_CONFIG =
  'dataPointRewards/FETCHING_DATA_POINT_CONFIG';
export const FETCHING_DATA_POINT_CONFIG_SUCCESS =
  'dataPointRewards/FETCHING_DATA_POINT_CONFIG_SUCCESS';
export const FETCHING_DATA_POINT_CONFIG_FAILURE =
  'dataPointRewards/FETCHING_DATA_POINT_CONFIG_FAILURE';
export const FETCH_DATA_POINT_CONFIG =
  'dataPointRewards/FETCH_DATA_POINT_CONFIG';

export const FETCHING_DATA_POINT_SUMMARY =
  'dataPointRewards/FETCHING_DATA_POINT_SUMMARY';
export const FETCHING_DATA_POINT_SUMMARY_SUCCESS =
  'dataPointRewards/FETCHING_DATA_POINT_SUMMARY_SUCCESS';
export const FETCHING_DATA_POINT_SUMMARY_FAILURE =
  'dataPointRewards/FETCHING_DATA_POINT_SUMMARY_FAILURE';
export const FETCH_DATA_POINT_SUMMARY =
  'dataPointRewards/FETCH_DATA_POINT_SUMMARY';

const state = {
  byUserId: {},
};

const moduleGetters = {
  getDataPointRewardIdsByUser: state => userId =>
    (state.byUserId[userId] && state.byUserId[userId].ids) || [],
  getDataPointConfig: state => userId =>
    (state.byUserId[userId] && state.byUserId[userId].config) || {},
  getDataPointSummary: state => userId =>
    (state.byUserId[userId] && state.byUserId[userId].summary) || null,
  getDataPointRewardCursors: state => userId =>
    (state.byUserId[userId] && state.byUserId[userId].cursors) || null,
};

const mutations = {
  [FETCHING_DATA_POINT_REWARDS_SUCCESS](state, payload) {
    const {
      data: { result },
      userId,
      meta,
      cursorDirection,
    } = payload;

    const existingData =
      (state.byUserId[userId] && state.byUserId[userId].ids) || [];

    const existingCursors = moduleGetters.getDataPointRewardCursors(state)(
      userId,
    );

    let newIds = result;
    let newCursors = (meta && meta.paging && meta.paging.cursors) || {};

    if (cursorDirection === 'before') {
      newIds = [...result, ...existingData];
      if (existingCursors && newCursors && newCursors.before) {
        newCursors = {
          ...existingCursors,
          before: newCursors.before,
        };
      } else {
        newCursors = existingCursors;
      }
    } else if (cursorDirection === 'after') {
      newIds = [...existingData, ...result];
      if (existingCursors && newCursors && newCursors.after) {
        newCursors = {
          ...existingCursors,
          after: newCursors.after,
        };
      } else {
        newCursors = existingCursors;
      }
    }

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...state.byUserId[userId],
        ids: newIds,
        cursors: newCursors,
      },
    };
  },
  [FETCHING_DATA_POINT_CONFIG_SUCCESS](state, payload) {
    const { data, userId } = payload;

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...state.byUserId[userId],
        config: data,
      },
    };
  },
  [FETCHING_DATA_POINT_SUMMARY_SUCCESS](state, payload) {
    const { data, userId } = payload;

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...state.byUserId[userId],
        summary: data,
      },
    };
  },
};

const actions = {
  async [FETCH_DATA_POINT_REWARDS](
    { commit, dispatch, getters, rootGetters },
    { userId, sortby, order = 'desc', cursorDirection, limit = 2 },
  ) {
    if (!cursorDirection) {
      commit(FETCHING_DATA_POINT_REWARDS, {
        userId,
      });
    }
    try {
      const { after, before } = getters.getDataPointRewardCursors(userId) || {};

      const cursors = {};
      switch (cursorDirection) {
        case 'after': {
          cursors.after = after;
          break;
        }
        case 'before': {
          cursors.before = before;
          break;
        }
      }
      await delay(750);
      const data = await dispatch(REQUEST, {
        api: api.dataPoint.getRewards,
        args: [
          rootGetters.getUser(userId).accessToken,
          {
            sortby,
            order,
            limit,
            cursors,
          },
        ],
      });

      commit(FETCHING_DATA_POINT_REWARDS_SUCCESS, {
        userId,
        data,
        meta: data.meta,
        cursorDirection,
      });
    } catch (error) {
      console.log('error', error);
      commit(FETCHING_DATA_POINT_REWARDS_FAILURE, {
        userId,
        error,
      });
    }
  },
  async [FETCH_DATA_POINT_CONFIG](
    { commit, dispatch, rootState, rootGetters },
    { userId },
  ) {
    commit(FETCHING_DATA_POINT_CONFIG, {
      userId,
    });
    try {
      const data = await dispatch(REQUEST, {
        api: api.dataPoint.getConfig,
        args: [rootState.home.appID, rootGetters.getUser(userId).accessToken],
      });

      commit(FETCHING_DATA_POINT_CONFIG_SUCCESS, {
        userId,
        data,
      });
    } catch (error) {
      console.log('error', error);
      commit(FETCHING_DATA_POINT_CONFIG_FAILURE, {
        userId,
        error,
      });
    }
  },
  async [FETCH_DATA_POINT_SUMMARY](
    { commit, dispatch, rootGetters },
    { userId },
  ) {
    commit(FETCHING_DATA_POINT_SUMMARY, {
      userId,
    });
    try {
      const data = await dispatch(REQUEST, {
        api: api.dataPoint.getSummary,
        args: [rootGetters.getUser(userId).accessToken],
      });

      commit(FETCHING_DATA_POINT_SUMMARY_SUCCESS, {
        userId,
        data,
      });
    } catch (error) {
      console.log('error', error);
      commit(FETCHING_DATA_POINT_SUMMARY_FAILURE, {
        userId,
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
