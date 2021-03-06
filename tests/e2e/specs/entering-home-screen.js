import createAPIResponse from '../utils/createAPIResponse';

describe('Entering Home Screen', () => {
  beforeEach(() => {
    cy.stubUserListingAndDetail('user/index');
  });
  it('can be redirected to home page after checks the agreement', () => {
    cy.login(false);
    cy.location('pathname').should('eq', '/welcome');

    cy.get('[data-cy="agree-nda"]').click('left');
    cy.get('[data-cy="import-account"]').click();

    cy.location('pathname').should('eq', '/');
    cy.get('[data-cy="account-list"]')
      .children()
      .should('exist');
  });

  it('can show maintenance message', () => {
    cy.route(
      'GET',
      '/api/system/config',
      createAPIResponse({ server_status: 'maintenance' }),
    );
    cy.login(false);
    cy.get('[data-cy="maintenance-message"]').should('exist');
  });

  //TODO: tests for unsupported os version, cypress doesn't support to change the useragent during test run
  // https://github.com/cypress-io/cypress/issues/2100
});
