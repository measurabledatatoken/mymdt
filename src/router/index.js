import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import { RouteDef } from '@/constants';

import AppLayout from '@/container/AppLayout';

import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Register from '@/screens/Register';
import ForgetPassword from '@/screens/ForgetPassword';
import Settings from '@/screens/setting/Settings';
import PriceUnits from '@/screens/setting/PriceUnits';
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
          path: RouteDef.Home.path,
          component: Home,
        },
        {
          path: RouteDef.Login.path,
          component: Login,
        },
        {
          path: RouteDef.AutoLogin.path,
          redirect: RouteDef.Home,
        },
        {
          path: RouteDef.Register.path,
          component: Register,
        },
        {
          path: RouteDef.ForgetPassword.path,
          component: ForgetPassword,
        },
        {
          path: RouteDef.Settings.path,
          component: Settings,
        },
        {
          path: RouteDef.PriceUnits.path,
          component: PriceUnits,
        },
        {
          path: RouteDef.Tutorial.path,
          component: Tutorial,
        },
        {
          path: RouteDef.AccountDetail.path,
          name: RouteDef.AccountDetail.name,
          component: AccountDetail,
        },
        {
          path: RouteDef.TransactionDetail.path,
          name: RouteDef.TransactionDetail.name,
          component: TransactionDetail,
          props: true,
        },

        // Transfer Route
        {
          path: RouteDef.TransferList.path,
          component: TransferList,
        },
        {
          path: RouteDef.TransferEmail.path,
          component: TransferEmail,
        },
        {
          path: RouteDef.TransferEthWallet.path,
          component: TransferEthWallet,
        },
        {
          path: RouteDef.TransferEthWalletReview.path,
          component: TransferReview,
        },
        {
          path: RouteDef.TransferEthWalletQrCode.path,
          component: QrCodeScanPage,
        },
        {
          path: RouteDef.TransferSuccess.path,
          component: TransferSuccess,
        },

        // Earn MDT Route
        {
          path: RouteDef.EarnMDT.path,
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
