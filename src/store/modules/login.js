import api from '@/api';
import { ErrorCode } from '@/constants';

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
  [REQUEST_LOGIN](context, { emailAddress, password, apikey }) {
    return new Promise((resolve, reject) => {
      api.auth.login(emailAddress, password, apikey)
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

            reject();
          },
        );
    });
  },
  [REQUEST_AUTO_LOGIN](context, { authTokens, apiKey }) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(authTokens)) {
        console.error('authTokens should all be array');
        reject();
      }

      const appCredentials = [];
      for (let i = 0; i < authTokens.length; i += 1) {
        const appCredential = { token: authTokens[i] };
        appCredentials.push(appCredential);
      }

      api.auth.autoLogin(appCredentials, apiKey)
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
            reject();
          },
        );
    });
  },
};


export default{
  state,
  mutations,
  actions,
};
