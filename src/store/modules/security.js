import api from '@/api';
import { FETCH_USER } from '@/store/modules/entities/users';
import { REQUEST } from '@/store/modules/api';
import { SET_IS_LOADING } from '@/store/modules/common';
// mutation
export const SET_COUNTRY_DIALCODE = 'phoneVerifyScreen/SET_COUNTRY_DIALCODE';
export const SET_COUNTRY_CODE = 'phoneVerifyScreen/SET_COUNTRY_CODE';
export const SET_PHONENUMBER = 'phoneVerifyScreen/SET_PHONENUMBER';
export const SET_DONE_CALLBACK_PATH =
  'phoneVerifyScreen/SET_DONE_CALLBACK_PATH';
export const FLUSH_PHONE_STATE = 'phoneVerifyScreen/FLUSH_STATE';
export const SET_SECURITY_USER_PHONE_INFO =
  'security/SET_SECURITY_USER_PHONE_INFO';
export const SET_PIN_FOR_2FA_SETUP = 'security/SET_PIN_FOR_2FA_SETUP';
// export const SET_2FA_STATUS = 'security/SET_2FA_STATUS';

// action
export const VALIDATE_PIN = 'security/VALIDATE_PIN';
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
// export const GET_2FA_STATUS = 'security/GET_2FA_STATUS';
export const ENABLE_2FA = 'security/ENABLE_2FA';
export const DISABLE_2FA = 'security/DISABLE_2FA';
export const SET_2FA_OPTION = 'security/SET_2FA_OPTION';

const state = {
  countryDialCode: null,
  countryCode: null,
  phoneNumber: null,
  doneCallBackPath: null,
  pinFor2FASetup: null,
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
  [SET_SECURITY_USER_PHONE_INFO](state, user) {
    state.countryDialCode = user.countryDialCode;
    state.countryCode = user.countryCode;
    state.phoneNumber = user.phoneNumber;
  },
  [SET_PIN_FOR_2FA_SETUP](state, pin) {
    state.pinFor2FASetup = pin;
  },
};

const actions = {
  [VALIDATE_PIN]({ dispatch, rootGetters }, pin) {
    const account = rootGetters.getSelectedUser;

    return dispatch(REQUEST, {
      api: api.security.validatePIN,
      args: [pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: false,
    });
  },
  [RESET_PIN](
    { dispatch, rootGetters },
    { pin, confirmedPIN, verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;

    dispatch(REQUEST, {
      api: api.security.resetPIN,
      args: [pin, confirmedPIN, verificationCode, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  async [SETUP_PIN](
    { dispatch, rootState, rootGetters },
    { pin, confirmedPIN },
  ) {
    const account = rootGetters.getSelectedUser;
    try {
      const response = await dispatch(REQUEST, {
        api: api.security.setupPIN,
        args: [pin, confirmedPIN, account.accessToken],
        setLoading: true,
        openErrorPrompt: true,
      });

      dispatch(FETCH_USER, {
        userId: rootState.home.selectedUserId,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  [CHANGE_PIN]({ dispatch, rootGetters }, { oldPIN, newPIN, confirmedPIN }) {
    const account = rootGetters.getSelectedUser;
    return dispatch(REQUEST, {
      api: api.security.changePIN,
      args: [oldPIN, newPIN, confirmedPIN, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [REQUEST_VERIFICATION_CODE]({ dispatch, state, rootGetters }, { action }) {
    const account = rootGetters.getSelectedUser;
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
    { dispatch, rootState, rootGetters },
    { pin, verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;
    try {
      const response = await dispatch(REQUEST, {
        api: api.security.addPhoneNumber,
        args: [verificationCode, pin, account.accessToken],
        setLoading: true,
        openErrorPrompt: true,
      });

      dispatch(FETCH_USER, {
        userId: rootState.home.selectedUserId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  [CHANGE_PHONE_NUMBER](
    { dispatch, rootGetters },
    { oldVerificationCode, verificationCode, pin },
  ) {
    const account = rootGetters.getSelectedUser;
    return dispatch(REQUEST, {
      api: api.security.changePhoneNumber,
      args: [oldVerificationCode, verificationCode, pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  [VERIFY_VERIFICATION_CODE](
    { dispatch, rootGetters },
    { action, verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;

    return dispatch(REQUEST, {
      api: api.security.verifyCodeForPhoneNumber,
      args: [action, verificationCode, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
  async [ENABLE_2FA]({ dispatch, rootState, rootGetters }, { pin }) {
    const account = rootGetters.getSelectedUser;
    const response = await dispatch(REQUEST, {
      api: api.security.enable2FA,
      args: [pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: rootState.home.selectedUserId,
    });
    return response;
  },
  async [DISABLE_2FA](
    { dispatch, rootState, rootGetters },
    { pin, verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;
    const response = await dispatch(REQUEST, {
      api: api.security.disable2FA,
      args: [pin, verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    await dispatch(FETCH_USER, {
      userId: rootState.home.selectedUserId,
    });
    return response;
  },
  async [SET_2FA_OPTION](
    { dispatch, rootState, rootGetters, commit },
    { method, usage },
  ) {
    const account = rootGetters.getSelectedUser;
    const timeoutId = setTimeout(() => commit(SET_IS_LOADING, true), 200);
    const response = await dispatch(REQUEST, {
      api: api.security.set2FAOption,
      args: [method, usage, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    await dispatch(FETCH_USER, {
      userId: rootState.home.selectedUserId,
    });
    if (timeoutId) clearTimeout(timeoutId);
    commit(SET_IS_LOADING, false);
    return response;
  },
  async [GENERATE_GOOGLE_AUTHENTICATOR_SECRET](
    { dispatch, rootState, rootGetters },
    { pin },
  ) {
    const account = rootGetters.getSelectedUser;
    const response = await dispatch(REQUEST, {
      api: api.security.generateGoogleAuthSecret,
      args: [pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: rootState.home.selectedUserId,
    });
    return response;
  },
  async [VERIFY_GOOGLE_AUTHENTICATOR_SECRET](
    { dispatch, rootState, rootGetters },
    { verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;
    const response = await dispatch(REQUEST, {
      api: api.security.verifyGoogleAuthSecret,
      args: [verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: rootState.home.selectedUserId,
    });
    return response;
  },
  [VERIFY_GOOGLE_AUTHENTICATOR_OTP](
    { dispatch, rootGetters },
    { verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;
    return dispatch(REQUEST, {
      api: api.security.verifyGoogleAuthOTP,
      args: [verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
  },
  async [DISABLE_GOOGLE_AUTHENTICATOR](
    { dispatch, rootState, rootGetters },
    { pin, verificationCode },
  ) {
    const account = rootGetters.getSelectedUser;
    const response = await dispatch(REQUEST, {
      api: api.security.disableGoogleAuth,
      args: [pin, verificationCode, account.accessToken],
      setLoading: false,
      openErrorPrompt: true,
    });
    dispatch(FETCH_USER, {
      userId: rootState.home.selectedUserId,
    });
    return response;
  },
};

export default {
  state,
  mutations,
  actions,
};
