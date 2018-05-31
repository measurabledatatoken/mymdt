import api from '@/api';
// Mutations
export const SET_MDT_PRICE = 'home/SET_MDT_PRICE';
export const SET_NEED_EXIT_BTN = 'home/SET_NEED_EXIT_BTN';
export const SET_SELECTED_USER = 'home/SET_SELECTED_USER';
export const SET_USER_ACCOUNTS = 'home/SET_USER_ACCOUNTS';
export const SET_APP_CONFIG = 'home/SET_APP_CONFIG';

// Actions
export const REQUEST_MDT_PRICE = 'home/SET_MDT_PRICE';
export const REQUEST_APP_CONFIG = 'home/REQUEST_APP_CONFIG';
export const REQUEST_USER_ACCOUNTS = 'home/REQUEST_USER_ACCOUNTS';

const state = {
  mdtPrice: 0,
  needExit: false,
  apiKey: '',
  selectedUser: {
    displayName: null,
    emailAddress: null,
    isEmailConfirmed: null,
    phoneNumber: null,
    isPhoneConfirmed: null,
    mdtBalance: null,
    isEnabled: null,
    accessToken: null,
  },
  userAccounts: [],

  // AppConfig
  appConfig: null,
};

const mutations = {
  [SET_MDT_PRICE](state, mdtPrice) {
    state.mdtPrice = mdtPrice;
  },
  [SET_NEED_EXIT_BTN](state, needExit) {
    state.needExit = needExit;
  },
  [SET_SELECTED_USER](state, selectedUser) {
    state.selectedUser = selectedUser;
  },
  [SET_USER_ACCOUNTS](state, userAccounts) {
    state.userAccounts = userAccounts;
  },
  [SET_APP_CONFIG](state, appConfig) {
    state.appConfig = appConfig;
  },
};

const actions = {
  [REQUEST_MDT_PRICE](context) {
    api.misc.getMDTUSDPrice()
      .then(
        (priceInUSD) => {
          context.commit(SET_MDT_PRICE, priceInUSD);
        },
      )
      .catch(
        (error) => {
          console.log('getMDTUSDPrice failed', error);
        },
      );
  },
  [REQUEST_APP_CONFIG](context) {
    api.misc.getAppConfig()
      .then(
        (data) => {
          context.commit(SET_APP_CONFIG, data);
        },
      )
      .catch(
        (error) => {
          console.log('getAppConfig failed', error);
        },
      );
  },
  [REQUEST_USER_ACCOUNTS](context) {
    const credentials = context.rootState.login.credentials;

    api.account.getUserAccountsData(credentials)
      .then(
        (data) => {
          if (data.length > 0) {
            const userAccountsData = [];
            data.forEach((dataItem) => {
              let tempAccessToken = null;
              credentials.forEach((credential) => {
                if (credential.email_address === dataItem.email_address) {
                  tempAccessToken = credential.access_token;
                }
              });

              const userAccountData = {
                displayName: dataItem.display_name,
                emailAddress: dataItem.email_address,
                isEmailConfirmed: dataItem.is_email_confirmed,
                phoneNumber: dataItem.phone_number,
                isPhoneConfirmed: dataItem.is_phone_confirmed,
                mdtBalance: dataItem.mdtbalance,
                isEnabled: dataItem.is_enabled,
                accessToken: tempAccessToken,
              };

              userAccountsData.push(userAccountData);
            });

            context.commit(SET_USER_ACCOUNTS, userAccountsData);
            context.commit(SET_SELECTED_USER, userAccountsData[0]);
          }
        },
      )
      .catch(
        () => {

        },
      );
  },
};


export default {
  state,
  mutations,
  actions,
};
