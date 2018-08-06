import api from '@/api';
import { REQUEST } from '@/store/modules/api';

export const FETCHING_APPLICATIONS_SUCCESS =
  'application/FETCHING_APPLICATIONS_SUCCESS';
export const FETCHING_APPLICATIONS_FAILURE =
  'application/FETCHING_APPLICATIONS_FAILURE';

export const FETCH_APPLICATIONS = 'application/FETCH_APPLICATIONS';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getApplication: state => id => state.byId[id],
  getApplications: (state, getters) => (ids = []) =>
    ids.map(id => getters.getApplication(id)),
};

const mutations = {
  [FETCHING_APPLICATIONS_SUCCESS](state, payload) {
    const { data } = payload;
    state.byId = {
      ...state.byId,
      ...data.entities.applications,
    };
    state.allIds = [...new Set([...state.allIds, ...data.result])];
  },
};

const actions = {
  async [FETCH_APPLICATIONS]({ commit, dispatch, rootGetters }, { userId }) {
    try {
      const data = await dispatch(REQUEST, {
        api: api.application.getApplications,
        args: [rootGetters.getUser(userId).accessToken],
      });
      commit(FETCHING_APPLICATIONS_SUCCESS, {
        userId,
        data,
      });
    } catch (error) {
      commit(FETCHING_APPLICATIONS_FAILURE, {
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
