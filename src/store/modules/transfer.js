import api from '@/api';
import { TransferType } from '@/constants';

const state = {
  transferAmount: 0,
  transferType: null,
  transferFromAccount: null,
  transferToAccount: null,
  transferToWalletAddress: null,
  transferNote: null,
  transferSuccess: null,
};

const getters = {
  transferAmount: state => state.transferAmount,
  transferType: state => state.transferType,
  transferFromAccount: state => state.transferFromAccount,
  transferToAccount: state => state.transferToAccount,
  transferToWalletAddress: state => state.transferToWalletAddress,
  transferNote: state => state.transferNote,
  transferSuccess: state => state.transferSuccess,
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
  setTransferSuccess(state, transferSuccess) {
    state.transferSuccess = transferSuccess;
  },
};

const actions = {
  startTransfer() {
    return new Promise((resolve, reject) => {
      const selectedUser = this.state.home.selectedUser;
      const transferType = this.state.transfer.transferType;
      const amount = this.state.transfer.transferAmount;

      let toAddress = this.state.transfer.transferToAccount.emailAddress;
      if (transferType === TransferType.EthWallet) {
        toAddress = this.state.transfer.transferToWalletAddress;
      }

      api.transfer.transfer(toAddress, transferType, amount, selectedUser.accessToken)
        .then(() => {
          resolve();
        })
        .catch(
          (error) => {
            reject(error);
          },
        );
    });
  },
};


export default{
  state,
  getters,
  actions,
  mutations,
};
