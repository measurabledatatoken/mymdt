import { FETCHING_DATA_POINT_REWARDS_SUCCESS } from '@/store/modules/dataPoint';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getDataPointReward: state => id => state.byId[id],
  getDataPointRewards: (_state, getters) => (ids = []) =>
    ids.map(id => getters.getDataPointReward(id)),
};

const mutations = {
  [FETCHING_DATA_POINT_REWARDS_SUCCESS](state, payload) {
    const { data } = payload;
    state.byId = {
      ...state.byId,
      ...data.entities.dataPointRewards,
    };
    state.allIds = [...new Set([...state.allIds, ...data.result])];
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
};
