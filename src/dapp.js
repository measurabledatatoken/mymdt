import '@babel/polyfill';
import 'normalize.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '@/styles/vue-material.scss';
import mixpanel from 'mixpanel-browser';

import App from './App';
import router from './router/dapp';
import i18n from './localization';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

mixpanel.init('c5e652bf9ccc28d929ee1c8184a0f76b');

const app = new Vue({
  i18n,
  router,
  render: h => h(App),
});

router.onReady(() => {
  app.$mount('#app');
  if (window.Cypress) {
    window.app = app;
  }
});
