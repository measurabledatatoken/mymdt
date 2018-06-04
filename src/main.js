// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';

import store from './store';
import i18n from './localization';

const unsync = sync(store, router);

Vue.config.productionTip = false;
Vue.use(VueMaterial);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  components: { App },
  template: '<App/>',
});

unsync();
