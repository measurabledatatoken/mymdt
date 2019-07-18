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

const state = {
  byUserId: {},
};

const moduleGetters = {
  getCursors: state => userId =>
    state.byUserId[userId] && state.byUserId[userId].cursor,
  getRewardHistory: state => userId => state.byUserId[userId],
};

const mutations = {
  [FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS](state, payload) {
    const { data, userId, cursorDirection } = payload;

    const existingRewardHistory = state.byUserId[userId]
      ? state.byUserId[userId].reward_history
      : [];

    let newRewardHistory = data.reward_history;
    if (cursorDirection === 'before') {
      newRewardHistory = [...data.reward_history, ...existingRewardHistory];
    } else if (cursorDirection === 'after') {
      newRewardHistory = [...existingRewardHistory, ...data.reward_history];
    }

    state.byUserId = {
      ...state.byUserId,
      [userId]: {
        ...data,
        reward_history: newRewardHistory,
      },
    };
  },
};

// function getLatestTimeFromInviteFriendRewardHistories(
//   inviteFriendRewardHistories,
// ) {
//   return inviteFriendRewardHistories.reduce(
//     (latestTime, inviteFriendRewardHistory) => {
//       const inviteFriendRewardHistoryTime = new Date(
//         inviteFriendRewardHistory.inviteFriendRewardHistory_time,
//       );
//       if (inviteFriendRewardHistoryTime > latestTime) {
//         return inviteFriendRewardHistoryTime;
//       }

//       return latestTime;
//     },
//     new Date(0),
//   );
// }

const actions = {
  async [FETCH_INVITE_FRIEND_REWARD_HISTORIES](
    { commit, dispatch, getters, rootGetters },
    {
      userId,
      sortby,
      order = 'desc',
      // sortby = 'inviteFriendRewardHistory_time',
      // order = 'desc',
      cursorDirection,
      limit = 2,
    },
  ) {
    if (!cursorDirection) {
      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES, {
        userId,
      });
    }
    let { after, before } = getters.getCursors || {};
    try {
      await delay(750);
      const data = await dispatch(REQUEST, {
        api: api.inviteFriend.getRewardHistory,
        args: [
          rootGetters.getUser(userId).accessToken,
          {
            sortby,
            order,
            limit,
            cursors: cursorDirection === 'before' ? { before } : { after },
          },
        ],
      });

      // const currentInviteFriendRewardHistoryIds = rootGetters.getUser(userId)
      //   .inviteFriendRewardHistories;
      // const currentInviteFriendRewardHistories = getters
      //   .getInviteFriendRewardHistories(currentInviteFriendRewardHistoryIds)
      //   .filter(inviteFriendRewardHistories => inviteFriendRewardHistories);
      // const currentLatestTime = getLatestTimeFromInviteFriendRewardHistories(
      //   currentInviteFriendRewardHistories,
      // );
      // const fetchedInviteFriendRewardHistories = data.result.map(
      //   tranactionId => data.entities.inviteFriendRewardHistories[tranactionId],
      // );
      // const fetchedLatestTime = getLatestTimeFromInviteFriendRewardHistories(
      //   fetchedInviteFriendRewardHistories,
      // );

      // if (fetchedLatestTime > currentLatestTime) {
      //   dispatch(FETCH_USER, {
      //     userId,
      //   });
      // }

      // console.log('data', data);

      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS, {
        userId,
        data,
        cursorDirection,
      });
    } catch (error) {
      commit(FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE, {
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
