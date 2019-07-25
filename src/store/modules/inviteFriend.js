import { schema, normalize } from 'normalizr';

import api from '@/api';
import { delay } from '@/utils';

import { REQUEST } from '@/store/modules/api';
import { FETCH_USER } from '@/store/modules/entities/users';

export const FETCHING_INVITE_FRIEND_REWARD_HISTORIES =
  'inviteFriendRewardHistory/FETCHING_INVITE_FRIEND_REWARD_HISTORIES';
export const FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS =
  'inviteFriendRewardHistory/FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS';
export const FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE =
  'inviteFriendRewardHistory/FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE';
export const FETCH_INVITE_FRIEND_REWARD_HISTORIES =
  'inviteFriendRewardHistory/FETCH_INVITE_FRIEND_REWARD_HISTORIES';

export const FETCHING_REWARD_HISTORIES_SUCCESS =
  'inviteFriendRewardHistory/FETCHING_REWARD_HISTORIES_SUCCESS';

export const FETCHING_INVITE_INFO =
  'inviteFriendRewardHistory/FETCHING_INVITE_INFO';
export const FETCHING_INVITE_INFO_SUCCESS =
  'inviteFriendRewardHistory/FETCHING_INVITE_INFO_SUCCESS';
export const FETCHING_INVITE_INFO_FAILURE =
  'inviteFriendRewardHistory/FETCHING_INVITE_INFO_FAILURE';
export const FETCH_INVITE_INFO = 'inviteFriendRewardHistory/FETCH_INVITE_INFO';

export const CLAIMING_REWARD_SUCCESS =
  'inviteFriendRewardHistory/CLAIMING_REWARD_SUCCESS';
export const CLAIM_REWARD = 'inviteFriendRewardHistory/CLAIM_REWARD';

export const FETCHING_REWARD_SUMMARY_WITHOUT_HISTORY_SUCCUESS =
  'inviteFriendRewardHistory/FETCHING_REWARD_SUMMARY_WITHOUT_HISTORY_SUCCUESS';
export const FETCH_REWARD_SUMMARY_WITHOUT_HISTORY =
  'inviteFriendRewardHistory/FETCH_REWARD_SUMMARY_WITHOUT_HISTORY';

const rewardHistorySchema = new schema.Entity('rewardHistories');
const rewardHistoryListSchema = new schema.Array(rewardHistorySchema);

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
    const { data, rewardHistoryIds, userId, cursorDirection } = payload;

    const existingRewardHistoryIds =
      (state.byUserId[userId] &&
        state.byUserId[userId].rewardSummary &&
        state.byUserId[userId].rewardSummary.rewardHistoryIds) ||
      [];

    const existingCursors = moduleGetters.getRewardHistoryCursors(state)(
      userId,
    );

    let newRewardHistoryIds = rewardHistoryIds;
    const newCursors =
      (data.meta && data.meta.paging && data.meta.paging.cursors) || {};

    let resultCursors = existingCursors;

    if (cursorDirection === 'before') {
      newRewardHistoryIds = [...rewardHistoryIds, ...existingRewardHistoryIds];
      if (existingCursors && newCursors && newCursors.before) {
        resultCursors = {
          ...existingCursors,
          before: newCursors.before,
        };
      }
    } else if (cursorDirection === 'after') {
      newRewardHistoryIds = [...existingRewardHistoryIds, ...rewardHistoryIds];
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
          rewardHistoryIds: newRewardHistoryIds,
        },
      },
    };
  },
  [FETCHING_REWARD_SUMMARY_WITHOUT_HISTORY_SUCCUESS](state, payload) {
    const { data, userId } = payload;

    const existingRewardSummary =
      (state.byUserId[userId] && state.byUserId[userId].rewardSummary) || null;

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...state.byUserId[userId],
        rewardSummary: {
          ...existingRewardSummary,
          ...data,
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

      const normalizedRewardHistory = normalize(
        data.reward_history,
        rewardHistoryListSchema,
      );

      delete data.reward_history;

      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS, {
        userId,
        data,
        rewardHistoryIds: normalizedRewardHistory.result,
        cursorDirection,
      });

      commit(FETCHING_REWARD_HISTORIES_SUCCESS, normalizedRewardHistory);
    } catch (error) {
      console.log('error', error);
      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE, {
        userId,
        error,
      });
    }
  },
  async [FETCH_REWARD_SUMMARY_WITHOUT_HISTORY](
    { commit, dispatch, rootGetters },
    { userId },
  ) {
    try {
      const data = await dispatch(REQUEST, {
        api: api.inviteFriend.getRewardSummary,
        args: [rootGetters.getUser(userId).accessToken],
      });

      delete data.reward_history;

      commit(FETCHING_REWARD_SUMMARY_WITHOUT_HISTORY_SUCCUESS, {
        userId,
        data,
      });
    } catch (error) {
      console.log('error', error);
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
  async [CLAIM_REWARD](
    { commit, dispatch, rootGetters },
    { rewardHistoryId, rewardId, userId },
  ) {
    try {
      await dispatch(REQUEST, {
        api: api.reward.claimReward,
        args: [rewardId, rootGetters.getUser(userId).accessToken],
        openErrorPrompt: true,
        defaultErrorPromptMessage: {
          messageId: 'message.earnMDT.rewardErrorMessage',
        },
      });

      commit(CLAIMING_REWARD_SUCCESS, {
        rewardHistoryId,
      });

      await Promise.all([
        dispatch(FETCH_REWARD_SUMMARY_WITHOUT_HISTORY, {
          userId,
        }),
        dispatch(FETCH_USER, {
          userId,
        }),
      ]);
    } catch (error) {
      console.log('CLAIM_REWARD error', error);
    }
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
