import api from '@/api';

// mutation
export const SET_PHONE_NUMBER = 'security/SET_PHONE_NUMBER';
export const SET_SELECTED_USER = 'security/SET_SELECTED_USER';

// action
export const VALIDATE_TRANSFER_PIN = 'security/VALIDATE_TRANSFER_PIN';
export const SETUP_PIN = 'security/SETUP_PIN';
export const CHANGE_PIN = 'security/CHANGE_PIN';

export const SEND_VERIFICATION_CODE = 'security/SEND_VERIFICATION_CODE';
export const VERIFY_VERIFICATION_CODE = 'security/VERIFY_VERIFICATION_CODE';

const state = {
  phoneNumber: null,
  pin: null,
  selectedUserId: null,
};

const getters = {
  // eslint-disable-next-line
  getSelectedSecurityUser: (state, getters, rootState, rootGetters) => rootGetters.getUser(state.selectedUserId),
};

const mutations = {
  [SET_PHONE_NUMBER](state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  [SET_SELECTED_USER](state, userId) {
    state.selectedUserId = userId;
  },
};

const actions = {
  // eslint-disable-next-line
  [VALIDATE_TRANSFER_PIN]({ commit, rootState, rootGetters }, pin) {
    const transferFromAccount = rootState.transfer.transferFromAccount;

    return api.security.validatePIN(pin, transferFromAccount.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [SETUP_PIN]({ commit, rootState, rootGetters }, { pin, confirmedPIN }) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);

    return api.security.setupPIN(pin, confirmedPIN, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [CHANGE_PIN]({ commit, rootState, rootGetters }, { oldPIN, newPIN, confirmedPIN }) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);

    return api.security.changePIN(oldPIN, newPIN, confirmedPIN, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [SEND_VERIFICATION_CODE]({ commit, rootState, rootGetters }, { countryCode, phoneNum }) {
    const account = rootGetters.getUser(this.state.security.selectedUserId);
    return api.security.sendVerificationCodeToPhone(countryCode, phoneNum, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [VERIFY_VERIFICATION_CODE]({ commit, rootState, rootGetters }, { countryCode, phoneNum, verificationCode }) {
    const account = rootGetters.getUser(this.state.security.selectedUserId);
    return api.security.verifyVerificationCode(countryCode, phoneNum, verificationCode, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
};


export default{
  state,
  getters,
  mutations,
  actions,
};
