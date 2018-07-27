const errorCode = {
  UnknownError: 100,
  MissingParameters: 101,
  InvalidParameterValue: 102,
  InvalidJSONBody: 103,
  UnAuthorizedAccess: 104,
  InvalidExpiryTime: 105,
  APINotFound: 106,
  ApplicationNotFound: 107,
  ApplicationInsufficientFund: 108,
  ApplicationDisabled: 109,
  ValidationEndpointNotSet: 110,
  ValidationEndpointInvalid: 111,
  UserAlreadyExist: 112,
  UserNotExist: 113,
  UserPasswordNotSet: 114,
  UserEmailAddressNotConfirmed: 115,
  UserCredentialInvalid: 116,
  UserDisabled: 117,
  LocaleInvalid: 118,
  EmailConfirmCodeExpired: 119,
  EmailConfirmCodeInvalid: 120,
  EmailConfirmCodeUserNotFound: 121,
  EmailConfirmCodeAlreadyConfirmed: 122,
  ConfirmedPasswordNotMatch: 123,
  PasswordResetCodeExpired: 124,
  PasswordResetCodeInvalid: 125,
  AutoLoginValidationFailed: 126,
  APIKeyNotFound: 127,
  TaskNotFound: 128,
  TaskExpired: 129,
  TaskAlreadyFinished: 130,
  RedeemableItemNotFound: 131,
  RedeemableItemExpired: 132,
  RedeemLimitReached: 133,
  RewardNotFound: 134,
  RewardExpired: 135,
  RewardAlreadyClaimed: 136,
  ProblemNotFound: 137,
  InvalidEmailAddress: 138,
  InvalidEthAddress: 139,
  InsufficientFund: 140,
  ContentTooLong: 141,
  PasscodeAlreadySet: 142,
  PasscodeNotSet: 143,
  NewPasscodeSameAsOld: 144,
  ConfirmedPasscodeNotMatch: 145,
  InvalidPasscode: 146,
  InvalidPhoneNumberFormat: 147,
  InvalidActionType: 148,
  PhoneNumberNotSet: 149,
  PhoneNumberAlreadySet: 150,
  SMSRequestTooFrequent: 151,
  SMSDailyLimitReached: 152,
  OTPInvalid: 153,
  OTPExpired: 154,
  TransactionNotFound: 155,
  TransactionNotCancelable: 156,
  GoogleAuthAlreadyEnabled: 157,
  GoogleAuthNotEnabled: 158,
  GoogleAuthSecretNotGenerated: 159,
  GoogleAuthTokenInvalid: 160,
  DeviceIsAlreadyRegistered: 161,
  AccessCodeIsNotValid: 162,
  AccessCodeIsUsed: 163,
  TwofaNotAvailable: 164,
  TwofaNotEnabled: 165,
  TwofaMethodNotAvailable: 166,
};

errorCode.properties = {
  [errorCode.UserNotExist]: {
    messageId: 'message.error.userNotExist',
  },
  [errorCode.RewardExpired]: {
    messageId: 'message.error.rewardExpired',
  },
  [errorCode.RewardAlreadyClaimed]: {
    messageId: 'message.error.rewardAlreadyClaimed',
  },
  [errorCode.InvalidEmailAddress]: {
    messageId: 'message.error.invalid_email',
  },
  [errorCode.InvalidEthAddress]: {
    messageId: 'message.error.invalid_ethaddress',
  },
  [errorCode.InsufficientFund]: {
    messageId: 'message.error.insufficient_fund',
  },
  [errorCode.PasscodeAlreadySet]: {
    messageId: 'message.error.passcodeAlreadySet',
  },
  [errorCode.PasscodeNotSet]: {
    messageId: 'message.error.passcodeNotSet',
  },
  [errorCode.NewPasscodeSameAsOld]: {
    messageId: 'message.error.newPasscodeSameAsOld',
  },
  [errorCode.ConfirmedPasscodeNotMatch]: {
    messageId: 'message.error.confirmedPasscodeNotMatch',
  },
  [errorCode.InvalidPasscode]: {
    messageId: 'message.error.invalidPasscode',
  },
  [errorCode.InvalidPhoneNumberFormat]: {
    messageId: 'message.error.invalidPhoneNumberFormat',
  },
  [errorCode.PhoneNumberNotSet]: {
    messageId: 'message.error.phoneNumberNotSet',
  },
  [errorCode.SMSRequestTooFrequent]: {
    messageId: 'message.error.phoneNumberAlreadySet',
  },
  [errorCode.SMSRequestTooFrequent]: {
    messageId: 'message.error.smsRequestTooFrequent',
  },
  [errorCode.SMSDailyLimitReached]: {
    messageId: 'message.error.smsDailyLimitReached',
  },
  [errorCode.OTPInvalid]: {
    messageId: 'message.error.otpInvalid',
  },
  [errorCode.OTPExpired]: {
    messageId: 'message.error.otpExpired',
  },
  [errorCode.DeviceIsAlreadyRegistered]: {
    messageId: 'message.error.deviceIsAlreadyRegistered',
  },
  [errorCode.AccessCodeIsNotValid]: {
    messageId: 'message.error.accessCodeIsNotValid',
  },
  [errorCode.AccessCodeIsUsed]: {
    messageId: 'message.error.accessCodeIsUsed',
  },
  [errorCode.GoogleAuthTokenInvalid]: {
    messageId: 'message.error.googleAuthTokenInvalid',
  },
};

export default errorCode;
