import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import DataPointRewards from '@/screens/dapp/DataPointRewards';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dapp/data-point-rewards',
      component: DataPointRewards,
    },
  ],
});

export default router;
