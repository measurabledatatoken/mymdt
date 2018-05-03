import api from './../../api';

const state = {
  mdtPrice: 0,
  apiKey: '',
  selectedUser: {
    userName: null,
    emailAddress: null,
    isEmailConfirmed: null,
    phoneNumber: null,
    isPhoneConfirmed: null,
    mdtBalance: null,
    isEnabled: null,
  },
  userAccounts: [],
};

const getters = {
  mdtPrice: state => state.mdtPrice,
  selectedUser: state => state.selectedUser,
  userAccounts: state => state.userAccounts,
};

const mutations = {
  setMDTPrice(state, mdtPrice) {
    state.mdtPrice = mdtPrice;
  },
  setSelectedUser(state, selectedUser) {
    state.selectedUser = selectedUser;
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
    const accessToken = context.rootState.login.selectedCredential.access_token;
    const credentials = context.rootState.login.credentials;

    api.account.getUserAccountsData(credentials, accessToken)
      .then(
        (data) => {
          if (data.length > 0) {
            const userAccountsData = [];
            data.forEach((dataItem) => {
              const userAccountData = {
                userName: dataItem.user_name,
                emailAddress: dataItem.email_address,
                isEmailConfirmed: dataItem.is_email_confirmed,
                phoneNumber: dataItem.phone_number,
                isPhoneConfirmed: dataItem.is_phone_confirmed,
                mdtBalance: dataItem.mdtbalance,
                isEnabled: dataItem.is_enabled,
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
