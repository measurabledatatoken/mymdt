import { accessTokenExpiredUrl } from '@/constants';

const errorCode = {
  UnknownError: 100,
  MissingParameters: 101,
  InvalidParameterValue: 102,
  InvalidJSONBody: 103,
  UnAuthorizedAccess: 104,
  InvalidExpiryTime: 105,
  APINotFound: 106,
  ActionNotAvaliable: 107,

  ApplicationNotFound: 200,
  ApplicationInsufficientFund: 201,
  ApplicationDisabled: 202,
  ValidationEndpointNotSet: 203,
  ValidationEndpointInvalid: 204,

  UserAlreadyExist: 300,
  UserNotExist: 301,
  UserPasswordNotSet: 302,
  UserEmailAddressNotConfirmed: 303,
  UserCredentialInvalid: 304,
  UserDisabled: 305,
  LocaleInvalid: 306,
  EmailConfirmCodeExpired: 307,
  EmailConfirmCodeInvalid: 308,
  EmailConfirmCodeUserNotFound: 309,
  EmailConfirmCodeAlreadyConfirmed: 310,
  ConfirmedPasswordNotMatch: 311,
  PasswordResetCodeExpired: 312,
  PasswordResetCodeInvalid: 313,
  AutoLoginValidationFailed: 314,

  APIKeyNotFound: 400,

  TaskNotFound: 500,
  TaskExpired: 501,
  TaskAlreadyFinished: 502,

  RedeemableItemNotFound: 600,
  RedeemableItemExpired: 601,
  RedeemLimitReached: 602,

  RewardNotFound: 700,
  RewardExpired: 701,
  RewardAlreadyClaimed: 702,
  RewardAlreadyExist: 703,

  ProblemNotFound: 800,

  InvalidEmailAddress: 900,
  InvalidEthAddress: 901,
  InsufficientFund: 902,
  ContentTooLong: 903,

  PasscodeAlreadySet: 1000,
  PasscodeNotSet: 1001,
  NewPasscodeSameAsOld: 1002,
  ConfirmedPasscodeNotMatch: 1003,
  InvalidPasscode: 1004,

  InvalidPhoneNumberFormat: 1100,
  InvalidActionType: 1101,
  PhoneNumberNotSet: 1102,
  PhoneNumberAlreadySet: 1103,
  PhoneNumberBanned: 1104,
  SMSRequestTooFrequent: 1105,
  SMSDailyLimitReached: 1106,
  SMSOtpInvalid: 1107,
  SMSOtpExpired: 1108,
  PhoneNumberAlreadyBinded: 1109,
  PhoneNotBinded: 1110,

  TransactionNotFound: 1200,
  TransactionNotCancelable: 1201,

  GoogleAuthAlreadyEnabled: 1300,
  GoogleAuthNotEnabled: 1301,
  GoogleAuthSecretNotGenerated: 1302,
  GoogleAuthTokenInvalid: 1303,

  DeviceIsAlreadyRegistered: 1400,
  AccessCodeIsNotValid: 1401,
  AccessCodeIsUsed: 1402,

  TwofaNotAvailable: 1500,
  TwofaNotEnabled: 1501,
  TwofaMethodNotAvailable: 1502,
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
  [errorCode.SMSOtpInvalid]: {
    messageId: 'message.error.otpInvalid',
  },
  [errorCode.SMSOtpExpired]: {
    messageId: 'message.error.otpExpired',
  },
  [errorCode.PhoneNumberAlreadyBinded]: {
    messageId: 'message.error.phoneNumberAlreadyBinded',
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
  [errorCode.UnAuthorizedAccess]: {
    messageId: 'message.error.sessionExpired',
    redirectUrl: accessTokenExpiredUrl,
  },
};

export default errorCode;
