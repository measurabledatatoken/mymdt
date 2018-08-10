const user = require('./index');

module.exports = Object.assign({}, user, {
  is_passcode_set: true,
});
