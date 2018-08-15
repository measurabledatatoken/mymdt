const path = require('path');
const fs = require('fs');

let config = {};

/**
 * make config to be set environment-wise using trick described at https://docs.cypress.io/api/plugins/configuration-api.html#Promises
 * What's more, one can provide a local.json to override all configs
 * @param {string} file
 */
function loadConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    __dirname,
    '..',
    'config',
    `${file}.json`,
  );

  let envConfig = {};
  try {
    envConfig = JSON.parse(fs.readFileSync(pathToConfigFile, 'utf8'));
  } catch (error) {
    envConfig = {};
  }

  const pathToLocalConfigFile = path.resolve(
    __dirname,
    '..',
    'config',
    'local.json',
  );

  let localConfig = {};
  try {
    localConfig = JSON.parse(fs.readFileSync(pathToLocalConfigFile, 'utf8'));
  } catch (error) {
    localConfig = {};
  }

  const env = Object.assign({}, envConfig.env, localConfig.env);
  config = Object.assign({}, envConfig, localConfig, { env });
  return config;
}

function getConfig() {
  return config;
}

module.exports = {
  loadConfigurationByFile,
  getConfig,
};
