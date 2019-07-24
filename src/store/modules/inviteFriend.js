import api from '@/api';
import { delay } from '@/utils';

import { REQUEST } from '@/store/modules/api';

export const FETCHING_INVITE_FRIEND_REWARD_HISTORIES =
  'inviteFriendRewardHistory/FETCHING_INVITE_FRIEND_REWARD_HISTORIES';
export const FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS =
  'inviteFriendRewardHistory/FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS';
export const FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE =
  'inviteFriendRewardHistory/FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE';
export const FETCH_INVITE_FRIEND_REWARD_HISTORIES =
  'inviteFriendRewardHistory/FETCH_INVITE_FRIEND_REWARD_HISTORIES';

export const FETCHING_INVITE_INFO =
  'inviteFriendRewardHistory/FETCHING_INVITE_INFO';
export const FETCHING_INVITE_INFO_SUCCESS =
  'inviteFriendRewardHistory/FETCHING_INVITE_INFO_SUCCESS';
export const FETCHING_INVITE_INFO_FAILURE =
  'inviteFriendRewardHistory/FETCHING_INVITE_INFO_FAILURE';
export const FETCH_INVITE_INFO = 'inviteFriendRewardHistory/FETCH_INVITE_INFO';

const state = {
  byUserId: {},
};

const moduleGetters = {
  getRewardHistoryCursors: state => userId =>
    (state.byUserId[userId] &&
      state.byUserId[userId].rewardSummary &&
      state.byUserId[userId].rewardSummary.cursors) ||
    null,
  getRewardSummary: state => userId =>
    (state.byUserId[userId] && state.byUserId[userId].rewardSummary) || null,
  getInviteInfo: state => userId =>
    (state.byUserId[userId] && state.byUserId[userId].inviteInfo) || null,
};

const mutations = {
  [FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS](state, payload) {
    const { data, userId, cursorDirection } = payload;

    const existingRewardHistory =
      (state.byUserId[userId] &&
        state.byUserId[userId].rewardSummary &&
        state.byUserId[userId].rewardSummary.reward_history) ||
      [];

    const existingCursors = moduleGetters.getRewardHistoryCursors(state)(
      userId,
    );

    let newRewardHistory = data.reward_history;
    const newCursors =
      (data.meta && data.meta.paging && data.meta.paging.cursors) || {};

    let resultCursors = existingCursors;

    if (cursorDirection === 'before') {
      newRewardHistory = [...data.reward_history, ...existingRewardHistory];
      if (existingCursors && newCursors && newCursors.before) {
        resultCursors = {
          ...existingCursors,
          before: newCursors.before,
        };
      }
    } else if (cursorDirection === 'after') {
      newRewardHistory = [...existingRewardHistory, ...data.reward_history];
      if (existingCursors && newCursors && newCursors.after) {
        resultCursors = {
          ...existingCursors,
          after: newCursors.after,
        };
      }
    } else {
      resultCursors = newCursors;
    }

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...state.byUserId[userId],
        rewardSummary: {
          ...data,
          cursors: resultCursors,
          reward_history: newRewardHistory,
        },
      },
    };
  },
  [FETCHING_INVITE_INFO_SUCCESS](state, payload) {
    const { data, userId } = payload;

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...state.byUserId[userId],
        inviteInfo: data,
      },
    };
  },
};

const actions = {
  async [FETCH_INVITE_FRIEND_REWARD_HISTORIES](
    { commit, dispatch, getters, rootGetters },
    { userId, sortby, order = 'desc', cursorDirection, limit = 2 },
  ) {
    if (!cursorDirection) {
      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES, {
        userId,
      });
    }
    try {
      const { after, before } = getters.getRewardHistoryCursors(userId) || {};

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
        api: api.inviteFriend.getRewardSummary,
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

      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS, {
        userId,
        data,
        cursorDirection,
      });
    } catch (error) {
      console.log('error', error);
      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE, {
        userId,
        error,
      });
    }
  },
  async [FETCH_INVITE_INFO]({ commit, dispatch, rootGetters }, { userId }) {
    commit(FETCHING_INVITE_INFO, {
      userId,
    });
    try {
      const data = await dispatch(REQUEST, {
        api: api.inviteFriend.getInviteInfo,
        args: [rootGetters.getUser(userId).accessToken],
      });

      commit(FETCHING_INVITE_INFO_SUCCESS, {
        userId,
        data,
      });
    } catch (error) {
      console.log('error', error);
      commit(FETCHING_INVITE_INFO_FAILURE, {
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
