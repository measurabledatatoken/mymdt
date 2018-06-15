import api from '@/api';

// mutation
export const SET_PHONE_NUMBER = 'security/SET_PHONE_NUMBER';
export const SET_SELECTED_USER = 'security/SET_SELECTED_USER';

// action
export const VALIDATE_PIN = 'security/VALIDATE_PIN';
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
  [VALIDATE_PIN](context, pin) {
    const transferFromAccount = this.state.transfer.transferFromAccount;

    return api.security.validatePIN(pin, transferFromAccount.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  [SETUP_PIN](context, { pin, confirmedPIN }) {
    const transferFromAccount = this.state.transfer.transferFromAccount;

    return api.security.setupPIN(pin, confirmedPIN, transferFromAccount.accessToken)
      .then(() => '')
      .catch(
        (error) => {
          throw (error);
        },
      );
  },
  [CHANGE_PIN](context, { oldPIN, newPIN, confirmedPIN }) {
    const transferFromAccount = this.state.transfer.transferFromAccount;

    return api.security.changePIN(oldPIN, newPIN, confirmedPIN, transferFromAccount.accessToken)
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
