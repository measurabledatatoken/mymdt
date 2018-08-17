import createAPIResponse from '../../utils/createAPIResponse';

describe('Entering Setting Page', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail('user/index');
    cy.stubPinVerify();
    //setup pin api
    cy.route('POST', '/api/security/pin/setup', createAPIResponse([])).as(
      'setupPin',
    );

    cy.route('POST', '/api/security/sms/requestotp', createAPIResponse([])).as(
      'requestotp',
    );

    cy.route('POST', '/api/security/phonenumber/add', createAPIResponse([])).as(
      'addPhoneNumber',
    );
  });

  const goToSettingPage = () => {
    cy.login();
    cy.get('.settingsbtn').click();
    cy.fixture('user/users').then(users => {
      users.forEach(user => {
        cy.get('.md-list.md-double-line').contains(user.email_address);
      });
    });
  };
  const goToUserSettingPage = () => {
    cy.get('@selectedUserEmail').then(selectedUserEmail => {
      cy.get('.md-list.md-double-line')
        .contains(selectedUserEmail)
        .parents('.md-list-item')
        .click();
      cy.location('pathname').should('eq', '/home/usersettings');
    });
  };
  const SetupPIN = (pin = '111111') => {
    cy.getCurrentContentRouterView()
      .find('.md-list>.md-list-item')
      .eq(0)
      .click();
    // setup pin page
    cy.location('pathname').should('eq', '/home/settings/pincode/setup');

    inputPINForSetup(pin);
    cy.getCurrentContentRouterView()
      .find('button:contains("Next")')
      .click();

    // setup pin confirm page
    cy.location('pathname').should('eq', '/home/settings/pincode/confirm');
    inputPINForSetup(pin);
    cy.getCurrentContentRouterView()
      .find('button:contains("Next")')
      .click();

    cy.wait('@setupPin');

    // setup pin success popup
    cy.get('.md-dialog')
      .find('button:contains("Done")')
      .click();

    // Add your phone number page
    cy.getCurrentContentRouterView()
      .find('button:contains("Skip")')
      .click();

    // skip adding phone number popup
    cy.get('.md-dialog')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();

    // check if the setup pin indicator icon exists
    cy.getCurrentContentRouterView()
      .find('.md-list>.md-list-item')
      .eq(0)
      .find('.icon-complete')
      .should('exist');
  };
  const inputPINForSetup = (pin = '111111') => {
    expect(pin).to.have.lengthOf(6);
    cy.wait(750);
    cy.getCurrentContentRouterView()
      .find('.pin-code-field')
      .find('input')
      .then($input => {
        Cypress._.each($input, (el, index) => {
          cy.wrap(el).type(pin[index]);
        });
      });
  };
  it('can enter setting page', () => {
    goToSettingPage();
  });
  it('can enter user setting page', () => {
    goToUserSettingPage();
  });
  it('can setup pin', () => {
    SetupPIN('111111');
  });
});
