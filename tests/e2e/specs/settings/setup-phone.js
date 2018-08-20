import createAPIResponse from '../../utils/createAPIResponse';

describe('Setup Phone', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.stubUserListingAndDetail('user/passcodeset');
    cy.stubPinVerify();
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();

    cy.route('POST', '/api/security/sms/requestotp', createAPIResponse([])).as(
      'requestotp',
    );
    cy.route('POST', '/api/security/phonenumber/add', createAPIResponse([])).as(
      'addPhoneNumber',
    );
  });
  it('can setup phone number', () => {
    cy.get('[data-cy="setting-setup-phone"]').click();
    cy.inputPinCode();
    cy.addPhoneNumber();

    cy.get('[data-cy="setting-setup-phone"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });
});
