const state = {
  ethAddressScanned: null,
};

const getters = {
  ethAddressScanned: state => state.ethAddressScanned,
};

const mutations = {
  setEthAddressScanned(state, ethAddressScanned) {
    state.ethAddressScanned = ethAddressScanned;
  },
};

const actions = {

};


export default{
  state,
  getters,
  actions,
  mutations,
};
