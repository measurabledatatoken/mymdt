import api from '@/api';
import {
  FETCH_USER,
} from '@/store/modules/entities/users';
import {
  REQUEST,
} from '@/store/modules/api';

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
    dispatch,
    rootGetters,
  }, pin) {
    const account = rootGetters.getUser(state.selectedUserId);

    return dispatch(REQUEST, {
      api: api.security.validatePIN,
      args: [pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: false,
    });
  },
  [VALIDATE_PIN_FOR_TRANSFER]({
    dispatch,
    rootState,
  }, pin) {
    const transferFromAccount = rootState.transfer.transferFromAccount;

    return dispatch(REQUEST, {
      api: api.security.validatePIN,
      args: [pin, transferFromAccount.accessToken],
      setLoading: true,
      openErrorPrompt: false,
    });
  },
  [RESET_PIN]({
    dispatch,
    state,
    rootGetters,
  }, {
    pin,
    confirmedPIN,
    verificationCode,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);

    dispatch(REQUEST, {
      api: api.security.resetPIN,
      args: [pin, confirmedPIN, verificationCode, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  async [SETUP_PIN]({
    dispatch,
    state,
    rootGetters,
  }, {
    pin,
    confirmedPIN,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    try {
      const response = await dispatch(REQUEST, {
        api: api.security.setupPIN,
        args: [pin, confirmedPIN, account.accessToken],
        setLoading: true,
        openErrorPrompt: true,
      });

      dispatch(FETCH_USER, {
        userId: state.selectedUserId,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  [CHANGE_PIN]({
    dispatch,
    state,
    rootGetters,
  }, {
    oldPIN,
    newPIN,
    confirmedPIN,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.changePIN,
      args: [oldPIN, newPIN, confirmedPIN, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [REQUEST_VERIFICATION_CODE]({
    dispatch,
    state,
    rootGetters,
  }, {
    action,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.sendVerificationCodeToPhone,
      args: [state.countryDialCode + state.phoneNumber, action, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  async [ADD_PHONE_NUMBER]({
    dispatch,
    state,
    rootGetters,
  }, {
    pin,
    verificationCode,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    try {
      const response = await dispatch(REQUEST, {
        api: api.security.addPhoneNumber,
        args: [verificationCode, pin, account.accessToken],
        setLoading: true,
        openErrorPrompt: true,
      });

      dispatch(FETCH_USER, {
        userId: state.selectedUserId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  [CHANGE_PHONE_NUMBER]({
    dispatch,
    state,
    rootGetters,
  }, {
    oldVerificationCode,
    verificationCode,
    pin,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.changePhoneNumber,
      args: [oldVerificationCode, verificationCode, pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [VERIFY_VERIFICATION_CODE]({
    dispatch,
    state,
    rootGetters,
  }, {
    action,
    verificationCode,
  }) {
    const account = rootGetters.getUser(state.selectedUserId);

    return dispatch(REQUEST, {
      api: api.security.verifyCodeForPhoneNumber,
      args: [action, verificationCode, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
