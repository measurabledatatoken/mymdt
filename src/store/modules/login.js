import api from '@/api';
import {
  ErrorCode,
} from '@/enum';
import {
  REQUEST_USER_ACCOUNTS,
  SET_APP_ID,
} from '@/store/modules/home';
import {
  SET_IS_LOADING,
} from '@/store/modules/common';
import {
  HANDLE_ERROR_CODE,
} from '@/store/modules/api';

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
  getInvalidUser: state => state.invalidEmails.map(
    email => ({
      emailAddress: email,
    }),
  ),
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
  [REQUEST_LOGIN](context, {
    emailAddress,
    password,
    appID,
  }) {
    return api.auth.login(emailAddress, password, appID)
      .then(
        (data) => {
          context.commit(SET_LOGIN_ERRORCODE, null);

          if (data.length > 0) {
            const credential = {
              email_address: emailAddress,
              access_token: data.access_token,
            };
            const credentials = [credential];
            context.commit(SET_CREDENTIALS, credentials);
          }
          context.commit(SET_APP_ID, appID);

          return null;
        },
      )
      .catch(
        (error) => {
          if (error.response && error.response.data) {
            context.commit(SET_LOGIN_ERRORCODE, error.response.data.error_code);
          } else {
            context.commit(SET_LOGIN_ERRORCODE, ErrorCode.UnknownError);
          }
          throw (error);
        },
      );
  },
  [REQUEST_AUTO_LOGIN]({
    commit,
    dispatch,
    rootState,
  }, {
    authTokens,
    emails,
    appID,
  }) {
    commit(SET_IS_LOADING, true);

    if (!Array.isArray(authTokens)) {
      return Promise.reject(new Error('authTokens should all be array'));
    }

    if (authTokens.length !== emails.length) {
      return Promise.reject(new Error('authTokens and emails should be same length'));
    }

    const appCredentials = authTokens.map(
      (authToken, i) => ({
        token: authToken,
        email_address: emails[i],
      }),
    );

    const locale = rootState.common.locale;
    return api.auth.autoLogin(appCredentials, appID, locale)
      .then(
        (data) => {
          commit(SET_LOGIN_ERRORCODE, null);

          const credentials = data.valid.map(
            dataItem => ({
              email_address: dataItem.email_address,
              access_token: dataItem.access_token,
            }),
          );
          commit(SET_CREDENTIALS, credentials);
          commit(SET_INVALIDEMAILS, data.invalid);
          return dispatch(REQUEST_USER_ACCOUNTS);
        },
      ).then(
        () => {
          commit(SET_APP_ID, appID);
          commit(SET_IS_LOADING, false);
        },
      )
      .catch((error) => {
        if (error.response && error.response.data) {
          commit(SET_LOGIN_ERRORCODE, error.response.data.error_code);
        } else {
          commit(SET_LOGIN_ERRORCODE, ErrorCode.UnknownError);
        }
        commit(SET_IS_LOADING, false);
        dispatch(HANDLE_ERROR_CODE, {
          error,
          openErrorPrompt: 'default',
        });
      });
  },
  [VALIDATE_PASSCODE](context, {
    passcode,
    credential,
  }) {
    return api.auth.validatePasscode(passcode, credential);
  },
};


export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
