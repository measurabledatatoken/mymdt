import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

import home from './modules/home';
import forgetPassword from './modules/forgetpassword';
import login from './modules/login';
import transfer from './modules/transfer';
import qrcode from './modules/qrcode';
import transactions from './modules/transactions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    home,
    forgetPassword,
    login,
    transfer,
    qrcode,
    transactions,
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState()] : [],
});
