import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mdtPrice: 0
  },
  mutations: {
    setMDTPrice (state, mdtPrice) {
      state.mdtPrice = mdtPrice
      console.log('setMDTPrice mutations:', mdtPrice)
    }
  },
  actions: {
    getMDTPrice (context) {
      axios.get('http://localhost:8081/api/mdtprice')
        .then(function (response) {
          if (response.data) {
            context.commit('setMDTPrice', response.data.price_usd)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})
