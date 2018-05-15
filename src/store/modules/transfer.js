

const state = {
  transferAmount: 0,
  transferType: null,
  transferFromAccount: null,
  transferToAccount: null,
  transferNote: null,
};

const getters = {

};

const mutations = {
  setTransferAmount(state, transferAmount) {
    state.transferAmount = transferAmount;
  },
  setTransferType(state, transferType) {
    state.transferType = transferType;
  },
  setTransferFromAccount(state, transferFromAccount) {
    state.transferFromAccount = transferFromAccount;
  },
  setTransferToAccount(state, transferToAccount) {
    state.transferToAccount = transferToAccount;
  },
  setTransferNote(state, transferNote) {
    state.transferNote = transferNote;
  },
};

const actions = {

};


export default{
  state,
  getters,
  actions,
  mutations,
};
