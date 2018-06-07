'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT: '"localhost:8080/api"',
  API_Scheme: '"http"',
})
