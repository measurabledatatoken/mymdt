import '@babel/polyfill';
import 'normalize.css';

import Vue from 'vue';
// import {
//   MdMenu,
//   MdButton,
//   MdDialog,
//   MdDialogAlert,
//   MdDialogConfirm,
//   MdIcon,
//   MdField,
//   MdDivider,
//   MdAvatar,
//   MdCard,
//   MdList,
//   MdSubheader,
// } from 'vue-material/dist/components';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '@/styles/vue-material.scss';
import Vuelidate from 'vuelidate';
import mixpanel from 'mixpanel-browser';

// require styles
// eslint-disable-next-line
import 'swiper/dist/css/swiper.css';
import VueClipboard from 'vue-clipboard2';
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
// Vue.use(MdMenu);
// Vue.use(MdButton);
// Vue.use(MdDialog);
// Vue.use(MdDialogAlert);
// Vue.use(MdDialogConfirm);
// Vue.use(MdIcon);
// Vue.use(MdField);
// Vue.use(MdDivider);
// Vue.use(MdAvatar);
// Vue.use(MdCard);
// Vue.use(MdList);
// Vue.use(MdSubheader);

Vue.use(Vuelidate);
Vue.use(VueClipboard);

mixpanel.init('c5e652bf9ccc28d929ee1c8184a0f76b');

const app = new Vue({
  store,
  i18n,
  router,
  render: h => h(App),
});

const landingRoute = RouteDef.Welcome;
const originalLocation = router.resolve(window.location.href);
router.replace({
  ...originalLocation.location,
  ...landingRoute,
});

router.onReady(() => {
  app.$mount('#app');
});

let loadingTimeoutId = null;
router.beforeEach((to, from, next) => {
  if (!loadingTimeoutId) {
    loadingTimeoutId = setTimeout(
      () => store.commit(SET_IS_LOADING, true),
      200,
    );
  }
  next();
});

router.afterEach(() => {
  if (loadingTimeoutId) {
    clearTimeout(loadingTimeoutId);
    loadingTimeoutId = null;
  }
  store.commit(SET_IS_LOADING, false);
});

router.onError(() => {
  if (loadingTimeoutId) {
    clearTimeout(loadingTimeoutId);
    loadingTimeoutId = null;
  }
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
