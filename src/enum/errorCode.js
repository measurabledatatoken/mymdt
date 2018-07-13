const errorCode = {
  UnknownError: 100,
  MissingParameters: 101,
  InvalidParameterValue: 102,
  InvalidJSONBody: 103,
  UnAuthorizedAccess: 104,
  InvalidExpiryTime: 105,
  ApplicationNotFound: 106,
  ApplicationInsufficientFund: 107,
  ApplicationDisabled: 108,
  ValidationEndpointNotSet: 109,
  ValidationEndpointInvalid: 110,
  UserAlreadyExist: 111,
  UserNotExist: 112,
  UserPasswordNotSet: 113,
  UserEmailAddressNotConfirmed: 114,
  UserCredentialInvalid: 115,
  UserDisabled: 116,
  LocaleInvalid: 117,
  EmailConfirmCodeExpired: 118,
  EmailConfirmCodeInvalid: 119,
  EmailConfirmCodeUserNotFound: 120,
  EmailConfirmCodeAlreadyConfirmed: 121,
  ConfirmedPasswordNotMatch: 122,
  PasswordResetCodeExpired: 123,
  PasswordResetCodeInvalid: 124,
  AutoLoginValidationFailed: 125,
  APIKeyNotFound: 126,
  TaskNotFound: 127,
  TaskExpired: 128,
  TaskAlreadyFinished: 129,
  RedeemableItemNotFound: 130,
  RedeemableItemExpired: 131,
  RedeemLimitReached: 132,
  RewardNotFound: 133,
  RewardExpired: 134,
  RewardAlreadyClaimed: 135,
  ProblemNotFound: 136,
  InvalidEmailAddress: 137,
  InvalidEthAddress: 138,
  InsufficientFund: 139,
  ContentTooLong: 140,
  PasscodeAlreadySet: 141,
  PasscodeNotSet: 142,
  NewPasscodeSameAsOld: 143,
  ConfirmedPasscodeNotMatch: 144,
  InvalidPasscode: 145,
  InvalidPhoneNumberFormat: 146,
  InvalidActionType: 147,
  PhoneNumberNotSet: 148,
  PhoneNumberAlreadySet: 149,
  SMSRequestTooFrequent: 150,
  SMSDailyLimitReached: 151,
  OTPInvalid: 152,
  OTPExpired: 153,
  TransactionNotFound: 154,
  TwofaAlreadyEnabled: 155,
  TwofaSecretNotGenerated: 156,
  TwofaTokenInvalid: 157,
  DeviceIsAlreadyRegistered: 158,
  AccessCodeIsNotValid: 159,
  AccessCodeIsUsed: 160,
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
};

export default errorCode;
