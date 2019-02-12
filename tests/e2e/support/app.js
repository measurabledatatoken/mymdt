import { createAPIResponse } from '../utils';
const config = require('../config/config').getConfig();

beforeEach(function() {
  cy.server();
  cy.route('GET', 'https://*.mixpanel.com/**', '');

  cy.fixture('auth/autologin').then(credentials => {
    cy.route('POST', '/api/account/autologin', createAPIResponse(credentials));
  });

  cy.route(
    'GET',
    '/api/system/config',
    createAPIResponse({
      mdt_application_id: config.APP_ID,
      mdt_min_transaction_fee: '15',
      mdt_transaction_fee: '5',
      server_status: 'active',
      setup_phone_number_task_id: 'any-task-id',
    }),
  );

  cy.route(
    'GET',
    '/api/mdtprice?*',
    createAPIResponse({ price_btc: '1', price_usd: '1' }),
  );
});
