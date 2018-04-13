import api from './../../api';

const state = {
  mdtPrice: 0,
};

const getters = {
  mdtPrice: state => state.mdtPrice,
};

const mutations = {
  setMDTPrice(state, mdtPrice) {
    state.mdtPrice = mdtPrice;
  },
};

const actions = {
  getMDTPrice(context) {
    api.getMDTUSDPrice(
      priceInUSD => context.commit('setMDTPrice', priceInUSD),
    );
  },
};


export default{
  state,
  getters,
  actions,
  mutations,
};
