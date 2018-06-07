import api from '@/api';
import { ErrorCode } from '@/enum';
import {
  REQUEST_USER_ACCOUNTS,
} from '@/store/modules/home';
import {
  SET_IS_LOADING,
} from '@/store/modules/common';

// mutations
export const SET_LOGIN_ERRORCODE = 'login/SET_LOGIN_ERRORCODE';
export const SET_CREDENTIALS = 'login/SET_CREDENTIALS';

// actions
export const REQUEST_LOGIN = 'login/REQUEST_LOGIN';
export const REQUEST_AUTO_LOGIN = 'login/REQUEST_AUTO_LOGIN';

const state = {
  loginSuccess: null,
  loginErrorCode: null,

  credentials: [],
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
};

const actions = {
  [REQUEST_LOGIN](context, {
    emailAddress,
    password,
    appID,
  }) {
    return new Promise((resolve, reject) => {
      api.auth.login(emailAddress, password, appID)
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

            resolve();
          },
        )
        .catch(
          (error) => {
            if (error.response && error.response.data) {
              context.commit(SET_LOGIN_ERRORCODE, error.response.data.error_code);
            } else {
              context.commit(SET_LOGIN_ERRORCODE, ErrorCode.UnknownError);
            }
            reject(error);
          },
        );
    });
  },
  [REQUEST_AUTO_LOGIN](context, {
    authTokens,
    appID,
  }) {
    context.commit(SET_IS_LOADING, true);

    if (!Array.isArray(authTokens)) {
      return Promise.reject(new Error('authTokens should all be array'));
    }

    const appCredentials = [];
    for (let i = 0; i < authTokens.length; i += 1) {
      const appCredential = {
        token: authTokens[i],
      };
      appCredentials.push(appCredential);
    }

    return api.auth.autoLogin(appCredentials, appID)
      .then(
        (data) => {
          context.commit(SET_LOGIN_ERRORCODE, null);

          if (data.length > 0) {
            const credentials = [];
            data.forEach((dataItem) => {
              const credential = {
                email_address: dataItem.email_address,
                access_token: dataItem.access_token,
              };
              credentials.push(credential);
            });
            context.commit(SET_CREDENTIALS, credentials);

            return context.dispatch(REQUEST_USER_ACCOUNTS);
          }
          throw (new Error('Data length is 0'));
        },
      ).then(
        () => {
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
};


export default {
  state,
  mutations,
  actions,
};
