import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import { RouteDef } from '@/constants';

import AppLayout from '@/container/AppLayout';

const Home = () => import('@/screens/Home');
const Welcome = () => import('@/screens/WelcomePage');
const Login = () => import('@/screens/Login');
const Register = () => import('@/screens/Register');
const ForgetPassword = () => import('@/screens/ForgetPassword');
const Settings = () => import('@/screens/setting/Settings');
const UserSettings = () => import('@/screens/setting/UserSettings');
const PriceUnits = () => import('@/screens/setting/PriceUnits');
const DataPointRewards = () => import('@/screens/DataPointRewards');
const DataPointRewardDetail = () => import('@/screens/reward/DataPointDetail');
const ReportProblem = () =>
  import(/* webpackChunkName: "report-problem" */ '@/screens/setting/ReportProblem');
const ReportProblemSuccess = () =>
  import(/* webpackChunkName: "report-problem" */ '@/screens/setting/ReportProblemSuccess');
const LegalAndPrivacy = () => import('@/screens/setting/LegalAndPrivacy');
const PhoneNumberInputPage = () =>
  import(/* webpackChunkName: "phone-number" */ '@/screens/phone/PhoneNumberInputPage');
const PhoneNumberVerifyPage = () =>
  import(/* webpackChunkName: "phone-number" */ '@/screens/phone/PhoneNumberVerifyPage');
const PinCodeSetup = () =>
  import(/* webpackChunkName: "pin-code" */ '@/screens/pincode/PinCodeSetup');
const PinCodeConfirm = () =>
  import(/* webpackChunkName: "pin-code" */ '@/screens/pincode/PinCodeConfirm');
const PinCodeForgot = () =>
  import(/* webpackChunkName: "pin-code" */ '@/screens/pincode/PinCodeForgot');
const Tutorial = () => import('@/screens/Tutorial');
const AccountDetail = () =>
  import(/* webpackChunkName: "account-detail" */ '@/screens/AccountDetail');
const TransactionDetail = () =>
  import(/* webpackChunkName: "account-detail" */ '@/screens/TransactionDetail');
const TransferList = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/transfer/TransferList');
const TransferEmail = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/transfer/TransferEmail');
const TransferEthWallet = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/transfer/TransferEthWallet');
const TransferReview = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/transfer/TransferReview');
const TransferSuccess = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/transfer/TransferSuccess');
const QrCodeScanPage = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/QRCodeScanPage');
const TransferVerifyGoogleAuthPage = () =>
  import(/* webpackChunkName: "transfer" */ '@/screens/googleAuth/TransferVerifyGoogleAuthPage');
const EarnMDT = () => import('@/screens/EarnMDT');
const FollowSocialMedia = () => import('@/screens/earnMDT/FollowSocialMedia');
const WebView = () => import('@/screens/WebView');
const TwoFactorAuthenticationSettingPage = () =>
  import(/* webpackChunkName: "2fa" */ '@/screens/setting/TwoFactorAuthenticationSettingPage');
const DisableTwoFactorAuthenticationVerifyGoogleAuthPage = () =>
  import(/* webpackChunkName: "2fa" */ '@/screens/googleAuth/DisableTwoFactorAuthenticationVerifyGoogleAuthPage');
const GoogleAuthSettingStep1 = () =>
  import(/* webpackChunkName: "google-auth" */ '@/screens/googleAuth/GoogleAuthSettingStep1');
const GoogleAuthSettingStep2 = () =>
  import(/* webpackChunkName: "google-auth" */ '@/screens/googleAuth/GoogleAuthSettingStep2');
const GoogleAuthSettingStep3 = () =>
  import(/* webpackChunkName: "google-auth" */ '@/screens/googleAuth/GoogleAuthSettingStep3');
const DisableGoogleAuthVerifyPage = () =>
  import(/* webpackChunkName: "google-auth" */ '@/screens/googleAuth/DisableGoogleAuthVerifyPage');
const ETHBinding = () =>
  import(/* webpackChunkName: "ETH binding" */ '@/screens/setting/ETHBinding');
/**
 *  example code to fail async loading of route
 * 
const Component = () => {
  throw new Error('load route failed');
};
*/

import SimpleHeader from '@/components/header/SimpleHeader';

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
          path: RouteDef.Welcome.path,
          components: {
            default: Welcome,
            header: SimpleHeader,
          },
          meta: {
            setFixHeight: false,
          },
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
          path: RouteDef.DataPointRewards.path,
          name: RouteDef.DataPointRewards.name,
          component: DataPointRewards,
        },
        {
          path: RouteDef.DataPointRewardDetail.path,
          name: RouteDef.DataPointRewardDetail.name,
          component: DataPointRewardDetail,
          props: true,
        },
        {
          path: RouteDef.UserSettings.path,
          name: RouteDef.UserSettings.name,
          component: UserSettings,
          props: true,
        },
        // phone
        {
          path: RouteDef.PhoneNumberInput.path,
          name: RouteDef.PhoneNumberInput.name,
          component: PhoneNumberInputPage,
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
          path: RouteDef.LegalAndPrivacy.path,
          component: LegalAndPrivacy,
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
          name: RouteDef.TransferList.name,
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
        {
          path: RouteDef.TransferVerifyGoogleAuthPage.path,
          name: RouteDef.TransferVerifyGoogleAuthPage.name,
          component: TransferVerifyGoogleAuthPage,
          props: true,
        },
        // Earn MDT Route
        {
          path: RouteDef.EarnMDT.path,
          name: RouteDef.EarnMDT.name,
          component: EarnMDT,
        },
        {
          path: RouteDef.FollowSocialMedia.path,
          name: RouteDef.FollowSocialMedia.name,
          component: FollowSocialMedia,
        },

        {
          path: RouteDef.WebView.path,
          name: RouteDef.WebView.name,
          component: WebView,
        },

        // Google Authenticator Setting Page Route
        {
          path: RouteDef.GoogleAuthSettingStep1.path,
          name: RouteDef.GoogleAuthSettingStep1.name,
          component: GoogleAuthSettingStep1,
        },
        {
          path: RouteDef.GoogleAuthSettingStep2.path,
          name: RouteDef.GoogleAuthSettingStep2.name,
          component: GoogleAuthSettingStep2,
        },
        {
          path: RouteDef.GoogleAuthSettingStep3.path,
          name: RouteDef.GoogleAuthSettingStep3.name,
          component: GoogleAuthSettingStep3,
        },
        {
          path: RouteDef.DisableGoogleAuthVerifyPage.path,
          name: RouteDef.DisableGoogleAuthVerifyPage.name,
          component: DisableGoogleAuthVerifyPage,
        },
        // Two Factor Setting Page Route
        {
          path: RouteDef.TwoFactorAuthenticationSetting.path,
          name: RouteDef.TwoFactorAuthenticationSetting.name,
          component: TwoFactorAuthenticationSettingPage,
          props: true,
        },
        {
          path:
            RouteDef.DisableTwoFactorAuthenticationVerifyGoogleAuthPage.path,
          name:
            RouteDef.DisableTwoFactorAuthenticationVerifyGoogleAuthPage.name,
          component: DisableTwoFactorAuthenticationVerifyGoogleAuthPage,
        },
        {
          path: RouteDef.ETHBinding.path,
          name: RouteDef.ETHBinding.name,
          component: ETHBinding,
        },
        // Route to Home page for route not defined
        {
          path: '*',
          redirect: RouteDef.Home,
        },
      ],
    },
  ],
});

export default router;
