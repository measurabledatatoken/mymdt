export default {

  UnknownError: 100,
  MissingParameters: 101,
  InvalidParameterValue: 102,
  InvalidJSONBody: 103,
  UnAuthorizedAccess: 104,

  ApplicationNotFound: 105,
  ApplicationInsufficientFund: 106,
  ValidationEndpointNotSet: 107,

  UserAlreadyExist: 108,
  UserNotExist: 109,
  UserPasswordNotSet: 110,
  UserEmailAddressNotConfirmed: 111,
  UserCredentialInvalid: 112,
  UserDisabled: 113,

  EmailConfirmCodeExpired: 114,
  EmailConfirmCodeInvalid: 115,
  EmailConfirmCodeUserNotFound: 116,
  EmailConfirmCodeAlreadyConfirmed: 117,

  ConfirmedPasswordNotMatch: 118,
  PasswordResetCodeExpired: 119,
  PasswordResetCodeInvalid: 120,

  AutoLoginValidationFailed: 121,

  APIKeyNotFound: 122,

  TaskNotFound: 123,
  TaskExpired: 124,
  TaskAlreadyFinished: 125,

  RedeemableItemNotFound: 126,
  RedeemableItemExpired: 127,

  RewardNotFound: 128,
  RewardExpired: 129,
  RewardAlreadyClaimed: 130,

  ProblemNotFound: 131,
  CommentsExceedMaxLength: 132,

  InvalidEmailAddress: 133,
  InvalidEthAddress: 134,
  InvalidPasscode: 135,
  InsufficientFund: 136,
  ContentTooLong: 137,

  InvalidPhoneNumberFormat: 138,
  SMSRequestTooFrequent: 139,
  OTPNotMatch: 140,
  OTPExpired: 141,

  InvalidExpiryTime: 142,

  TransactionNotFound: 143,

  TwofaAlreadyEnabled: 144,
  TwofaSecretNotGenerated: 145,
  TwofaTokenInvalid: 146,
  properties: {
    133: {
      messageId: 'message.transfer.invalid_email',
    },
    134: {
      messageId: 'message.transfer.invalid_ethaddress',
    },
    136: {
      messageId: 'message.transfer.insufficient_fund',
    },
  },
};

