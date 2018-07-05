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
  getInvalidUser: (state) => {
    const invalidUsers = [];
    state.invalidEmails.forEach(
      (emails) => {
        const tempUser = { emailAddress: emails };
        invalidUsers.push(tempUser);
      },
    );
    return invalidUsers;
  },
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
  [REQUEST_AUTO_LOGIN](context, {
    authTokens,
    emails,
    appID,
    locale,
  }) {
    context.commit(SET_IS_LOADING, true);

    if (!Array.isArray(authTokens)) {
      return Promise.reject(new Error('authTokens should all be array'));
    }

    if (authTokens.length !== emails.length) {
      return Promise.reject(new Error('authTokens and emails should be same length'));
    }

    const appCredentials = [];
    for (let i = 0; i < authTokens.length; i += 1) {
      const appCredential = {
        token: authTokens[i],
        email_address: emails[i],
      };
      appCredentials.push(appCredential);
    }

    return api.auth.autoLogin(appCredentials, appID, locale)
      .then(
        (data) => {
          context.commit(SET_LOGIN_ERRORCODE, null);

          const credentials = [];
          data.valid.forEach((dataItem) => {
            const credential = {
              email_address: dataItem.email_address,
              access_token: dataItem.access_token,
            };
            credentials.push(credential);
          });
          context.commit(SET_CREDENTIALS, credentials);
          context.commit(SET_INVALIDEMAILS, data.invalid);
          return context.dispatch(REQUEST_USER_ACCOUNTS);
        },
      ).then(
        () => {
          context.commit(SET_APP_ID, appID);
          context.commit(SET_IS_LOADING, false);
        },
      )
      .catch(
        (error) => {
          if (error.response && error.response.data) {
            context.commit(SET_LOGIN_ERRORCODE, error.response.data.error_code);
          } else {
            context.commit(SET_LOGIN_ERRORCODE, ErrorCode.UnknownError);
          }
          context.commit(SET_IS_LOADING, false);
          throw (error);
        },
      );
  },
  [VALIDATE_PASSCODE](context, { passcode, credential }) {
    return api.auth.validatePasscode(passcode, credential);
  },
};


export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
