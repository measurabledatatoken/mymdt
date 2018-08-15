// https://docs.cypress.io/guides/guides/plugins-guide.html
const { loadConfigurationByFile } = require('./../config/config');
const generateFixtures = require('./generateFixtures');

module.exports = (on, config) => {
  const envConfig = loadConfigurationByFile(config.env.configFile || 'qa');
  generateFixtures();

  const env = Object.assign({}, config.env, envConfig.env);
  delete env.configFile;

  return Object.assign(
    {},
    config,
    {
      fixturesFolder: 'tests/e2e/__generatedFixtures__',
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
