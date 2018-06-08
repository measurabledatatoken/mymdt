import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

import common from './modules/common';
import home from './modules/home';
import forgetPassword from './modules/forgetpassword';
import login from './modules/login';
import transfer from './modules/transfer';
import qrcode from './modules/qrcode';
import transactions from './modules/transactions';
import reportProblem from './modules/reportProblem';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    common,
    home,
    forgetPassword,
    login,
    transfer,
    qrcode,
    transactions,
    reportProblem,
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState()] : [],
});
