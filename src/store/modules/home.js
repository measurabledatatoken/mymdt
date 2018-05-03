import api from './../../api';

const state = {
  mdtPrice: 0,
  apiKey: '',
  userAccounts: [],
};

const getters = {
  mdtPrice: state => state.mdtPrice,
  userAccounts: state => state.userAccounts,
};

const mutations = {
  setMDTPrice(state, mdtPrice) {
    state.mdtPrice = mdtPrice;
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
};


export default{
  state,
  getters,
  actions,
  mutations,
};
