import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

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

import AccountDetail from '@/components/AccountDetail';

import TransferList from '@/components/transfer/TransferList';
import TransferEmail from '@/components/transfer/TransferEmail';
import TransferEthWallet from '@/components/transfer/TransferEthWallet';
import TransferReview from '@/components/transfer/TransferReview';
import TransferSuccess from '@/components/transfer/TransferSuccess';
import QrCodeScanPage from '@/components/QRCodeScanPage';

import EarnMDT from '@/components/earn/EarnMDT';

Vue.use(Router);
Vue.use(Meta);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
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
          path: RouteDef.AccountDetail,
          component: AccountDetail,
        },


        // Transfer Route
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
        {
          path: RouteDef.TransferEthWalletReview,
          component: TransferReview,
        },
        {
          path: RouteDef.TransferEthWalletQrCode,
          component: QrCodeScanPage,
        },
        {
          path: RouteDef.TransferSuccess,
          component: TransferSuccess,
        },

        // Earn MDT Route
        {
          path: RouteDef.EarnMDT,
          component: EarnMDT,
        },

        { // Route to Home page for route not defined
          path: '*', component: Home,
        },
      ],
    },
  ],
});

export default router;
