import createAPIResponse from '../../utils/createAPIResponse';

describe('Setup Google Authenticator', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.stubUserListingAndDetail(
      'user/passcodeSetPhoneConfirmedEnabledGoogleAuth',
    );
    cy.stubPinVerify();

    cy.route(
      'POST',
      '/api/security/2fa/enable',
      createAPIResponse({
        is_2fa_enabled: true,
        '2fa_method': 1,
        '2fa_usage': 1,
      }),
    ).as('enable2fa');

    cy.route(
      'POST',
      '/api/security/2fa/disable',
      createAPIResponse({
        is_2fa_enabled: false,
        '2fa_method': 1,
        '2fa_usage': 1,
      }),
    ).as('disable2fa');

    cy.route(
      'POST',
      '/api/security/2fa/options',
      createAPIResponse({
        '2fa_method': 2,
        '2fa_usage': 2,
      }),
    ).as('setOptions');

    cy.route(
      'POST',
      '/api/security/google-auth/verifyotp',
      createAPIResponse([]),
    ).as('verifyGoogleOtp');

    cy.route('POST', '/api/security/sms/verifyotp', createAPIResponse([])).as(
      'verifySMSOtp',
    );

    cy.route('POST', '/api/security/sms/requestotp', createAPIResponse([])).as(
      'requestSMSOtp',
    );
  });
  const goTo2FASettingPage = () => {
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-2fa"]')
      .click();
    cy.inputPinCode();
  };
  const enable2FA = () => {
    cy.location('pathname').should('eq', '/home/usersettings/twofactor');
    cy.getCurrentContentRouterView()
      .find('[data-cy="switch"]')
      .click();
  };
  const disable2FA = () => {
    cy.getCurrentContentRouterView()
      .find('[data-cy="switch"]')
      .click();

    cy.get('[data-cy="popup-disable-2fa"]')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();

    cy.inputPinCode();
  };
  const backToUserSetting = () => {
    cy.get('[data-cy="back"]').click();
    cy.location('pathname').should('eq', '/home/usersettings');
  };

  it('can enable google authenticator', () => {
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();

    goTo2FASettingPage();
    enable2FA();

    backToUserSetting();

    cy.get('[data-cy="setting-setup-2fa"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });

  it('can disable google authenticator with SMS verification Method', () => {
    goTo2FASettingPage();
    disable2FA();
    cy.inputSMSVerificationCode();

    backToUserSetting();

    cy.get('[data-cy="setting-setup-2fa"]')
      .find('[data-cy="icon-complete"]')
      .should('not.exist');
  });

  it('can change google authenticator options', () => {
    goTo2FASettingPage();
    enable2FA();
    cy.getCurrentContentRouterView()
      .find('[data-cy="method-google"]')
      .click();
    cy.wait('@setOptions');

    cy.getCurrentContentRouterView()
      .find('.list-item--selected[data-cy="method-google"]')
      .should('exist');

    cy.getCurrentContentRouterView()
      .find('.list-item--selected[data-cy="usage-login"]')
      .should('exist');
  });

  it('can disable google authenticator with Google Authenticator verification Method', () => {
    disable2FA();
    cy.inputGoogleAuthVerificationCode();

    backToUserSetting();

    cy.get('[data-cy="setting-setup-2fa"]')
      .find('[data-cy="icon-complete"]')
      .should('not.exist');
  });
});
