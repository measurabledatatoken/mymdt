import api from '@/api';
// Mutations
export const SET_MDT_PRICE = 'home/SET_MDT_PRICE';
export const SET_NEED_EXIT_BTN = 'home/SET_NEED_EXIT_BTN';
export const SET_SELECTED_USER = 'home/SET_SELECTED_USER';
export const SET_USER_ACCOUNTS = 'home/SET_USER_ACCOUNTS';
export const SET_APP_CONFIG = 'home/SET_APP_CONFIG';
export const SET_PRICE_UNIT = 'home/SET_PRICE_UNIT';
export const SET_IS_USER_ACCOUNTS_DIRTY = 'home/SET_IS_USER_ACCOUNTS_DIRTY';

// Actions
export const REQUEST_MDT_PRICE = 'home/SET_MDT_PRICE';
export const REQUEST_APP_CONFIG = 'home/REQUEST_APP_CONFIG';
export const REQUEST_USER_ACCOUNTS = 'home/REQUEST_USER_ACCOUNTS';

const state = {
  mdtPrice: 0,
  needExit: false,
  appID: '',
  selectedUser: {
    displayName: null,
    emailAddress: null,
    avatarURL: null,
    isEmailConfirmed: null,
    phoneNumber: null,
    isPhoneConfirmed: null,
    isAccountConfirmed: null,
    isTwofaEnabled: null,
    ethWalletAddress: null,
    mdtBalance: null,
    isWalletEnabled: null,
    accessToken: null,
  },
  userAccounts: [],
  isUserAccountsDirty: false,
  priceUnit: 'USD',

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
  [SET_IS_USER_ACCOUNTS_DIRTY](state, isUserAccountsDirty) {
    state.isUserAccountsDirty = isUserAccountsDirty;
  },
  [SET_APP_CONFIG](state, appConfig) {
    state.appConfig = appConfig;
  },
  [SET_PRICE_UNIT](state, priceUnit) {
    state.priceUnit = priceUnit;
  },
};

const actions = {
  [REQUEST_MDT_PRICE](context) {
    api.misc.getMDTUSDPrice()
      .then(
        (data) => {
          context.commit(SET_MDT_PRICE, data.price_usd);
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
                avatarURL: dataItem.avatar_url,
                isEmailConfirmed: dataItem.is_email_confirmed,
                phoneNumber: dataItem.phone_number,
                isPhoneConfirmed: dataItem.is_phone_confirmed,
                isAccountConfirmed: dataItem.is_account_enabled,
                isTwofaEnabled: dataItem.is_twofa_enabled,
                ethWalletAddress: dataItem.eth_wallet_address,
                mdtBalance: dataItem.mdtbalance,
                isWalletEnabled: dataItem.is_wallet_enabled,
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
        (err) => {
          console.log(`Error in REQUEST_USER_ACCOUNTS${err}`);
        },
      );
  },
};


export default {
  state,
  mutations,
  actions,
};
