import api from '@/api';

// mutation
export const SET_PHONE_NUMBER = 'transfer/SET_PHONE_NUMBER';

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
