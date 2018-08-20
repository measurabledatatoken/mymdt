describe('Setup PIN', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.stubUserListingAndDetail('user/index');
    cy.stubPinVerify();
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
  });

  it('can setup pin', () => {
    cy.get('[data-cy="setting-setup-pin"]').click();
    cy.setupPIN();
    // Add your phone number page
    cy.getCurrentContentRouterView()
      .find('[data-cy="skip"]')
      .click();

    // skip adding phone number popup
    cy.get('.md-dialog')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();

    // check if the setup pin indicator icon exists
    cy.get('[data-cy="setting-setup-pin"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });
  it('can setup pin and phone', () => {
    cy.get('[data-cy="setting-setup-pin"]').click();
    cy.setupPIN();
    cy.addPhoneNumber();

    // check if the setup pin indicator icon exists
    cy.get('[data-cy="setting-setup-pin"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');

    cy.get('[data-cy="setting-setup-phone"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });
});
