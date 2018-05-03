import api from '@/api';
import Constants from '@/constants';

const state = {
  loginSuccess: null,
  loginErrorCode: null,

  // the credential selected by user, single account will default to the first one.
  selectedCredential: {
    accessToken: null,
  },
  credentials: [],
};

const getters = {
  loginSuccess: state => state.loginSuccess,
  loginErrorCode: state => state.loginErrorCode,
  credential: state => state.credential,
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
      api.account.login(emailAddress, password, apikey)
        .then(
          (data) => {
            context.commit('setLoginErrorCode', null);
            context.commit('setLoginSuccess', true);

            if (data != null) {
              const credential = {
                accessToken: data.access_token,
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
  autoLogin(context, { userNames, emailAddresses, authTokens, apiKey }) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(userNames) || !Array.isArray(emailAddresses) || !Array.isArray(authTokens)) {
        console.error('userNames, userEmails, authTokens should all be array');
        reject();
      }

      if (
        userNames.length !== emailAddresses.length || emailAddresses.length !== authTokens.length) {
        console.error('userNames, userEmails, authTokens should all be array with same length');
        reject();
      }
      const appCredentials = [];
      for (let i = 0; i < userNames.length; i += 1) {
        const appCredential = api.account.convertDataToAppCredential(
          userNames[i],
          emailAddresses[i],
          authTokens[i],
        );
        appCredentials.push(appCredential);
      }

      api.account.autoLogin(appCredentials, apiKey)
        .then(
          (data) => {
            context.commit('setLoginErrorCode', null);
            context.commit('setLoginSuccess', true);

            if (data != null) {
              console.log(`data:${JSON.stringify(data)}`);
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
