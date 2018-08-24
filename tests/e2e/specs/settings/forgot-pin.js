import createAPIResponse from '../../utils/createAPIResponse';

describe('Forgot PIN', () => {
  const forgotPIN = () => {
    cy.route('POST', '/api/security/pin/reset', createAPIResponse()).as(
      'resetPin',
    );
    cy.location('pathname').should('eq', '/home/settings/pincode/forgot');
    cy.stubSMSRequestAndVerify();
    cy.getCurrentContentRouterView()
      .find('[data-cy="resend"]')
      .click();

    cy.inputSMSVerificationCode();
    cy.inputPINForSetup('222222');
  };

  beforeEach(() => {
    cy.stubUserListingAndDetail('user/passcodeSet', null, {
      is_phone_confirmed: true,
      phone_number: '6111111',
      country_code: '+852',
    });
    cy.stubPinVerify();
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
  });

  it('can setup pin through setting option', () => {
    cy.getCurrentContentRouterView()
      .find('[data-cy="forgot-pin"]')
      .click();
    forgotPIN();
  });

  it('can setup pin through pin input popup', () => {
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-2fa" ]')
      .click();
    cy.wait(750); // there is auto-focus logic in PinCodeInputPopup which excute with a timeout 750ms. Workaround it by forcing waiting 750ms here
    cy.get('[data-cy="forgot-pin-click"]').click();
    forgotPIN();
  });
});
