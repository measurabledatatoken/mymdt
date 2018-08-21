const user = require('./index');

module.exports = Object.assign({}, user, {
  is_passcode_set: true,
  is_phone_confirmed: true,
  is_google_auth_enabled: true,
  has_google_auth_secret: true,
});
