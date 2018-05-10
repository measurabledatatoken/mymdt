import api from './../../api';

const state = {
  mdtPrice: 0,
  navigationTitle: '',
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
};

const getters = {
  mdtPrice: state => state.mdtPrice,
  navigationTitle: state => state.navigationTitle,
  selectedUser: state => state.selectedUser,
  userAccounts: state => state.userAccounts,
};

const mutations = {
  setMDTPrice(state, mdtPrice) {
    state.mdtPrice = mdtPrice;
  },
  setNavigationTitle(state, navigationTitle) {
    state.navigationTitle = navigationTitle;
  },
  setSelectedUser(state, selectedUser) {
    state.selectedUser = selectedUser;
  },
  setSelectedUserAccountForEmail(state, emailAddress) {
    state.userAccounts.forEach((userAccount) => {
      if (userAccount.email_address === emailAddress) {
        this.commit('setSelectedUser', userAccount);
      }
    });
  },
  setUserAccounts(state, userAccounts) {
    state.userAccounts = userAccounts;
  },
};

const actions = {
  getMDTPrice(context) {
    api.misc.getMDTUSDPrice()
      .then(
        (priceInUSD) => {
          context.commit('setMDTPrice', priceInUSD);
        },
      )
      .catch(
        (error) => {
          console.log('getMDTUSDPrice failed', error);
        },
      );
  },
  getUserAccounts(context) {
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

            context.commit('setUserAccounts', userAccountsData);
            context.commit('setSelectedUser', userAccountsData[0]);
          }
        },
      )
      .catch(
        () => {
          context.commit('setUserAccounts', []);
          context.commit('setSelectedUser', null);
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
