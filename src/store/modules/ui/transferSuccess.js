//Mutation

export const SET_TRANSFER_TYPE = 'ui/transferSuccess/SET_TRANSFER_TYPE';
export const SET_TRANSACTIONS = 'ui/transferSuccess/SET_TRANSACTIONS';

const state = {
  transferType: null,
  transaction: null,
};

const mutations = {
  [SET_TRANSFER_TYPE]: (state, transferType) => {
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
