import {
  FETCHING_TASKS,
  FETCHING_TASKS_SUCCESS,
  FETCHING_TASKS_FAILURE,
} from '@/store/modules/entities/users';

import {
  FETCHING_REWARDS,
  FETCHING_REWARDS_SUCCESS,
  FETCHING_REWARDS_FAILURE,
  CLAIMING_REWARD,
  CLAIMING_REWARD_SUCCESS,
  CLAIMING_REWARD_FAILURE,
} from '@/store/modules/entities/rewards';

const updateUser = (
  userState = {
    isFetchingTasks: false,
    fetchingTasksSuccess: false,
    fetchingTasksError: null,
    isFetchingRewards: false,
    fetchingRewardsSuccess: false,
    fetchingRewardsError: null,
  },
  mutationType,
  payload,
) => {
  switch (mutationType) {
    case FETCHING_TASKS: {
      return {
        ...userState,
        isFetchingTasks: true,
      };
    }
    case FETCHING_TASKS_SUCCESS: {
      return {
        ...userState,
        isFetchingTasks: false,
        fetchingTasksSuccess: true,
        fetchingTasksError: null,
      };
    }
    case FETCHING_TASKS_FAILURE: {
      return {
        ...userState,
        isFetchingTasks: false,
        fetchingTasksSuccess: false,
        fetchingTasksError: payload.error,
      };
    }
    case FETCHING_REWARDS: {
      return {
        ...userState,
        isFetchingRewards: true,
      };
    }
    case FETCHING_REWARDS_SUCCESS: {
      return {
        ...userState,
        isFetchingRewards: false,
        fetchingRewardsSuccess: true,
        fetchingRewardsError: null,
      };
    }
    case FETCHING_REWARDS_FAILURE: {
      return {
        ...userState,
        isFetchingRewards: false,
        fetchingRewardsSuccess: false,
        fetchingRewardsError: payload.error,
      };
    }
    default: {
      return userState;
    }
  }
};

const updateReward = (
  rewardState = {
    isClaiming: false,
    claimingSuccess: false,
    claimingError: null,
  },
  mutationType,
  payload,
) => {
  switch (mutationType) {
    case CLAIMING_REWARD: {
      return {
        ...rewardState,
        isClaiming: true,
      };
    }
    case CLAIMING_REWARD_SUCCESS: {
      return {
        ...rewardState,
        isClaiming: false,
        claimingSuccess: true,
        claimingError: null,
      };
    }
    case CLAIMING_REWARD_FAILURE: {
      return {
        ...rewardState,
        isClaiming: true,
        claimingSuccess: false,
        claimingError: payload.error,
      };
    }
    default: {
      return rewardState;
    }
  }
};

const state = {
  users: {},
  rewards: {},
};

const mutations = {
  [FETCHING_TASKS](state, payload) {
    state.users[payload.id] = updateUser(
      state.users[payload.id],
      FETCHING_TASKS,
      payload,
    );
  },
  [FETCHING_TASKS_SUCCESS](state, payload) {
    state.users[payload.id] = updateUser(
      state.users[payload.id],
      FETCHING_TASKS_SUCCESS,
      payload,
    );
  },
  [FETCHING_TASKS_FAILURE](state, payload) {
    state.users[payload.id] = updateUser(
      state.users[payload.id],
      FETCHING_TASKS_FAILURE,
      payload,
    );
  },
  [FETCHING_REWARDS](state, payload) {
    state.users[payload.id] = updateUser(
      state.users[payload.id],
      FETCHING_REWARDS,
      payload,
    );
  },
  [FETCHING_REWARDS_SUCCESS](state, payload) {
    state.users[payload.id] = updateUser(
      state.users[payload.id],
      FETCHING_REWARDS_SUCCESS,
      payload,
    );
  },
  [FETCHING_REWARDS_FAILURE](state, payload) {
    state.users[payload.id] = updateUser(
      state.users[payload.id],
      FETCHING_REWARDS_FAILURE,
      payload,
    );
  },
  [CLAIMING_REWARD](state, payload) {
    const { rewardId } = payload;
    state.rewards[rewardId] = updateReward(
      state.rewards[rewardId],
      CLAIMING_REWARD,
      payload,
    );
  },
  [CLAIMING_REWARD_SUCCESS](state, payload) {
    const { rewardId } = payload;
    state.rewards[rewardId] = updateReward(
      state.rewards[rewardId],
      CLAIMING_REWARD_SUCCESS,
      payload,
    );
  },
  [CLAIMING_REWARD_FAILURE](state, payload) {
    const { rewardId } = payload;
    state.rewards[rewardId] = updateReward(
      state.rewards[rewardId],
      CLAIMING_REWARD_FAILURE,
      payload,
    );
  },
};

export default {
  state,
  mutations,
};
