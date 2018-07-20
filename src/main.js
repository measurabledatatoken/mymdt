import '@babel/polyfill';
import 'normalize.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Vuelidate from 'vuelidate';
import mixpanel from 'mixpanel-browser';

// require styles
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App';
import router from './router';
import store from './store';
import i18n from './localization';

import fixVirtualKeyboardGlitch from './helpers/fixVirtualKeyboardGlitch';
import inobounce from './helpers/inobounce';

import { RouteDef } from '@/constants';
import { SET_IS_LOADING, OPEN_ERROR_PROMPT } from '@/store/modules/common';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuelidate);

Vue.use(VueAwesomeSwiper);

mixpanel.init('c5e652bf9ccc28d929ee1c8184a0f76b');

const app = new Vue({
  store,
  i18n,
  router,
  render: h => h(App),
});

const landingRoute = RouteDef.BetaTesting;
const originalLocation = router.resolve(window.location.href);
router.replace({
  ...originalLocation.location,
  ...landingRoute,
});

router.onReady(() => {
  app.$mount('#app');
});

router.beforeEach((to, from, next) => {
  store.commit(SET_IS_LOADING, true);
  next();
});

router.afterEach(() => {
  store.commit(SET_IS_LOADING, false);
});

router.onError(() => {
  store.commit(SET_IS_LOADING, false);
  store.dispatch(OPEN_ERROR_PROMPT, {
    message: {
      messageId: 'message.common.unknow_error',
    },
    title: {
      messageId: 'message.common.error_title',
    },
  });
});

fixVirtualKeyboardGlitch();
inobounce();
