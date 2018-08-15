const user = require('./index');
const config = require('./../../config/config').getConfig();

const userEmailsStr = config.env.EMAILS;
const userEmails = userEmailsStr.split(',');

const userObjects = userEmails.map(userEmail => {
  return Object.assign({}, user, {
    email_address: userEmail,
  });
});
module.exports = userObjects;
