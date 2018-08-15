import { createAPIResponse } from '../utils';

beforeEach(function() {
  cy.server();
  cy.route('GET', 'https://*.mixpanel.com/**', '');

  cy.fixture('auth/autologin').then(credentials => {
    cy.route('POST', '/api/account/autologin', createAPIResponse(credentials));
  });
});
