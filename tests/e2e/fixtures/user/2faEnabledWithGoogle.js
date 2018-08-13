const user = require('./index');

module.exports = Object.assign({}, user, {
  is_passcode_set: true,
  is_2fa_enabled: true,
  '2fa_method': 2,
  '2fa_usage': 3,
});
