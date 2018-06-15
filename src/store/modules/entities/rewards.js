import api from '@/api';
import { delay } from '@/utils';

import { OPEN_ERROR_PROMPT } from '@/store/modules/common';

export const FETCHING_REWARDS = 'reward/FETCHING_REWARDS';
export const FETCHING_REWARDS_SUCCESS = 'reward/FETCHING_REWARDS_SUCCESS';
export const FETCHING_REWARDS_FAILURE = 'reward/FETCHING_REWARDS_FAILURE';
export const CLAIMING_REWARD = 'reward/CLAIMING_REWARD';
export const CLAIMING_REWARD_SUCCESS = 'reward/CLAIMING_REWARD_SUCCESS';
export const CLAIMING_REWARD_FAILURE = 'reward/CLAIMING_REWARD_FAILURE';

export const FETCH_ALL_REWARDS = 'reward/FETCH_ALL_REWARDS';
export const FETCH_REWARDS = 'reward/FETCH_REWARDS';
export const CLAIM_REWARD = 'reward/CLAIM_REWARD';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getReward: state => id => state.byId[id],
  getRewards: (state, getters) => (ids = []) => ids.map(id => getters.getReward(id)),
};

const mutations = {
  [FETCHING_REWARDS_SUCCESS](state, payload) {
    const { data } = payload;
    state.byId = {
      ...state.byId,
      ...data.entities.rewards,
    };
    state.allIds = [...new Set([...state.allIds, ...data.result])];
  },
  [CLAIMING_REWARD_SUCCESS](state, payload) {
    const { rewardId } = payload;
    state.byId[rewardId].status = 4;
  },
};

const actions = {
  [FETCH_ALL_REWARDS]({ rootState, dispatch }) {
    return Promise.all(
      rootState.entities.users.allIds.map(
        userId => dispatch(FETCH_REWARDS, {
          userId,
        }),
      ));
  },
  [FETCH_REWARDS]({ commit, rootState, rootGetters }, { userId }) {
    commit(FETCHING_REWARDS, {
      id: userId,
    });
    return Promise.all([
      api.reward.getRewards(rootState.home.appID, rootGetters.getUser(userId).accessToken),
      delay(750),
    ])
      .then(([data]) => commit(FETCHING_REWARDS_SUCCESS, {
        id: userId,
        data,
      }))
      .catch(error => commit(FETCHING_REWARDS_FAILURE, {
        id: userId,
        error,
      }));
  },
  [CLAIM_REWARD]({ commit, dispatch, rootState, rootGetters }, { rewardId, userId }) {
    commit(CLAIMING_REWARD, {
      rewardId,
    });

    return api.reward.claimReward(rootState.home.appID, rewardId, rootGetters.getUser(userId).accessToken)
      .then(() => commit(CLAIMING_REWARD_SUCCESS, {
        rewardId,
      }))
      .catch((error) => {
        commit(CLAIMING_REWARD_FAILURE, {
          rewardId,
          error,
        });
        dispatch(OPEN_ERROR_PROMPT, {
          message: {
            messageId: 'message.earnMDT.rewardErrorMessage',
          },
          title: {
            messageId: 'message.common.error_title',
          },
        });
      });
  },
};

export default{
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
