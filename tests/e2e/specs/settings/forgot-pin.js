describe('Forgot PIN', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.stubUserListingAndDetail('user/passcodeset', null, {
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
    cy.forgotPIN();
  });
  it('can setup pin through pin input popup', () => {
    cy.getCurrentContentRouterView()
      .find('[data-cy="setting-setup-2fa" ]')
      .click();
    cy.wait(750); // there is auto-focus logic in PinCodeInputPopup which excute with a timeout 750ms. Workaround it by forcing waiting 750ms here
    cy.get('[data-cy="forgot-pin-click"]').click();
    cy.forgotPIN();
  });
});
