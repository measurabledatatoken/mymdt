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

  //TODO: tests for unsupported os version, cypress doesn't support to change the useragent during test run
  // https://github.com/cypress-io/cypress/issues/2100
});
