import api from '@/api';
import { ErrorCode } from '@/enum';
import { REQUEST_USER_ACCOUNTS, SET_APP_ID } from '@/store/modules/home';
import { HANDLE_ERROR_CODE, REQUEST } from '@/store/modules/api';

// mutations
export const SET_LOGIN_ERRORCODE = 'login/SET_LOGIN_ERRORCODE';
export const SET_CREDENTIALS = 'login/SET_CREDENTIALS';
export const SET_INVALIDEMAILS = 'login/SET_INVALIDEMAILS';

// actions
export const REQUEST_LOGIN = 'login/REQUEST_LOGIN';
export const REQUEST_AUTO_LOGIN = 'login/REQUEST_AUTO_LOGIN';
export const VALIDATE_PASSCODE = 'login/VALIDATE_PASSCODE';

const state = {
  loginSuccess: null,
  loginErrorCode: null,

  credentials: [],
  invalidEmails: [],
};

const moduleGetters = {
  getInvalidUser: state =>
    state.invalidEmails.map(email => ({
      emailAddress: email,
    })),
};

const mutations = {
  [SET_LOGIN_ERRORCODE](state, loginErrorCode) {
    state.loginErrorCode = loginErrorCode;
    if (loginErrorCode == null) {
      state.loginSuccess = true;
    } else {
      state.loginSuccess = false;
    }
  },
  [SET_CREDENTIALS](state, credentials) {
    state.credentials = credentials;
  },
  [SET_INVALIDEMAILS](state, invalidEmails) {
    state.invalidEmails = invalidEmails;
  },
};

const actions = {
  async [REQUEST_LOGIN](
    { commit, dispatch },
    { emailAddress, password, appID },
  ) {
    try {
      const data = await dispatch(REQUEST, {
        api: api.auth.login,
        args: [emailAddress, password, appID],
        openErrorPrompt: true,
      });
      commit(SET_LOGIN_ERRORCODE, null);

      if (data.length > 0) {
        const credential = {
          email_address: emailAddress,
          access_token: data.access_token,
          claimed_amount: data.claimed_amount,
        };
        const credentials = [credential];
        commit(SET_CREDENTIALS, credentials);
      }
      commit(SET_APP_ID, appID);

      return null;
    } catch (error) {
      if (error.response && error.response.data) {
        commit(SET_LOGIN_ERRORCODE, error.response.data.error_code);
      } else {
        commit(SET_LOGIN_ERRORCODE, ErrorCode.UnknownError);
      }
      throw error;
    }
  },
  async [REQUEST_AUTO_LOGIN](
    { commit, dispatch, rootState },
    { authTokens, emails, appID, inviteCodes, inviteUrls, inviterCode },
  ) {
    // commit(SET_IS_LOADING, true);

    if (!Array.isArray(authTokens)) {
      return Promise.reject(new Error('authTokens should all be array'));
    }

    if (authTokens.length !== emails.length) {
      return Promise.reject(
        new Error('authTokens and emails should be same length'),
      );
    }

    if (inviteCodes && inviteUrls) {
      if (
        authTokens.length !== inviteCodes.length ||
        authTokens.length !== inviteUrls.length
      ) {
        return Promise.reject(
          new Error(
            'inviteCodes and inviteUrls should be of same length as authTokens',
          ),
        );
      }
    }

    const appCredentials = authTokens.map((authToken, i) => ({
      token: authToken,
      email_address: emails[i],
      invite_code: inviteCodes ? inviteCodes[i] : '',
      invite_url: inviteUrls ? inviteUrls[i] : '',
    }));

    const locale = rootState.common.locale;

    try {
      const data = await dispatch(REQUEST, {
        api: api.auth.autoLogin,
        args: [appCredentials, appID, locale, { inviterCode }],
        setLoading: true,
        persistLoading: true,
      });
      commit(SET_LOGIN_ERRORCODE, null);
      const credentials = data.valid.map(dataItem => ({
        email_address: dataItem.email_address,
        access_token: dataItem.access_token,
        claimed_amount: dataItem.claimed_amount,
        claimable_amount: dataItem.claimable_amount,
      }));
      commit(SET_CREDENTIALS, credentials);
      commit(SET_INVALIDEMAILS, data.invalid);
      await dispatch(REQUEST_USER_ACCOUNTS);
      commit(SET_APP_ID, appID);
    } catch (error) {
      if (error.response && error.response.data) {
        commit(SET_LOGIN_ERRORCODE, error.response.data.error_code);
      } else {
        commit(SET_LOGIN_ERRORCODE, ErrorCode.UnknownError);
      }
      dispatch(HANDLE_ERROR_CODE, {
        error,
        openErrorPrompt: 'default',
      });
    }
  },
  [VALIDATE_PASSCODE]({ dispatch }, { passcode, credential }) {
    return dispatch(REQUEST, {
      api: api.auth.validatePasscode,
      args: [passcode, credential],
      openErrorPrompt: true,
    });
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
