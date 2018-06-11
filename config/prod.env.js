'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT || 'localhost:8080/api'),
  API_Scheme: JSON.stringify(process.env.API_SCHEME || 'http'),
}
