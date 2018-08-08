// https://docs.cypress.io/guides/guides/plugins-guide.html

const path = require('path');
const fs = require('fs');

/**
 * make config to be set environment-wise using trick described at https://docs.cypress.io/api/plugins/configuration-api.html#Promises
 * What's more, one can provide a local.json to override all configs
 * @param {string} file
 */
function getConfigurationByFile(file) {
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
  return Object.assign({}, envConfig, localConfig, { env });
}

module.exports = (on, config) => {
  const envConfig = getConfigurationByFile(
    config.env.configFile || 'production',
  );

  const env = Object.assign({}, config.env, envConfig.env);
  delete env.configFile;

  return Object.assign(
    {},
    config,
    {
      fixturesFolder: 'tests/e2e/fixtures',
      integrationFolder: 'tests/e2e/specs',
      screenshotsFolder: 'tests/e2e/screenshots',
      videosFolder: 'tests/e2e/videos',
      supportFile: 'tests/e2e/support/index.js',
    },
    envConfig,
    {
      env,
    },
  );
};
