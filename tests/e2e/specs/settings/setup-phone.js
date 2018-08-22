import createAPIResponse from '../../utils/createAPIResponse';

describe('Setup Phone', () => {
  beforeEach(() => {
    cy.stubPinVerify();
    cy.stubSMSRequestAndVerify();
  });

  it('can setup phone number', () => {
    cy.stubUserListingAndDetail('user/passcodeSet');
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
    cy.get('[data-cy="setting-setup-phone"]').click();
    cy.inputPinCode();
    cy.addPhoneNumber();

    cy.get('[data-cy="setting-setup-phone"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });

  it('can change phone number', () => {
    cy.route(
      'POST',
      '/api/security/phonenumber/change',
      createAPIResponse([]),
    ).as('changePhoneNumber');
    cy.stubUserListingAndDetail('user/passcodeSet', null, {
      is_phone_confirmed: true,
    });
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();

    cy.get('[data-cy="setting-setup-phone"]').click();

    cy.get('[data-cy="popup-change-phone"]')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();
    cy.inputPinCode();
    cy.inputSMSVerificationCode();
    cy.addPhoneNumber('6222222', '853');
    cy.location('pathname').should('eq', '/home/usersettings');
  });
});
