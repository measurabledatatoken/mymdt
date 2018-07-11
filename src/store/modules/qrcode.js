export const SET_ETHADDRESS_SCANNED = 'qrcode/SET_ETHADDRESS_SCANNED';

const state = {
  ethAddressScanned: null,
};

const mutations = {
  [SET_ETHADDRESS_SCANNED](state, ethAddressScanned) {
    state.ethAddressScanned = ethAddressScanned;
  },
};

export default {
  state,
  mutations,
};
