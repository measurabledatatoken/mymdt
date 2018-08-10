const transaction = require('./index');

const now = new Date();
now.setDate(now.getDate() + 5);

module.exports = Object.assign({}, transaction, {
  amount: 1,
  delta: -1,
  expiry_time: now.toISOString(),
  is_cancelable: true,
  status: 7,
  transaction_type: 2,
});
