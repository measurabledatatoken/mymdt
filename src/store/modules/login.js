import api from '@/api';
import { ErrorCode } from '@/constants';

const state = {
  loginSuccess: null,
  loginErrorCode: null,

  credentials: [],
};

const getters = {
  loginSuccess: state => state.loginSuccess,
  loginErrorCode: state => state.loginErrorCode,
  credentials: state => state.credentials,
};

const mutations = {
  setLoginErrorCode(state, loginErrorCode) {
    state.loginErrorCode = loginErrorCode;
    if (loginErrorCode == null) {
      state.loginSuccess = true;
    } else {
      state.loginSuccess = false;
    }
  },
  setCredentials(state, credentials) {
    state.credentials = credentials;
  },
};

const actions = {
  confirmLogin(context, { emailAddress, password, apikey }) {
    return new Promise((resolve, reject) => {
      api.auth.login(emailAddress, password, apikey)
        .then(
          (data) => {
            context.commit('setLoginErrorCode', null);

            if (data.length > 0) {
              const credential = {
                email_address: emailAddress,
                access_token: data.access_token,
              };
              const credentials = [credential];
              context.commit('setCredentials', credentials);
            }

            resolve();
          },
        )
        .catch(
          (error) => {
            if (error.response && error.response.data) {
              context.commit('setLoginErrorCode', error.response.data.error_code);
            } else {
              context.commit('setLoginErrorCode', ErrorCode.UnknownError);
            }

            reject();
          },
        );
    });
  },
  autoLogin(context, { authTokens, apiKey }) {
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
            context.commit('setLoginErrorCode', null);

            if (data.length > 0) {
              const credentials = [];
              data.forEach((dataItem) => {
                const credential = {
                  email_address: dataItem.email_address,
                  access_token: dataItem.access_token,
                };
                credentials.push(credential);
              });
              context.commit('setCredentials', credentials);
            }

            resolve();
          },
        )
        .catch(
          (error) => {
            if (error.response && error.response.data) {
              context.commit('setLoginErrorCode', error.response.data.error_code);
            } else {
              context.commit('setLoginErrorCode', ErrorCode.UnknownError);
            }
            reject();
          },
        );
    });
  },
};


export default{
  state,
  getters,
  actions,
  mutations,
};
