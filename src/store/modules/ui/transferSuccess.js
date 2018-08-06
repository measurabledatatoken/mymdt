//Mutation

export const SET_TRANSFER_TYPE_FOR_SUCCESS =
  'ui/transferSuccess/SET_TRANSFER_TYPE_FOR_SUCCESS';
export const SET_TRANSACTIONS = 'ui/transferSuccess/SET_TRANSACTIONS';

const state = {
  transaction: null,
};

const mutations = {
  [SET_TRANSFER_TYPE_FOR_SUCCESS]: (state, transferType) => {
    state.transferType = transferType;
  },
  [SET_TRANSACTIONS]: (state, transaction) => {
    state.transaction = transaction;
  },
};

export default {
  state,
  mutations,
};
