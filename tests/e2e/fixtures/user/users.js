const user = require('./index');

module.exports = [
  user,
  Object.assign({}, user, {
    email_address: 'test001@jianxinapp.com',
  }),
  Object.assign({}, user, {
    email_address: 'test002@jianxinapp.com',
  }),
  Object.assign({}, user, {
    email_address: 'mailtimeai@yahoo.com',
  }),
  Object.assign({}, user, {
    email_address: 'appmailtime@163.com',
  }),
  Object.assign({}, user, {
    email_address: 'gem@mailtime.com',
  }),
];
