import createAPIResponse from '../../utils/createAPIResponse';

describe('Setup Google Authenticator', () => {
  beforeEach(() => {
    cy.stubPinVerify();
    cy.route(
      'POST',
      '/api/security/google-auth/generate-secret',
      createAPIResponse({ secret: 'xxx' }),
    ).as('generateSecret');
    cy.route(
      'POST',
      '/api/security/google-auth/verify-secret',
      createAPIResponse(),
    ).as('verifySecret');
  });

  it('can setup google authenticator', () => {
    cy.stubUserListingAndDetail('user/passcodeSet');
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-google-auth"]')
      .click();
    cy.inputPinCode();

    cy.location('pathname').should('eq', '/home/2fa/googleauthstep1');
    cy.getCurrentContentRouterView()
      .find('[data-cy="next"]')
      .click();

    cy.location('pathname').should('eq', '/home/2fa/googleauthstep2');
    cy.wait('@generateSecret');
    cy.getCurrentContentRouterView()
      .find('[data-cy="next"]')
      .click();

    cy.location('pathname').should('eq', '/home/2fa/googleauthstep3');
    cy.inputGoogleAuthVerificationCode();

    cy.get('.md-dialog')
      .find('[data-cy="confirm"]')
      .click();

    cy.get('@selectedUserEmail').then(selectedUserEmail => {
      cy.location('pathname').should(
        'eq',
        `/home/usersettings/${selectedUserEmail}`,
      );
    });
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-google-auth"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });

  it('can disable google authenticator', () => {
    cy.route(
      'POST',
      '/api/security/google-auth/disable',
      createAPIResponse({}),
    ).as('disable2fa');
    cy.stubUserListingAndDetail('user/passcodeSet', null, {
      is_google_auth_enabled: true,
    });
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-google-auth"]')
      .click();

    cy.get('[data-cy="popup-disable-google-auth"]')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();

    cy.inputPinCode();
    cy.inputGoogleAuthVerificationCode();

    cy.get('@selectedUserEmail').then(selectedUserEmail => {
      cy.location('pathname').should(
        'eq',
        `/home/usersettings/${selectedUserEmail}`,
      );
    });
    cy.get('[data-cy="setting-setup-google-auth"]')
      .find('[data-cy="icon-complete"]')
      .should('not.exist');
  });

  it('can continue to setup google authenticator if the setup process is interrupted after step 1', () => {
    cy.stubUserListingAndDetail('user/passcodeSet');
    cy.login();
    cy.goToSettingPage();
    cy.goToUserSettingPage();
    cy.get('[data-cy="setting-setup-google-auth"]').click();
    cy.inputPinCode();

    cy.location('pathname').should('eq', '/home/2fa/googleauthstep1');
    cy.getCurrentContentRouterView()
      .find('[data-cy="next"]')
      .click();

    cy.location('pathname').should('eq', '/home/2fa/googleauthstep2');
    cy.wait('@generateSecret');
    cy.get('[data-cy="back"]').click();
    cy.get('[data-cy="back"]').click();

    cy.get('@selectedUserEmail').then(selectedUserEmail => {
      cy.location('pathname').should(
        'eq',
        `/home/usersettings/${selectedUserEmail}`,
      );
    });
    cy.get('[data-cy="setting-setup-google-auth"]')
      .find('[data-cy="icon-incomplete"]')
      .should('exist');

    cy.get('[data-cy="setting-setup-google-auth"]').click();
    cy.get('[data-cy="popup-continue-setup-google-auth"]')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();
    cy.inputPinCode();

    cy.location('pathname').should('eq', '/home/2fa/googleauthstep3');
    cy.inputGoogleAuthVerificationCode();

    cy.get('.md-dialog')
      .find('[data-cy="confirm"]')
      .click();

    cy.get('[data-cy="setting-setup-google-auth"]')
      .find('[data-cy="icon-complete"]')
      .should('exist');
  });
});
