

const state = {
  transferAmount: 0,
  transferType: null,
  transferFromAccount: null,
  transferToAccount: null,
  transferToWalletAddress: null,
  transferNote: null,
};

const getters = {
  transferAmount: state => state.transferAmount,
  transferFromAccount: state => state.transferFromAccount,
  transferToAccount: state => state.transferToAccount,
  transferToWalletAddress: state => state.transferToWalletAddress,
  transferNote: state => state.transferNote,
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
  setTransferToWalletAddress(state, transferToWalletAddress) {
    state.transferToWalletAddress = transferToWalletAddress;
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
