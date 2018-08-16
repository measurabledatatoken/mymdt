import api from '@/api';
import { delay } from '@/utils';

import { REQUEST } from '@/store/modules/api';
import { FETCH_USER } from '@/store/modules/entities/users';

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
  getRewards: (state, getters) => (ids = []) =>
    ids.map(id => getters.getReward(id)),
  getRewardsOfAllUsers: state => state.allIds.map(id => state.byId[id]),
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
    state.byId[rewardId].claimed = true;
  },
};

const actions = {
  [FETCH_ALL_REWARDS]({ rootState, dispatch }) {
    return Promise.all(
      rootState.entities.users.allIds.map(userId =>
        dispatch(FETCH_REWARDS, {
          userId,
        }),
      ),
    );
  },
  async [FETCH_REWARDS](
    { commit, dispatch, rootState, rootGetters },
    { userId },
  ) {
    commit(FETCHING_REWARDS, {
      id: userId,
    });
    try {
      await delay(750);
      const appIds = '';
      const data = await dispatch(REQUEST, {
        api: api.reward.getRewards,
        args: [
          appIds,
          rootState.common.locale,
          rootGetters.getUser(userId).accessToken,
        ],
        openErrorPrompt: true,
      });
      commit(FETCHING_REWARDS_SUCCESS, {
        id: userId,
        data,
      });
    } catch (error) {
      commit(FETCHING_REWARDS_FAILURE, {
        id: userId,
        error,
      });
    }
  },
  async [CLAIM_REWARD](
    { commit, dispatch, rootGetters },
    { rewardId, userId },
  ) {
    commit(CLAIMING_REWARD, {
      rewardId,
    });

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
        rewardId,
      });

      await dispatch(FETCH_USER, {
        userId,
      });
    } catch (error) {
      commit(CLAIMING_REWARD_FAILURE, {
        rewardId,
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
