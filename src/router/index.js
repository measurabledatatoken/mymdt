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
import UserSettings from '@/screens/setting/UserSettings';
import PriceUnits from '@/screens/setting/PriceUnits';
import ReportProblem from '@/screens/setting/ReportProblem';
import ReportProblemSuccess from '@/screens/setting/ReportProblemSuccess';
import AddPhoneNumberInputPage from '@/screens/phone/AddPhoneNumberInputPage';
import ChangePhoneNumberInputPage from '@/screens/phone/ChangePhoneNumberInputPage';
import AddPhoneNumberVerifyPage from '@/screens/phone/AddPhoneNumberVerifyPage';
import ChangePhoneNumberVerifyPage from '@/screens/phone/ChangePhoneNumberVerifyPage';
import PhoneNumberVerifyPage from '@/screens/phone/PhoneNumberVerifyPage';
import PinCodeSetup from '@/screens/pincode/PinCodeSetup';
import PinCodeConfirm from '@/screens/pincode/PinCodeConfirm';
import PinCodeForgot from '@/screens/pincode/PinCodeForgot';

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
          path: RouteDef.UserSettings.path,
          name: RouteDef.UserSettings.name,
          component: UserSettings,
          props: true,
        },
        // phone
        {
          path: RouteDef.AddPhoneNumberInput.path,
          name: RouteDef.AddPhoneNumberInput.name,
          component: AddPhoneNumberInputPage,
          props: true,
        },
        {
          path: RouteDef.ChangePhoneNumberInput.path,
          name: RouteDef.ChangePhoneNumberInput.name,
          component: ChangePhoneNumberInputPage,
          props: true,
        },
        {
          path: RouteDef.AddPhoneNumberVerify.path,
          name: RouteDef.AddPhoneNumberVerify.name,
          component: AddPhoneNumberVerifyPage,
          props: true,
        },
        {
          path: RouteDef.ChangePhoneNumberVerify.path,
          name: RouteDef.ChangePhoneNumberVerify.name,
          component: ChangePhoneNumberVerifyPage,
          props: true,
        },
        {
          path: RouteDef.PhoneNumberVerify.path,
          name: RouteDef.PhoneNumberVerify.name,
          component: PhoneNumberVerifyPage,
          props: true,
        },
        // Pin Code
        {
          path: RouteDef.PinCodeSetup.path,
          name: RouteDef.PinCodeSetup.name,
          component: PinCodeSetup,
          props: true,
        },
        {
          path: RouteDef.PinCodeConfirm.path,
          name: RouteDef.PinCodeConfirm.name,
          component: PinCodeConfirm,
          props: true,
        },
        {
          path: RouteDef.PinCodeForgot.path,
          name: RouteDef.PinCodeForgot.name,
          component: PinCodeForgot,
          props: true,
        },
        {
          path: RouteDef.PriceUnits.path,
          component: PriceUnits,
        },
        {
          path: RouteDef.ReportProblem.path,
          component: ReportProblem,
        },
        {
          path: RouteDef.ReportProblemSuccess.path,
          component: ReportProblemSuccess,
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
          path: RouteDef.TransferReview.path,
          component: TransferReview,
        },
        {
          path: RouteDef.TransferEthWalletQrCode.path,
          component: QrCodeScanPage,
        },
        {
          path: RouteDef.TransferSuccess.path,
          name: RouteDef.TransferSuccess.name,
          component: TransferSuccess,
          props: true,
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
