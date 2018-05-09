import Vue from 'vue';
import Router from 'vue-router';

import { RouteDef } from '@/constants';

import AppLayout from '@/container/AppLayout';

import Home from '@/components/Home';
import Login from '@/components/Login';
import AutoLogin from '@/components/AutoLogin';
import Register from '@/components/Register';
import ForgetPassword from '@/components/ForgetPassword';
import Settings from '@/components/Settings';
import TransactionHistory from '@/components/TransactionHistory';
import Tutorial from '@/components/Tutorial';

import TransferList from '@/components/transfer/TransferList';
import TransferEmail from '@/components/transfer/TransferEmail';
import TransferEthWallet from '@/components/transfer/TransferEthWallet';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'layout',
      component: AppLayout,
      children: [
        {
          path: RouteDef.Home,
          component: Home,
        },
        {
          path: RouteDef.Login,
          component: Login,
        },
        {
          path: RouteDef.AutoLogin,
          component: AutoLogin,
        },
        {
          path: RouteDef.Register,
          component: Register,
        },
        {
          path: RouteDef.ForgetPassword,
          component: ForgetPassword,
        },
        {
          path: RouteDef.Settings,
          component: Settings,
        },
        {
          path: RouteDef.Tutorial,
          component: Tutorial,
        },
        {
          path: RouteDef.TransactionHistory,
          component: TransactionHistory,
        },
        {
          path: RouteDef.TransferList,
          component: TransferList,
        },
        {
          path: RouteDef.TransferEmail,
          component: TransferEmail,
        },
        {
          path: RouteDef.TransferEthWallet,
          component: TransferEthWallet,
        },
        { // Route to Home page for route not defined
          path: '*', component: Home,
        },
      ],
    },
  ],
});
