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

  UnknownError: 99999,
};

const TransferType = {
  Email: 0,
  EthWallet: 1,
};

const RouteDef = {
  Login: '/login',
  AutoLogin: '/autologin',
  Register: '/register',
  ForgetPassword: '/forgetpassword',
  TransactionHistory: '/account/:id/transactionhistory',

  Home: '/',
  Settings: '/home/settings',
  Tutorial: '/home/tutorial',

  TransferList: '/home/transfer',
  TransferEmail: '/home/transfer/email',
  TransferEthWallet: '/home/transfer/ethwallet',
  TransferEthWalletReview: '/home/transfer/ethwallet/review',
  TransferEmailReview: '/home/transfer/ethwallet/review',
  TransferEthWalletQrCode: '/home/transfer/ethwallet/qrcode',

  EarnMDT: '/home/earn',
  AccountDetail: '/home/accountdetail',
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
