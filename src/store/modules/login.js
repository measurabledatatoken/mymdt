import api from '@/api';
import Constants from '@/constants';

const state = {
  loginSuccess: null,
  loginErrorCode: null,

  // the credential selected by user, single account will default to the first one.
  selectedCredential: {
    email_address: null,
    access_token: null,
  },
  credentials: [],
};

const getters = {
  loginSuccess: state => state.loginSuccess,
  loginErrorCode: state => state.loginErrorCode,
  selectedCredential: state => state.selectedCredential,
};

const mutations = {
  setLoginSuccess(state, loginSuccess) {
    state.loginSuccess = loginSuccess;
  },
  setLoginErrorCode(state, loginErrorCode) {
    state.loginErrorCode = loginErrorCode;
  },
  setSelectedCredential(state, credential) {
    state.selectedCredential = credential;
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
            context.commit('setLoginSuccess', true);

            if (data.length > 0) {
              const credential = {
                email_address: emailAddress,
                access_token: data.access_token,
              };
              const credentials = [credential];
              context.commit('setCredentials', credentials);
              context.commit('setSelectedCredential', credential);
            }

            resolve();
          },
        )
        .catch(
          (error) => {
            if (error.response && error.response.data) {
              context.commit('setLoginErrorCode', error.response.data.error_code);
            } else {
              context.commit('setLoginErrorCode', Constants.ErrorCode.UnknownError);
            }
            context.commit('setLoginSuccess', false);

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
            context.commit('setLoginSuccess', true);

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
              context.commit('setSelectedCredential', credentials[0]);
            }

            resolve();
          },
        )
        .catch(
          (error) => {
            if (error.response && error.response.data) {
              context.commit('setLoginErrorCode', error.response.data.error_code);
            } else {
              context.commit('setLoginErrorCode', Constants.ErrorCode.UnknownError);
            }
            context.commit('setLoginSuccess', false);

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
