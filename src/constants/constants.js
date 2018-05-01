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

  UnknownError: 99999,
};
