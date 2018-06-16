import api from '@/api';
import {
  ErrorCode,
} from '@/enum';
import {
  TransferType,
} from '@/constants';
import {
  SET_ERROR_MESSAGE,
  SET_ERROR_TITLE,
  SET_SHOW_ERROR_PROMPT,
} from './common';

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
  // eslint-disable-next-line
  transferToAccounts: (state, getters, rootState, rootGetters) => rootGetters.getAllUsers.filter(
    user => (!state.transferFromAccount || user.emailAddress !== state.transferFromAccount.emailAddress),
  ),
  // eslint-disable-next-line
  transactionFee: (state, getters, rootState, rootGetters) => {
    const feePercentage = rootState.home.appConfig.mdt_transaction_fee / 100.0;
    const minFee = parseFloat(rootState.home.appConfig.mdt_min_transaction_fee);
    const minFeeByPercentage = state.transferAmount * parseFloat(feePercentage, 10);
    const finalFee = minFeeByPercentage < minFee ? minFee : minFeeByPercentage;
    return finalFee;
  },
  // eslint-disable-next-line
  finalAmount: (state, getters, rootState, rootGetters) => {
    const finalAmount = state.transferAmount - rootGetters.transactionFee;
    return finalAmount;
  },
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
  [START_TRANSFER]({ commit, rootState, rootGetters }, pin) {
    const selectedUser = rootGetters.getSelectedUser;
    const transferType = rootState.transfer.transferType;
    const amount = rootState.transfer.transferAmount;
    const transferNote = rootState.transfer.transferNote;


    let toAddress = rootState.transfer.transferToAccount.emailAddress;
    if (transferType === TransferType.EthWallet) {
      toAddress = rootState.transfer.transferToWalletAddress;
    }

    return api.transfer.transfer(toAddress, transferType, amount, pin, transferNote, selectedUser.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          const errorCode = error.response.data.error_code;

          commit(SET_ERROR_MESSAGE, ErrorCode.properties[errorCode].messageId);
          commit(SET_ERROR_TITLE, {
            messageId: 'message.common.error_title',
          });
          commit(SET_SHOW_ERROR_PROMPT, true);
          throw (error);
        },
      );
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
