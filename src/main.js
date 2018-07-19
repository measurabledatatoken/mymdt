import '@babel/polyfill';
import 'normalize.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Vuelidate from 'vuelidate';
import mixpanel from 'mixpanel-browser';

// require styles
// eslint-disable-next-line
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App';
import router from './router';

import store from './store';
import i18n from './localization';

import fixVirtualKeyboardGlitch from './helpers/fixVirtualKeyboardGlitch';
import inobounce from './helpers/inobounce';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuelidate);

Vue.use(VueAwesomeSwiper);

mixpanel.init('c5e652bf9ccc28d929ee1c8184a0f76b');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  components: { App },
  template: '<App/>',
});

fixVirtualKeyboardGlitch();
inobounce();
