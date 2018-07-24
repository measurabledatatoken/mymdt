import api from '@/api';
import { regTrackingSuperProperties } from '@/utils';
import { FETCH_USER } from '@/store/modules/entities/users';
import { REQUEST } from '@/store/modules/api';

// mutation
export const SET_COUNTRY_DIALCODE = 'phoneVerifyScreen/SET_COUNTRY_DIALCODE';
export const SET_COUNTRY_CODE = 'phoneVerifyScreen/SET_COUNTRY_CODE';
export const SET_PHONENUMBER = 'phoneVerifyScreen/SET_PHONENUMBER';
export const SET_DONE_CALLBACK_PATH =
  'phoneVerifyScreen/SET_DONE_CALLBACK_PATH';
export const FLUSH_PHONE_STATE = 'phoneVerifyScreen/FLUSH_STATE';
export const SET_SELECTED_USER = 'security/SET_SELECTED_USER';
export const SET_SECURITY_USER_PHONE_INFO =
  'security/SET_SECURITY_USER_PHONE_INFO';
export const SET_PIN_FOR_GOOGLE_AUTH_SETUP =
  'security/SET_PIN_FOR_GOOGLE_AUTH_SETUP';

// action
export const VALIDATE_PIN_FOR_SECURITY = 'security/VALIDATE_PIN_FOR_SECURITY';
export const VALIDATE_PIN_FOR_TRANSFER = 'security/VALIDATE_PIN_FOR_TRANSFER';
export const VALIDATE_PIN_FOR_SELECTED_USER =
  'security/VALIDATE_PIN_FOR_SELECTED_USER';
export const SETUP_PIN = 'security/SETUP_PIN';
export const CHANGE_PIN = 'security/CHANGE_PIN';
export const RESET_PIN = 'security/RESET_PIN';

export const REQUEST_VERIFICATION_CODE = 'security/REQUEST_VERIFICATION_CODE';
export const ADD_PHONE_NUMBER = 'security/ADD_PHONE_NUMBER';
export const CHANGE_PHONE_NUMBER = 'security/CHANGE_PHONE_NUMBER';
export const VERIFY_VERIFICATION_CODE = 'security/VERIFY_VERIFICATION_CODE';

export const GENERATE_GOOGLE_AUTHENTICATOR_SECRET =
  'security/GENERATE_GOOGLE_AUTHENTICATOR_SECRET';
export const VERIFY_GOOGLE_AUTHENTICATOR_SECRET =
  'security/VERIFY_GOOGLE_AUTHENTICATOR_SECRET';
export const DISABLE_GOOGLE_AUTHENTICATOR =
  'security/DISABLE_GOOGLE_AUTHENTICATOR';
export const VERIFY_GOOGLE_AUTHENTICATOR_OTP =
  'security/VERIFY_GOOGLE_AUTHENTICATOR_OTP';
export const GET_2FA_STATUS = 'security/GET_2FA_STATUS';
export const ENABLE_2FA = 'security/ENABLE_2FA';
export const DISABLE_2FA = 'security/DISABLE_2FA';
export const SET_2FA_OPTION = 'security/SET_2FA_OPTION';

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
    regTrackingSuperProperties({ 'Email Address': emailAddress });
  },
  [SET_SECURITY_USER_PHONE_INFO](state, user) {
    state.countryDialCode = user.countryDialCode;
    state.countryCode = user.countryCode;
    state.phoneNumber = user.phoneNumber;
  },
  [SET_PIN_FOR_GOOGLE_AUTH_SETUP](state, pin) {
    state.pinForGoogleAuthSetup = pin;
  },
};

