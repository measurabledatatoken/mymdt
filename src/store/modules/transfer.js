import api from '@/api';
import { ErrorCode, TransferType } from '@/constants';

const state = {
  transferAmount: 0,
  transferType: null,
  transferFromAccount: null,
  transferToAccount: null,
  transferToWalletAddress: null,
  transferNote: null,
  transferSuccess: null,
  transferErrorCode: null,
};

const getters = {
  transferAmount: state => state.transferAmount,
  transferType: state => state.transferType,
  transferFromAccount: state => state.transferFromAccount,
  transferToAccount: state => state.transferToAccount,
  transferToWalletAddress: state => state.transferToWalletAddress,
  transferNote: state => state.transferNote,
  transferSuccess: state => state.transferSuccess,
  transferErrorCode: state => state.transferErrorCode,
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
  setTransferErrorCode(state, transferErrorCode) {
    state.transferErrorCode = transferErrorCode;
    if (transferErrorCode == null) {
      state.transferSuccess = true;
    } else {
      state.transferSuccess = false;
    }
  },
};

const actions = {
  startTransfer(context) {
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
          context.commit('setTransferErrorCode', null);
          resolve();
        })
        .catch(
          (error) => {
            if (error.response && error.response.data) {
              context.commit('setTransferErrorCode', error.response.data.error_code);
            } else {
              context.commit('setTransferErrorCode', ErrorCode.UnknownError);
            }
            reject();
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
