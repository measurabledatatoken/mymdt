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


const RouteDef = {
  Home: '',
  Login: 'login',
  AutoLogin: 'autologin',
  Register: 'register',
  ForgetPassword: 'forgetpasswordfo',
  TransactionHistory: 'account/:id/transactionhistory',
  Settings: 'home/settings',
  Tutorial: 'home/tutorial',
};


const ReturnFromWalletURL = 'mdtwallet://back';

export {
  ErrorCode,
  RouteDef,
  ReturnFromWalletURL,
};
