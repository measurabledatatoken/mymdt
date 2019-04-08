const RouteDef = {
  Login: { path: '/login' },
  AutoLogin: { path: '/autologin' },
  Welcome: { path: '/welcome' },
  Register: { path: '/register' },
  ForgetPassword: { path: '/forgetpassword' },
  TransactionHistory: { path: '/account/:id/transactionhistory' },
  Home: { path: '/' },
  Settings: { path: '/home/settings' },
  DataPointRewardDetail: {
    path: '/account/:userId/datapointreward/:rewardId',
    name: 'DataPointRewardDetail',
  },
  UserSettings: {
    path: '/home/usersettings/:account_id',
    name: 'UserSettings',
  },
  GoogleAuthSettingStep1: {
    path: '/home/2fa/googleauthstep1',
    name: 'GoogleAuthStep1',
  },
  GoogleAuthSettingStep2: {
    path: '/home/2fa/googleauthstep2',
    name: 'GoogleAuthStep2',
  },
  GoogleAuthSettingStep3: {
    path: '/home/2fa/googleauthstep3',
    name: 'GoogleAuthStep3',
  },
  DisableGoogleAuthVerifyPage: {
    path: '/home/2fa/disablegoogleauth',
    name: 'DisableGoogleAuth',
  },
  DisableTwoFactorAuthenticationVerifyGoogleAuthPage: {
    path: '/home/2fa/disable2faverifygoogleauth',
    name: 'DisableTwoFactorAuthenticationVerifyGoogleAuth',
  },
  TwoFactorAuthenticationSetting: {
    path: '/home/2fa/setting',
    name: 'TwoFactorAuthentication',
  },
  TwoFactorAuthenticationSMSVerify: {
    path: '/home/2fa/smsverify',
    name: 'TwoFactorAuthenticationSMSVerify',
  },
  PriceUnits: { path: '/home/settings/price-units' },
  ReportProblem: { path: '/home/settings/problems' },
  ReportProblemSuccess: { path: '/home/settings/problems/success' },
  LegalAndPrivacy: { path: '/home/settings/legal' },
  WebView: { path: '/home/webview', name: 'webview' },
  Tutorial: { path: '/home/tutorial' },
  TransferList: {
    path: '/home/accounts/:account_id/transfer',
    name: 'TransferList',
  },
  TransferEmail: { path: '/home/transfer/email' },
  TransferEthWallet: { path: '/home/transfer/ethwallet' },
  TransferReview: { path: '/home/transfer/review' },
  TransferEthWalletQrCode: { path: '/home/transfer/ethwallet/qrcode' },
  TransferSuccess: {
    path: '/home/transfer/ethwallet/review/success',
    name: 'transferSuccess',
  },
  TransferVerifyGoogleAuthPage: {
    path: '/home/transfer/transferverifygoogleauth',
    name: 'TransferVerifyGoogleAuth',
  },
  EarnMDT: { path: '/home/earn', name: 'earnMDT' },
  AccountDetail: {
    path: '/home/accounts/:account_id',
    name: 'accountDetail',
  },
  TransactionDetail: {
    path: '/home/accounts/:account_id/transactions/:transaction_id',
    name: 'transactionDetail',
  },
  PhoneNumberInput: {
    path: '/home/settings/phone/:action/add',
    name: 'PhoneNumberInput',
  },
  PhoneNumberVerify: {
    path: '/home/settings/phone/:action/verify',
    name: 'PhoneNumberVerify',
  },
  PinCodeSetup: {
    path: '/home/settings/pincode/:mode/setup',
    name: 'pinCodeSetup',
  },
  PinCodeConfirm: {
    path: '/home/settings/pincode/confirm',
    name: 'pinCodeConfirm',
  },
  PinCodeForgot: {
    path: '/home/settings/pincode/forgot',
    name: 'pinCodeForgot',
  },
};

const ExitFromWalletWebviewURL = 'mdtwallet://exit';
const accessTokenExpiredUrl = 'mdtwallet://accesstoken-expired';
// in px, please also change $header-height in scss
const HeaderHeight = 52;

const LoadingPopupDelayInMillisecond = 200;

export {
  RouteDef,
  ExitFromWalletWebviewURL,
  HeaderHeight,
  accessTokenExpiredUrl,
  LoadingPopupDelayInMillisecond,
};
