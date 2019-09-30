import api from '@/api';
import TransferType from '@/enum/transferType';
import { REQUEST } from '@/store/modules/api';
import {
  SET_TRANSACTIONS,
  SET_TRANSFER_TYPE_FOR_SUCCESS,
} from '@/store/modules/ui/transferSuccess';

// mutation
export const SET_TRANSFER_AMOUNT = 'transfer/SET_TRANSFER_AMOUNT';
export const SET_TRANSFER_TYPE = 'transfer/SET_TRANSFER_TYPE';
export const SET_TRANSFER_TO_ACCOUNT = 'transfer/SET_TRANSFER_TO_ACCOUNT';
export const SET_TRANSFER_TO_WALLETADDRESS =
  'transfer/SET_TRANSFER_TO_WALLETADDRESS';
export const SET_TRANSFER_NOTE = 'transfer/SET_TRANSFER_NOTE';
export const SET_TRANSFER_SUCCESS = 'transfer/SET_TRANSFER_SUCCESS';
export const FLUSH_TRANSFER_DATA = 'transfer/FLUSH_TRANSFER_DATA';
export const ADD_TRANSFERTO_EMAIL_HISTORY =
  'transfer/ADD_TRANSFERTO_EMAIL_HISTORY';

// action
export const START_TRANSFER = 'transfer/START_TRANSFER';

const clearState = state => {
  state.transferAmount = null;
  state.transferType = null;
  state.transferToAccount = null;
  state.transferToWalletAddress = null;
  state.transferNote = null;
};

const state = {
  transferAmount: null,
  transferType: null,
  transferToAccount: null,
  transferToWalletAddress: null,
  transferNote: null,
  transferToEmailHistory: [],
};

const getters = {
  transferToAccounts: (state, getters, rootState, rootGetters) => {
    const tempAccounts = rootGetters.getAllUsers.filter(
      user => user.emailAddress !== rootGetters.getSelectedUser.emailAddress,
    );

    for (let i = 0; i < state.transferToEmailHistory.length; i += 1) {
      tempAccounts.push({ emailAddress: state.transferToEmailHistory[i] });
    }
    return tempAccounts;
  },
  minAmount: (state, getters, rootState) => {
    if (!rootState.home.appConfig) {
      return 0;
    }

    return parseFloat(rootState.home.appConfig.mdt_min_transfer_amount);
  },
  // eslint-disable-next-line
  transactionFee: (state, getters, rootState, rootGetters) => {
    if (!rootState.home.appConfig) {
      return 0;
    }
    const feePercentage =
      rootState.home.appConfig.mdt_transaction_fee_in_percentage / 100.0;
    const minFee = Math.ceil(
      parseFloat(rootState.home.appConfig.mdt_transaction_fee_in_usd) /
        rootState.home.mdtPrice,
    );
    const minFeeByPercentage =
      state.transferAmount * parseFloat(feePercentage, 10);
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
  [FLUSH_TRANSFER_DATA](state) {
    clearState(state);
  },
  [ADD_TRANSFERTO_EMAIL_HISTORY](state, transferToEmail) {
    const length = state.transferToEmailHistory.length;
    // only store 3 latest email
    if (length >= 3) {
      state.transferToEmailHistory.shift();
    }

    for (let i = 0; i < state.transferToEmailHistory.length; i += 1) {
      const email = state.transferToEmailHistory[i];
      if (transferToEmail === email) {
        return;
      }
    }

    state.transferToEmailHistory.push(transferToEmail);
  },
};

const actions = {
  async [START_TRANSFER](
    { dispatch, rootState, rootGetters, commit },
    { pin, verificationCode },
  ) {
    const transferFromAccount = rootGetters.getSelectedUser;
    const transferType = rootState.transfer.transferType;
    const transferNote = rootState.transfer.transferNote;

    let amount = rootState.transfer.transferAmount;
    let toAddress;
    if (transferType === TransferType.EthWallet) {
      toAddress = rootState.transfer.transferToWalletAddress;
      amount = rootGetters.finalAmount;
    } else {
      toAddress = rootState.transfer.transferToAccount.emailAddress;
    }

    const responseData = await dispatch(REQUEST, {
      api: api.transfer.transfer,
      args: [
        toAddress,
        transferType,
        amount,
        pin,
        verificationCode,
        transferNote,
        transferFromAccount.accessToken,
      ],
      setLoading: true,
      openErrorPrompt: true,
    });
    commit(SET_TRANSACTIONS, responseData);
    commit(SET_TRANSFER_TYPE_FOR_SUCCESS, transferType);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
