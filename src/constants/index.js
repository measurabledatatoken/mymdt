const ErrorCode = {
  // Application related
  NoApplicationFound: 0,
  NoEndpointForApplication: 1,

  IncorrectJsonFormat: 2,

  // Account Related
  UserAlreadyExist: 3,
  UserNotExist: 4,
  UserPasswordNotExist: 5,
  UserEmailAddressNotConfirmed: 6,
  UserCredentailWrong: 7,
  UserDisabled: 8,

  EmailConfirmCodeExpired: 9,
  EmailConfirmCodeInvalid: 10,
  EmailConfirmCodeUserNotFound: 11,
  EmailConfirmCodeAlreadyConfirmed: 12,

  ConfirmedPasswordNotTheSame: 13,
  PasswordResetCodeExpired: 14,
  PasswordResetCodeInvalid: 15,

  GetAutoLoginTokenValidateFailedError: 16,

  EmailAlreadyConfirmed: 17,
  EmailConfirmedRequestTooFrequent: 18,

  // Transfer Related
  InvalidEmail: 19,
  InvalidEthAddress: 20,
  InsufficientFund: 21,

  UnknownError: 99999,
};

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
  PriceUnits: { path: '/home/settings/price-units' },
  Tutorial: { path: '/home/tutorial' },
  TransferList: { path: '/home/transfer' },
  TransferEmail: { path: '/home/transfer/email' },
  TransferEthWallet: { path: '/home/transfer/ethwallet' },
  TransferEthWalletReview: { path: '/home/transfer/ethwallet/review' },
  TransferEmailReview: { path: '/home/transfer/ethwallet/review' },
  TransferEthWalletQrCode: { path: '/home/transfer/ethwallet/qrcode' },
  TransferSuccess: { path: '/home/transfer/ethwallet/review/success' },
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
  },
  PhoneNumberVerify: {
    path: '/home/settings/phone/add/verify',
  },
};


const ExitFromWalletWebviewURL = 'mdtwallet://exit';

// in px, please also change $header-height in scss
const HeaderHeight = 52;

export {
  ErrorCode,
  TransferType,
  RouteDef,
  ExitFromWalletWebviewURL,
  HeaderHeight,
};
