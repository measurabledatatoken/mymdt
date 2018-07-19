import api from '@/api';

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
  [FETCH_APPLICATIONS]({ commit, rootGetters }, { userId }) {
    return api.application
      .getApplications(rootGetters.getUser(userId).accessToken)
      .then(data =>
        commit(FETCHING_APPLICATIONS_SUCCESS, {
          userId,
          data,
        }),
      )
      .catch(error =>
        commit(FETCHING_APPLICATIONS_FAILURE, {
          userId,
          error,
        }),
      );
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
