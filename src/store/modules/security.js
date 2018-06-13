import api from '@/api';

// mutation
export const SET_PHONE_NUMBER = 'transfer/SET_PHONE_NUMBER';
export const SET_PIN = 'transfer/SET_PIN';

// action
export const VALIDATE_PIN = 'transfer/VALIDATE_PIN';

const state = {
  phoneNumber: null,
  pin: null,
};

const mutations = {
  [SET_PHONE_NUMBER](state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  [SET_PIN](state, pin) {
    state.pin = pin;
  },
};

const actions = {
  [VALIDATE_PIN](context, pin) {
    return api.security.validatePIN(pin)
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
  mutations,
  actions,
};
