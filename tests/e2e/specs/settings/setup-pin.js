import createAPIResponse from '../../utils/createAPIResponse';

describe('Setup PIN', () => {
  const setupPIN = (pin = '111111') => {
    cy.route('POST', '/api/security/pin/setup', createAPIResponse()).as(
      'setupPin',
    );
    cy.inputPINForSetup(pin);
  };

  beforeEach(() => {
    cy.stubUserListingAndDetail('user/index');
    cy.stubPinVerify();
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
  });

  it('can setup pin', () => {
    cy.get('[data-cy="setting-setup-pin"]').click();
    setupPIN();
    cy.location('pathname').should(
      'eq',
      '/home/settings/phone/setup-phone/add',
    );
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
    setupPIN();
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
