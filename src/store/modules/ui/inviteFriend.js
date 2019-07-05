import {
  FETCHING_INVITE_FRIEND_REWARD_HISTORIES,
  FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS,
  FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE,
} from '@/store/modules/inviteFriend';

const state = {
  isFetching: false,
  fetchingSuccess: false,
  fetchingError: null,
};

const mutations = {
  [FETCHING_INVITE_FRIEND_REWARD_HISTORIES](state) {
    state.isFetching = true;
  },
  [FETCHING_INVITE_FRIEND_REWARD_HISTORIES_SUCCESS](state) {
    state.isFetching = false;
    state.fetchingSuccess = true;
    state.fetchingError = null;
  },
  [FETCHING_INVITE_FRIEND_REWARD_HISTORIES_FAILURE](state, payload) {
    state.isFetching = false;
    state.fetchingSuccess = false;
    state.fetchingError = payload.error;
  },
};

export default {
  state,
  mutations,
};
