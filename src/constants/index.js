const TransferType = {
  Email: 0,
  EthWallet: 1,
};

const RouteDef = {
  Login: { path: '/login' },
  AutoLogin: { path: '/autologin' },
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
  Tutorial: { path: '/home/tutorial' },
  TransferList: { path: '/home/transfer' },
  TransferEmail: { path: '/home/transfer/email' },
  TransferEthWallet: { path: '/home/transfer/ethwallet' },
  TransferEthWalletReview: { path: '/home/transfer/ethwallet/review' },
  TransferEmailReview: { path: '/home/transfer/ethwallet/review' },
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
  PhoneNumberAdd: {
    path: '/home/settings/phone/add',
    name: 'phoneNumberAdd',
  },
  PhoneNumberVerify: {
    path: '/home/settings/phone/add/verify',
    name: 'phoneNumberVerify',
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

export {
  TransferType,
  RouteDef,
  ExitFromWalletWebviewURL,
  HeaderHeight,
};
