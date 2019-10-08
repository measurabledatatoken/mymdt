import { FETCHING_TRANSACTIONS_SUCCESS } from '@/store/modules/ethWallet';
import { GET_TRANSACTIONS_BY_IDS } from '@/store/modules/entities/ethWalletTransaction';

export const GET_TRANSACTIONS = 'ethWallet/GET_TRANSACTIONS';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  [GET_TRANSACTIONS]: (state, getters) => walletAddress => {
    if (!state.byId[walletAddress]) {
      return [];
    }

    return getters[GET_TRANSACTIONS_BY_IDS](
      state.byId[walletAddress].transactionIds,
    );
  },
};

const mutations = {
  [FETCHING_TRANSACTIONS_SUCCESS](state, payload) {
    const { walletAddress, data } = payload;
    state.byId = {
      ...state.byId,
      [walletAddress]: {
        ...state.byId[walletAddress],
        transactionIds: data.result,
      },
    };
    state.allIds = [...new Set([...state.allIds, walletAddress])];
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
};
