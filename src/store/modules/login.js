import api from '@/api';
import Constants from '@/constants';

const state = {
  loginSuccess: null,
  errorCode: null,

  // the credential selected by user, single account will defailt to the first one.
  selectedCredential: {
    accessToken: null,
  },
  credentials: [],
};

const getters = {
  loginSuccess: state => state.loginSuccess,
  errorCode: state => state.errorCode,
  credential: state => state.credential,
};

const mutations = {
  setLoginSuccess(state, loginSuccess) {
    state.loginSuccess = loginSuccess;
  },
  setErrorCode(state, errorCode) {
    state.errorCode = errorCode;
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
    api.login(emailAddress, password, apikey)
      .then(
        (data) => {
          context.commit('setErrorCode', null);
          context.commit('setLoginSuccess', true);

          if (data != null) {
            const credential = {
              accessToken: data.access_token,
            };
            const credentials = [credential];
            context.commit('setCredentials', credentials);
            context.commit('setSelectedCredential', credential);
          }
        },
      )
      .catch(
        (error) => {
          if (error.response && error.response.data) {
            context.commit('setErrorCode', error.response.data.error_code);
          } else {
            context.commit('setErrorCode', Constants.ErrorCode.UnknownError);
          }
          context.commit('setLoginSuccess', false);
        },
      );
  },
};


export default{
  state,
  getters,
  actions,
  mutations,
};
