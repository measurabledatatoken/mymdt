import api from '@/api';

// mutation
export const SET_PHONE_NUMBER = 'security/SET_PHONE_NUMBER';
export const SET_SELECTED_USER = 'security/SET_SELECTED_USER';

// action
export const VALIDATE_TRANSFER_PIN = 'security/VALIDATE_TRANSFER_PIN';
export const SETUP_PIN = 'security/SETUP_PIN';
export const CHANGE_PIN = 'security/CHANGE_PIN';

const state = {
  phoneNumber: null,
  pin: null,
  selectedUserId: null,
};

const getters = {
  // eslint-disable-next-line
  getSelectedSecurityUser: (state, getters, rootState, rootGetters) => rootGetters.getUser(state.selectedUserId),
};

const mutations = {
  [SET_PHONE_NUMBER](state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  [SET_SELECTED_USER](state, userId) {
    state.selectedUserId = userId;
  },
};

const actions = {
  [VALIDATE_TRANSFER_PIN](context, pin) {
    const transferFromAccount = this.state.transfer.transferFromAccount;

    return api.security.validatePIN(pin, transferFromAccount.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [SETUP_PIN]({ commit, rootState, rootGetters }, { pin, confirmedPIN }) {
    const account = rootGetters.getUser(this.state.security.selectedUserId);

    return api.security.setupPIN(pin, confirmedPIN, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  // eslint-disable-next-line
  [CHANGE_PIN]({ commit, rootState, rootGetters }, { oldPIN, newPIN, confirmedPIN }) {
    const account = rootGetters.getUser(this.state.security.selectedUserId);

    return api.security.changePIN(oldPIN, newPIN, confirmedPIN, account.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
};


export default{
  state,
  getters,
  mutations,
  actions,
};
