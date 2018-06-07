import api from '@/api';
import { ErrorCode } from '@/enum';
import { TransferType } from '@/constants';
import { SET_ERROR_MESSAGE, SET_ERROR_TITLE, SET_SHOW_ERROR_PROMPT } from './common';

// mutation
export const SET_TRANSFER_AMOUNT = 'transfer/SET_TRANSFER_AMOUNT';
export const SET_TRANSFER_TYPE = 'transfer/SET_TRANSFER_TYPE';
export const SET_TRANSFER_FROM_ACCOUNT = 'transfer/SET_TRANSFER_FROM_ACCOUNT';
export const SET_TRANSFER_TO_ACCOUNT = 'transfer/SET_TRANSFER_TO_ACCOUNT';
export const SET_TRANSFER_TO_WALLETADDRESS = 'transfer/SET_TRANSFER_TO_WALLETADDRESS';
export const SET_TRANSFER_NOTE = 'transfer/SET_TRANSFER_NOTE';
export const SET_TRANSFER_SUCCESS = 'transfer/SET_TRANSFER_SUCCESS';

// action
export const START_TRANSFER = 'transfer/START_TRANSFER';

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
  transferToAccounts: (state, getterlist, rootState) => rootState.home.userAccounts.filter(
    account => account.emailAddress !== state.transferFromAccount.emailAddress,
  ),
};

const mutations = {
  [SET_TRANSFER_AMOUNT](state, transferAmount) {
    state.transferAmount = transferAmount;
  },
  [SET_TRANSFER_TYPE](state, transferType) {
    state.transferType = transferType;
  },
  [SET_TRANSFER_FROM_ACCOUNT](state, transferFromAccount) {
    state.transferFromAccount = transferFromAccount;
  },
  [SET_TRANSFER_TO_ACCOUNT](state, transferToAccount) {
    state.transferToAccount = transferToAccount;
  },
  [SET_TRANSFER_TO_WALLETADDRESS](state, transferToWalletAddress) {
    state.transferToWalletAddress = transferToWalletAddress;
  },
  [SET_TRANSFER_NOTE](state, transferNote) {
    state.transferNote = transferNote;
  },
  [SET_TRANSFER_SUCCESS](state, transferSuccess) {
    state.transferSuccess = transferSuccess;
  },
};

const actions = {
  [START_TRANSFER](context) {
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
            const errorCode = error.response.data.error_code;

            context.commit(SET_ERROR_MESSAGE, ErrorCode.properties[errorCode].messageId);
            context.commit(SET_ERROR_TITLE, { messageId: 'message.common.error_title' });
            context.commit(SET_SHOW_ERROR_PROMPT, true);
            reject();
          },
        );
    });
  },
};


export default{
  state,
  getters,
  mutations,
  actions,
};
