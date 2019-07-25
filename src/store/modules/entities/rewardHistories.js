import {
  FETCHING_REWARD_HISTORIES_SUCCESS,
  CLAIMING_REWARD_SUCCESS,
} from '@/store/modules/inviteFriend';

export const FETCH_ALL_REWARDS = 'reward/FETCH_ALL_REWARDS';
export const FETCH_REWARDS = 'reward/FETCH_REWARDS';
export const CLAIM_REWARD = 'reward/CLAIM_REWARD';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getRewardHistory: state => id => state.byId[id],
  getRewardHisotories: (state, getters) => (ids = []) =>
    ids.map(id => getters.getRewardHistory(id)),
};

const mutations = {
  [FETCHING_REWARD_HISTORIES_SUCCESS](state, payload) {
    state.byId = {
      ...state.byId,
      ...payload.entities.rewardHistories,
    };
    state.allIds = [...new Set([...state.allIds, ...payload.result])];
  },
  [CLAIMING_REWARD_SUCCESS](state, payload) {
    const { rewardHistoryId } = payload;
    state.byId[rewardHistoryId].status = 4;
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
};
