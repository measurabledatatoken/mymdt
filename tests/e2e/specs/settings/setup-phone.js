import createAPIResponse from '../../utils/createAPIResponse';

describe('Entering Setting Page', () => {
  beforeEach(() => {
    cy.server();
    cy.stubUserListingAndDetail('user/passcodeset');
    cy.stubPinVerify();
    cy.route('POST', '/api/security/sms/requestotp', createAPIResponse([])).as(
      'requestotp',
    );
    cy.route('POST', '/api/security/phonenumber/add', createAPIResponse([])).as(
      'addPhoneNumber',
    );
  });
  const inputMobileForSetup = (countryCode = '+852', phone = '61111111') => {
    cy.getCurrentContentRouterView()
      .find('input[type="number"]')
      .then($input => {
        cy.wrap($input).type(phone);
      });

    cy.getCurrentContentRouterView()
      .find('input[type="text"]')
      .click();
    cy.get('.dial-code')
      .contains(countryCode)
      .parents('.md-list-item-button')
      .click();
  };
  const SetupPhoneNumber = () => {
    const rowIndexInUserSettingOptions = 1;

    cy.getCurrentContentRouterView()
      .find('.md-list>.md-list-item')
      .eq(rowIndexInUserSettingOptions)
      .click();

    cy.inputPinCode();
    // setup pin page
    cy.location('pathname').should('eq', '/home/settings/phone/add');

    inputMobileForSetup();

    cy.getCurrentContentRouterView()
      .find('button:contains("Next")')
      .click();

    cy.wait('@requestotp');
    cy.inputSMSVerificationCode();

    // add phone success popup
    cy.get('.md-dialog')
      .find('button:contains("Done")')
      .click();

    cy.getCurrentContentRouterView()
      .find('.md-list>.md-list-item')
      .eq(rowIndexInUserSettingOptions)
      .find('.icon-complete')
      .should('exist');
  };
  it('can enter setting page', () => {
    cy.login();
    cy.goToSettingPage();
  });
  it('can enter user setting page', () => {
    cy.goToUserSettingPage();
  });
  it('can setup phone number', () => {
    SetupPhoneNumber();
  });
});
