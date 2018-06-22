import api from '@/api';
import {
  SET_IS_LOADING,
} from '@/store/modules/common';
import {
  FETCH_USER,
} from '@/store/modules/entities/users';


// mutation
export const SET_PHONE_NUMBER = 'security/SET_PHONE_NUMBER';
export const SET_SELECTED_USER = 'security/SET_SELECTED_USER';

// action
export const VALIDATE_PIN_FOR_SECURITY = 'security/VALIDATE_PIN_FOR_SECURITY';
export const VALIDATE_PIN_FOR_TRANSFER = 'security/VALIDATE_PIN_FOR_TRANSFER';
export const SETUP_PIN = 'security/SETUP_PIN';
export const CHANGE_PIN = 'security/CHANGE_PIN';
export const RESET_PIN = 'security/RESET_PIN';

export const REQUEST_VERIFICATION_CODE = 'security/REQUEST_VERIFICATION_CODE';
export const ADD_PHONE_NUMBER = 'security/ADD_PHONE_NUMBER';
export const CHANGE_PHONE_NUMBER = 'security/CHANGE_PHONE_NUMBER';

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
  [VALIDATE_PIN_FOR_SECURITY]({ rootState, rootGetters }, pin) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);

    return api.security.validatePIN(pin, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  [VALIDATE_PIN_FOR_TRANSFER]({ rootState }, pin) {
    const transferFromAccount = rootState.transfer.transferFromAccount;

    return api.security.validatePIN(pin, transferFromAccount.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  [RESET_PIN]({ commit, rootState, rootGetters }, { pin, confirmedPIN, verificationCode }) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);
    commit(SET_IS_LOADING, true);

    return api.security.resetPIN(pin, confirmedPIN, verificationCode, account.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
          throw (error);
        },
      );
  },
  [SETUP_PIN]({ commit, dispatch, rootState, rootGetters }, { pin, confirmedPIN }) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);
    commit(SET_IS_LOADING, true);

    return api.security.setupPIN(pin, confirmedPIN, account.accessToken)
      .then(() => dispatch(FETCH_USER, { userId: rootState.security.selectedUserId }))
      .then(() => {
        commit(SET_IS_LOADING, false);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
          throw (error);
        },
      );
  },
  [CHANGE_PIN]({ commit, rootState, rootGetters }, { oldPIN, newPIN, confirmedPIN }) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);
    commit(SET_IS_LOADING, true);

    return api.security.changePIN(oldPIN, newPIN, confirmedPIN, account.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
          throw (error);
        },
      );
  },
  [REQUEST_VERIFICATION_CODE]({ commit, rootState, rootGetters }, { countryCode, phoneNum }) {
    const account = rootGetters.getUser(rootState.security.selectedUserId);
    return api.security.sendVerificationCodeToPhone(countryCode, phoneNum, account.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [ADD_PHONE_NUMBER]({ commit, rootState, rootGetters }, { countryCode, phoneNum, verificationCode }) {
    const account = rootGetters.getUser(this.state.security.selectedUserId);
    return api.security.addPhoneNumber(countryCode, phoneNum, verificationCode, account.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
   [CHANGE_PHONE_NUMBER]({ commit, rootState, rootGetters }, { countryCode, phoneNum, pin, verificationCode }) {
    const account = rootGetters.getUser(this.state.security.selectedUserId);
    return api.security.addPhoneNumber(countryCode, phoneNum, verificationCode, pin, account.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
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
