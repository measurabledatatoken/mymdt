const configs = require('../../config/production.json');

const emailsStr = configs.env.EMAILS;
const emails = emailsStr.split(',');

module.exports = emails;
