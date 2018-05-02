import api from '@/api';
import Constants from '@/constants';

const state = {
  loginSuccess: null,
  errorCode: null,

  // the credential selected by user, single account will defailt to the first one.
  credential: {
    userName: null,
    emailAddress: null,
    mdtbalance: null,
    accessToken: null,
  },
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
  setCredential(state, { userName, emailAddress, mdtbalance, accessToken }) {
    state.credential.userName = userName;
    state.credential.emailAddress = emailAddress;
    state.credential.mdtbalance = mdtbalance;
    state.credential.accessToken = accessToken;
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
            context.commit('setCredential',
              {
                userName: data.user_name,
                emailAddress: data.email_address,
                mdtbalance: data.mdtbalance,
                accessToken: data.access_token,
              });
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