const actions = {
  [VALIDATE_PIN_FOR_SECURITY]({ state, dispatch, rootGetters }, pin) {
    const account = rootGetters.getUser(state.selectedUserId);

    return dispatch(REQUEST, {
      api: api.security.validatePIN,
      args: [pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: false,
    });
  },
  [VALIDATE_PIN_FOR_SELECTED_USER]({ dispatch, rootGetters }, pin) {
    const account = rootGetters.getSelectedUser;
    return dispatch(REQUEST, {
      api: api.security.validatePIN,
      args: [pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: false,
    });
  },
  [VALIDATE_PIN_FOR_TRANSFER]({ dispatch, rootState }, pin) {
    const transferFromAccount = rootState.transfer.transferFromAccount;

    return dispatch(REQUEST, {
      api: api.security.validatePIN,
      args: [pin, transferFromAccount.accessToken],
      setLoading: true,
      openErrorPrompt: false,
    });
  },
  [RESET_PIN](
    { dispatch, state, rootGetters },
    { pin, confirmedPIN, verificationCode },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);

    dispatch(REQUEST, {
      api: api.security.resetPIN,
      args: [pin, confirmedPIN, verificationCode, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  async [SETUP_PIN]({ dispatch, state, rootGetters }, { pin, confirmedPIN }) {
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
  [CHANGE_PIN](
    { dispatch, state, rootGetters },
    { oldPIN, newPIN, confirmedPIN },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.changePIN,
      args: [oldPIN, newPIN, confirmedPIN, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [REQUEST_VERIFICATION_CODE]({ dispatch, state, rootGetters }, { action }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.sendVerificationCodeToPhone,
      args: [
        state.countryDialCode + state.phoneNumber,
        action,
        account.accessToken,
      ],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  async [ADD_PHONE_NUMBER](
    { dispatch, state, rootGetters },
    { pin, verificationCode },
  ) {
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
  [CHANGE_PHONE_NUMBER](
    { dispatch, state, rootGetters },
    { oldVerificationCode, verificationCode, pin },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.changePhoneNumber,
      args: [oldVerificationCode, verificationCode, pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [VERIFY_VERIFICATION_CODE](
    { dispatch, state, rootGetters },
    { action, verificationCode },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);

    return dispatch(REQUEST, {
      api: api.security.verifyCodeForPhoneNumber,
      args: [action, verificationCode, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [GET_2FA_STATUS]({ dispatch, state, rootGetters }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.get2FAStatus,
      args: [account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
  },
  [ENABLE_2FA]({ dispatch, state, rootGetters }, { pin }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.enable2FA,
      args: [pin, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
  },
  [DISABLE_2FA]({ dispatch, state, rootGetters }, { pin, verificationCode }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.disable2FA,
      args: [pin, verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
  },
  [SET_2FA_OPTION]({ dispatch, state, rootGetters }, { usage }) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.set2FAOption,
      args: [usage, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
  },
  async [GENERATE_GOOGLE_AUTHENTICATOR_SECRET](
    { dispatch, state, rootGetters },
    { pin },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);
    const response = await dispatch(REQUEST, {
      api: api.security.generateGoogleAuthSecret,
      args: [pin, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: state.selectedUserId,
    });
    return response;
  },
  async [VERIFY_GOOGLE_AUTHENTICATOR_SECRET](
    { dispatch, state, rootGetters },
    { verificationCode },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);
    const response = await dispatch(REQUEST, {
      api: api.security.verifyGoogleAuthSecret,
      args: [verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: state.selectedUserId,
    });
    return response;
  },
  [VERIFY_GOOGLE_AUTHENTICATOR_OTP](
    { dispatch, state, rootGetters },
    { verificationCode },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);
    return dispatch(REQUEST, {
      api: api.security.verifyGoogleAuthOTP,
      args: [verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
  },
  async [DISABLE_GOOGLE_AUTHENTICATOR](
    { dispatch, state, rootGetters },
    { pin, verificationCode },
  ) {
    const account = rootGetters.getUser(state.selectedUserId);
    const response = await dispatch(REQUEST, {
      api: api.security.disableGoogleAuth,
      args: [pin, verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: state.selectedUserId,
    });
    return response;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
