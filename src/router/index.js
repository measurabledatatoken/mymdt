import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import { RouteDef } from '@/constants';

import AppLayout from '@/container/AppLayout';

import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Register from '@/screens/Register';
import ForgetPassword from '@/screens/ForgetPassword';
import Settings from '@/screens/Settings';
import Tutorial from '@/screens/Tutorial';

import AccountDetail from '@/screens/AccountDetail';
import TransactionDetail from '@/screens/TransactionDetail';

import TransferList from '@/screens/transfer/TransferList';
import TransferEmail from '@/screens/transfer/TransferEmail';
import TransferEthWallet from '@/screens/transfer/TransferEthWallet';
import TransferReview from '@/screens/transfer/TransferReview';
import TransferSuccess from '@/screens/transfer/TransferSuccess';
import QrCodeScanPage from '@/screens/QRCodeScanPage';

import EarnMDT from '@/screens/EarnMDT';

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
          redirect: RouteDef.Home,
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
          path: RouteDef.AccountDetail,
          name: 'accountDetail',
          component: AccountDetail,
        },
        {
          path: RouteDef.TransactionDetail,
          name: 'transactionDetail',
          component: TransactionDetail,
          props: true,
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
