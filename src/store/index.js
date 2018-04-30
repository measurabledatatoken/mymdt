import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import home from './modules/home';
import forgetPassword from './modules/forgetpassword';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    home,
    forgetPassword,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
