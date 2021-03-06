import api from '@/api';
import { delay } from '@/utils';

import { FETCHING_REWARDS_SUCCESS } from '@/store/modules/entities/rewards';
import { FETCHING_TRANSACTIONS_SUCCESS } from '@/store/modules/entities/transactions';
import { REQUEST } from '@/store/modules/api';

export const FETCHING_USER_SUCCESS = 'users/FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAILURE = 'users/FETCHING_USER_FAILURE';
export const FETCHING_TASKS = 'users/FETCHING_TASKS';
export const FETCHING_TASKS_SUCCESS = 'users/FETCHING_TASKS_SUCCESS';
export const FETCHING_TASKS_FAILURE = 'users/FETCHING_TASKS_FAILURE';
export const SET_USERS = 'users/SET_USERS';
export const UPDATE_USER_INFO = 'users/UPDATE_USER_INFO';

export const FETCH_USER = 'users/FETCH_USER';
export const FETCH_ALL_TASKS = 'users/FETCH_ALL_TASKS';
export const FETCH_TASKS = 'users/FETCH_TASKS';

export const REDEEM_SNS_CODE = 'users/REDEEM_SNS_CODE';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getUser: state => id => state.byId[id],
  getAllUsers: state => state.allIds.map(id => state.byId[id]),
  isUserDataSharingEnabled: (state, getters, rootState) => user =>
    user.userDataShares.some(
      userDataShare =>
        userDataShare.application_id === rootState.home.appID &&
        !!userDataShare.is_data_sharing,
    ),
  getAllUsersWithDataSharing: (state, getters) =>
    state.allIds
      .map(id => state.byId[id])
      .filter(getters.isUserDataSharingEnabled),
};

const mutations = {
  [SET_USERS](state, payload) {
    const { byId, allIds } = payload;
    state.byId = byId;
    state.allIds = allIds;
  },
  [UPDATE_USER_INFO](state, payload) {
    const { userId, data } = payload;
    state.byId = {
      ...state.byId,
      [userId]: {
        ...state.byId[userId],
        ...data,
      },
    };
  },
  [FETCHING_USER_SUCCESS](state, payload) {
    const { userId, data } = payload;
    state.byId = {
      ...state.byId,
      [userId]: {
        ...state.byId[userId],
        ...data,
      },
    };
    state.allIds = [...new Set([...state.allIds, userId])];
  },
  [FETCHING_TASKS_SUCCESS](state, payload) {
    const { id, data } = payload;
    state.byId = {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        tasks: data,
      },
    };
  },
  [FETCHING_REWARDS_SUCCESS](state, payload) {
    const { id, data } = payload;
    const orginalRewards =
      (state.byId[id] && state.byId[id].transactions) || [];

    state.byId = {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        rewards: [...new Set([...orginalRewards, ...data.result])],
      },
    };
  },
  [FETCHING_TRANSACTIONS_SUCCESS](state, payload) {
    const {
      userId,
      data: {
        result,
        meta: {
          paging: {
            cursors: { before, after },
          },
        },
      },
      cursorDirection,
    } = payload;
    const orginalTransactions =
      (state.byId[userId] && state.byId[userId].transactions) || [];

    let cursors = {};
    switch (cursorDirection) {
      case 'before':
        cursors = { before };
        break;
      case 'after':
        cursors = { after };
        break;
      default:
        cursors = {
          before,
          after,
        };
        break;
    }
    state.byId = {
      ...state.byId,
      [userId]: {
        ...state.byId[userId],
        transactions: [...new Set([...orginalTransactions, ...result])],
        transactionCursors: {
          ...state.byId[userId].transactionCursors,
          ...cursors,
        },
      },
    };
  },
};

const actions = {
  async [FETCH_USER]({ commit, dispatch, getters }, { userId }) {
    try {
      const data = await dispatch(REQUEST, {
        api: api.account.getAccount,
        args: [getters.getUser(userId).accessToken],
        openErrorPrompt: true,
      });
      commit(FETCHING_USER_SUCCESS, {
        userId,
        data,
      });
    } catch (error) {
      commit(FETCHING_USER_FAILURE, {
        userId,
        error,
      });
    }
  },
  [FETCH_ALL_TASKS]({ state, dispatch }) {
    return Promise.all(
      state.allIds.map(userId =>
        dispatch(FETCH_TASKS, {
          userId,
        }),
      ),
    );
  },
  async [FETCH_TASKS]({ commit, dispatch, rootState, getters }, { userId }) {
    commit(FETCHING_TASKS, {
      id: userId,
    });
    try {
      await delay(750);
      const appIds = '';
      const data = await dispatch(REQUEST, {
        api: api.task.getTasks,
        args: [
          appIds,
          rootState.common.locale,
          getters.getUser(userId).accessToken,
        ],
        openErrorPrompt: true,
      });
      commit(FETCHING_TASKS_SUCCESS, {
        id: userId,
        data,
      });
    } catch (error) {
      commit(FETCHING_TASKS_FAILURE, {
        id: userId,
        error,
      });
    }
  },
  // let caller handles error thrown
  async [REDEEM_SNS_CODE]({ dispatch, getters }, { code, taskId, userId }) {
    await dispatch(REQUEST, {
      api: api.task.redeemSNSCode,
      args: [code, taskId, getters.getUser(userId).accessToken],
    });

    await dispatch(FETCH_USER, {
      userId,
    });
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
