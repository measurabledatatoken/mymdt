import createAPIResponse from '../../utils/createAPIResponse';

describe('Setup Google Authenticator', () => {
  const goTo2FASettingPage = () => {
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-2fa"]')
      .click();
    cy.inputPinCode();
  };
  const enable2FA = (method = 'sms') => {
    cy.route(
      'POST',
      '/api/security/2fa/enable',
      createAPIResponse({
        is_2fa_enabled: true,
        '2fa_method': method == 'sms' ? 1 : 2,
        '2fa_usage': 1,
      }),
    ).as('enable2fa');
    cy.location('pathname').should('eq', '/home/usersettings/twofactor');
    cy.getCurrentContentRouterView()
      .find('[data-cy="switch"]')
      .click();
  };
  const disable2FA = () => {
    cy.route(
      'POST',
      '/api/security/2fa/disable',
      createAPIResponse({
        is_2fa_enabled: false,
      }),
    ).as('disable2fa');
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
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.stubUserListingAndDetail(
      'user/passcodeSetPhoneConfirmedEnabledGoogleAuth',
    );
    cy.stubPinVerify();
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
    goTo2FASettingPage();
  });

  it('can enable google authenticator', () => {
    enable2FA();
    backToUserSetting();
    cy.get('[data-cy="setting-setup-2fa"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });

  it('can disable with SMS verification Method', () => {
    cy.stubSMSRequestAndVerify();
    enable2FA('sms');
    disable2FA();
    cy.inputSMSVerificationCode();
    backToUserSetting();
    cy.get('[data-cy="setting-setup-2fa"]')
      .find('[data-cy="icon-complete"]')
      .should('not.exist');
  });
  it('can disable with Google Authenticator verification Method', () => {
    cy.stubGoogleVerify();
    enable2FA('google');
    disable2FA();
    cy.inputGoogleAuthVerificationCode();
    backToUserSetting();
    cy.get('[data-cy="setting-setup-2fa"]')
      .find('[data-cy="icon-complete"]')
      .should('not.exist');
  });

  it('can change google authenticator options', () => {
    cy.route(
      'POST',
      '/api/security/2fa/options',
      createAPIResponse({
        '2fa_method': 2,
        '2fa_usage': 2,
      }),
    ).as('setOptions');
    enable2FA();
    cy.getCurrentContentRouterView()
      .find('[data-cy="method-google"]')
      .click();
    cy.wait('@setOptions');

    cy.getCurrentContentRouterView()
      .find('[data-cy="method-google"]')
      .should('has.class', 'list-item--selected');

    cy.getCurrentContentRouterView()
      .find('[data-cy="usage-login"]')
      .should('has.class', 'list-item--selected');
  });
});
