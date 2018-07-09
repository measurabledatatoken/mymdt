import api from '@/api';
import {
  SET_IS_LOADING,
} from '@/store/modules/common';
import {
  FETCH_USER,
} from '@/store/modules/entities/users';


// mutation
export const SET_COUNTRY_DIALCODE = 'phoneVerifyScreen/SET_COUNTRY_DIALCODE';
export const SET_COUNTRY_CODE = 'phoneVerifyScreen/SET_COUNTRY_CODE';
export const SET_PHONENUMBER = 'phoneVerifyScreen/SET_PHONENUMBER';
export const SET_DONE_CALLBACK_PATH = 'phoneVerifyScreen/SET_DONE_CALLBACK_PATH';
export const FLUSH_PHONE_STATE = 'phoneVerifyScreen/FLUSH_STATE';
export const SET_SELECTED_USER = 'security/SET_SELECTED_USER';
export const SET_SECURITY_USER_PHONE_INFO = 'security/SET_SECURITY_USER_PHONE_INFO';

// action
export const VALIDATE_PIN_FOR_SECURITY = 'security/VALIDATE_PIN_FOR_SECURITY';
export const VALIDATE_PIN_FOR_TRANSFER = 'security/VALIDATE_PIN_FOR_TRANSFER';
export const SETUP_PIN = 'security/SETUP_PIN';
export const CHANGE_PIN = 'security/CHANGE_PIN';
export const RESET_PIN = 'security/RESET_PIN';

export const REQUEST_VERIFICATION_CODE = 'security/REQUEST_VERIFICATION_CODE';
export const ADD_PHONE_NUMBER = 'security/ADD_PHONE_NUMBER';
export const CHANGE_PHONE_NUMBER = 'security/CHANGE_PHONE_NUMBER';
export const VERIFY_VERIFICATION_CODE = 'security/VERIFY_VERIFICATION_CODE';

const state = {
  countryDialCode: null,
  countryCode: null,
  phoneNumber: null,
  doneCallBackPath: null,
  selectedUserId: null,
};

const getters = {
  // eslint-disable-next-line
  getSelectedSecurityUser: (state, getters, rootState, rootGetters) => rootGetters.getUser(state.selectedUserId),
};

const mutations = {
  [SET_COUNTRY_DIALCODE](state, countryDialCode) {
    state.countryDialCode = countryDialCode;
  },
  [SET_COUNTRY_CODE](state, countryCode) {
    state.countryCode = countryCode;
  },
  [SET_PHONENUMBER](state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  [SET_DONE_CALLBACK_PATH](state, doneCallBackPath) {
    state.doneCallBackPath = doneCallBackPath;
  },
  [FLUSH_PHONE_STATE](state) {
    state.countryDialCode = null;
    state.countryCode = null;
    state.phoneNumber = null;
  },
  [SET_SELECTED_USER](state, emailAddress) {
    state.selectedUserId = emailAddress;
  },
  [SET_SECURITY_USER_PHONE_INFO](state, user) {
    state.countryDialCode = user.countryDialCode;
    state.countryCode = user.countryCode;
    state.phoneNumber = user.phoneNumber;
  },
};

const actions = {
  [VALIDATE_PIN_FOR_SECURITY]({
    state,
    rootGetters,
  }, pin) {
    const account = rootGetters.getUser(state.selectedUserId);

    return api.security.validatePIN(pin, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  [VALIDATE_PIN_FOR_TRANSFER]({
    rootState,
  }, pin) {
    const transferFromAccount = rootState.transfer.transferFromAccount;

    return api.security.validatePIN(pin, transferFromAccount.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  [RESET_PIN]({
    commit,
    state,
    rootGetters,
  }, {
    pin,
    confirmedPIN,
    verificationCode,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
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
  [SETUP_PIN]({
    commit,
    dispatch,
    state,
    rootGetters,
  }, {
    pin,
    confirmedPIN,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    commit(SET_IS_LOADING, true);

    return api.security.setupPIN(pin, confirmedPIN, account.accessToken)
      .then(() => dispatch(FETCH_USER, {
        userId: state.selectedUserId,
      }))
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
  [CHANGE_PIN]({
    commit,
    state,
    rootGetters,
  }, {
    oldPIN,
    newPIN,
    confirmedPIN,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
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
  [REQUEST_VERIFICATION_CODE]({
    commit,
    state,
    rootGetters,
  }, {
    action,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return api.security.sendVerificationCodeToPhone(
      state.countryDialCode + state.phoneNumber,
      action,
      account.accessToken)
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
  [ADD_PHONE_NUMBER]({
    commit,
    dispatch,
    state,
    rootGetters,
  }, {
    pin,
    verificationCode,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return api.security.addPhoneNumber(
      pin,
      verificationCode,
      account.accessToken,
    ).then(
      () => dispatch(FETCH_USER, {
        userId: state.selectedUserId,
      }),
    ).then(
      () => {
        commit(SET_IS_LOADING, false);
        commit(FLUSH_PHONE_STATE);
      },
    ).catch(
      (error) => {
        commit(SET_IS_LOADING, false);
        throw (error);
      },
    );
  },
  [CHANGE_PHONE_NUMBER]({
    commit,
    dispatch,
    state,
    rootGetters,
  }, {
    oldVerificationCode,
    verificationCode,
    pin,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return api.security.changePhoneNumber(
      oldVerificationCode,
      verificationCode,
      pin,
      account.accessToken,
    ).then(
      () => dispatch(FETCH_USER, {
        userId: state.selectedUserId,
      }),
    ).then(
      () => {
        commit(SET_IS_LOADING, false);
        commit(FLUSH_PHONE_STATE);
      },
    ).catch(
      (error) => {
        commit(SET_IS_LOADING, false);
        throw (error);
      },
    );
  },
  [VERIFY_VERIFICATION_CODE]({
    commit,
    state,
    rootGetters,
  }, {
    action,
    verificationCode,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return api.security.verifyCodeForPhoneNumber(
      action,
      verificationCode,
      account.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
        commit(FLUSH_PHONE_STATE);
      })
      .catch(
        (error) => {
          commit(SET_IS_LOADING, false);
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
