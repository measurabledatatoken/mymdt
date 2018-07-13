const RouteDef = {
  Login: { path: '/login' },
  AutoLogin: { path: '/autologin' },
  BetaTesting: { path: '/beta' },
  Register: { path: '/register' },
  ForgetPassword: { path: '/forgetpassword' },
  TransactionHistory: { path: '/account/:id/transactionhistory' },
  Home: { path: '/' },
  Settings: { path: '/home/settings' },
  UserSettings: {
    path: '/home/usersettings',
    name: 'UserSettings',
  },
  PriceUnits: { path: '/home/settings/price-units' },
  ReportProblem: { path: '/home/settings/problems' },
  ReportProblemSuccess: { path: '/home/settings/problems/success' },
  LegalAndPrivacy: { path: '/home/settings/legal' },
  WebView: { path: '/home/webview', name: 'webview' },
  Tutorial: { path: '/home/tutorial' },
  TransferList: { path: '/home/transfer' },
  TransferEmail: { path: '/home/transfer/email' },
  TransferEthWallet: { path: '/home/transfer/ethwallet' },
  TransferReview: { path: '/home/transfer/review' },
  TransferEthWalletQrCode: { path: '/home/transfer/ethwallet/qrcode' },
  TransferSuccess: {
    path: '/home/transfer/ethwallet/review/success',
    name: 'transferSuccess',
  },
  EarnMDT: { path: '/home/earn' },
  AccountDetail: {
    path: '/home/accounts/:account_id',
    name: 'accountDetail',
  },
  TransactionDetail: {
    path: '/home/accounts/:account_id/transactions/:transaction_id',
    name: 'transactionDetail',
  },
  AddPhoneNumberInput: {
    path: '/home/settings/phone/add',
    name: 'AddPhoneNumberInput',
  },
  ChangePhoneNumberInput: {
    path: '/home/settings/phone/change',
    name: 'ChangePhoneNumberInput',
  },
  PhoneNumberVerify: {
    path: '/home/settings/phone/verify',
    name: 'PhoneNumberVerify',
  },
  AddPhoneNumberVerify: {
    path: '/home/settings/phone/add/verify',
    name: 'AddPhoneNumberVerify',
  },
  ChangePhoneNumberVerify: {
    path: '/home/settings/phone/change/verify',
    name: 'ChangePhoneNumberVerify',
  },
  PinCodeSetup: {
    path: '/home/settings/pincode/setup',
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

// in px, please also change $header-height in scss
const HeaderHeight = 52;

export { RouteDef, ExitFromWalletWebviewURL, HeaderHeight };
