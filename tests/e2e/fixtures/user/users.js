const user = require('./index');
const userEmails = require('../shared/userEmails');

const userObjects = userEmails.map(userEmail => {
  return Object.assign({}, user, {
    email_address: userEmail,
  });
});
module.exports = userObjects;
