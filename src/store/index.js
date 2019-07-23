import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

import api from './modules/api';
import common from './modules/common';
import home from './modules/home';
import forgetPassword from './modules/forgetpassword';
import login from './modules/login';
import transfer from './modules/transfer';
import qrcode from './modules/qrcode';
import dataPoint from './modules/dataPoint';
import reportProblem from './modules/reportProblem';
import ui from './modules/ui';
import entities from './modules/entities';
import security from './modules/security';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const persistedState = createPersistedState({
  paths: ['home', 'login', 'entities', 'transfer.transferToEmailHistory'],
});
export default new Vuex.Store({
  modules: {
    ui,
    entities,
    api,
    common,
    home,
    forgetPassword,
    login,
    transfer,
    qrcode,
    reportProblem,
    security,
    dataPoint,
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState] : [persistedState],
});
