const reward = require('./index');

const now = new Date();
now.setDate(now.getDate() + 5);

module.exports = Object.assign({}, reward, {
  value: 1,
  expiry_time: now.toISOString(),
});
