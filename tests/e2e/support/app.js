beforeEach(function() {
  cy.server();
  cy.route('GET', 'https://*.mixpanel.com/**', '');
});
