
import axios from 'axios';

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
    axios.get('http://localhost:8080/api/mdtprice')
      .then((response) => {
        if (response.data) {
          context.commit('setMDTPrice', response.data.price_usd);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};


export default{
  state,
  getters,
  actions,
  mutations,
};
