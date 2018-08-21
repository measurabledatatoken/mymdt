// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { createAPIResponse } from '../utils';

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
Cypress.Commands.add('login', (isadmin = true) => {
  cy.visit(
    `/autologin?appid=${Cypress.env('APP_ID')}&tokens=${Cypress.env(
      'TOKENS',
    )}&emails=${Cypress.env('EMAILS')}&lang=${Cypress.env(
      'LANG',
    )}&needexit=${Cypress.env('NEED_EXIT')}${isadmin ? '&isadmin=1' : ''}`,
  );
});

Cypress.Commands.add('stubPinVerify', (shouldFail = false) => {
  cy.route({
    method: 'POST',
    url: '/api/security/pin/verify',
    status: shouldFail ? 401 : 200,
    response: shouldFail
      ? { error_code: 146, error_message: 'Invalid passcode' }
      : '',
  });
});

Cypress.Commands.add('stubGoogleVerify', (shouldFail = false) => {
  cy.route({
    method: 'POST',
    url: '/api/security/google-auth/verifyotp',
    status: shouldFail ? 401 : 200,
    response: shouldFail
      ? {
          error_code: 161,
          error_message: 'Google authentication token is invalid',
        }
      : '',
  });
});

Cypress.Commands.add('stubSMSRequestAndVerify', options => {
  options = Object.assign({}, options, {
    requestShouldFail: false,
    verifyShouldFail: false,
  });

  cy.route({
    method: 'POST',
    url: '/api/security/sms/requestotp',
    status: options.requestShouldFail ? 401 : 200,
    response: options.requestShouldFail
      ? {
          error_code: 104,
          error_message: "You don't have permission to access this api",
        }
      : '',
  });

  cy.route({
    method: 'POST',
    url: '/api/security/sms/verifyotp',
    status: options.verifyShouldFail ? 401 : 200,
    response: options.verifyShouldFail
      ? { error_code: 154, error_message: 'otp is invalid' }
      : '',
  });
});

Cypress.Commands.add(
  'stubUserListingAndDetail',
  (fixture, options, overriderUserProperties) => {
    cy.fixture('user/users').then(users => {
      let selectedUsers = options
        ? users.filter(
            user =>
              Array.isArray(options.emailAddresses)
                ? options.emailAddresses.includes(user.email_address)
                : user.email_address === options.emailAddress,
          )
        : users;

      cy.fixture(fixture).then(userProperties => {
        selectedUsers = selectedUsers.map(selectedUser =>
          Object.assign(
            {},
            selectedUser,
            userProperties,
            {
              email_address: selectedUser.email_address,
            },
            overriderUserProperties,
          ),
        );

        cy.route('POST', '/api/usersdata', createAPIResponse(selectedUsers)).as(
          'getUsers',
        );

        cy.route(
          'GET',
          '/api/account/data',
          createAPIResponse(selectedUsers[0]),
        ).as('getUser');

        cy.wrap(selectedUsers[0].email_address).as('selectedUserEmail');
      });
    });
  },
);

Cypress.Commands.add('inputPinCode', (pin = '111111') => {
  expect(pin).to.have.lengthOf(6);

  cy.get('.md-dialog').should('exist');

  cy.wait(750); // there is auto-focus logic in PinCodeInputPopup which excute with a timeout 750ms. Workaround it by forcing waiting 750ms here

  cy.get('.pin-code-field')
    .find('input')
    .then($input => {
      Cypress._.each($input, (el, index) => {
        cy.wrap(el).type(pin[index]);
      });
    });
});

Cypress.Commands.add('inputGoogleAuthVerificationCode', (otp = 'ABCDEF') => {
  expect(otp).to.have.lengthOf(6);

  cy.location('pathname').should('oneOf', [
    '/home/transfer/transferverifygoogleauth',
    '/home/2fa/googleauthstep3',
    '/home/2fa/disablegoogleauth',
    '/home/2fa/disable2faverifygoogleauth',
  ]);

  cy.getCurrentContentRouterView()
    .find('.google-authenticator-container')
    .find('input')
    .focus()
    .type(otp)
    .blur();

  // click done button
  cy.get('button:contains("Done")').click();
});

Cypress.Commands.add('inputSMSVerificationCode', (otp = '111111') => {
  expect(otp).to.have.lengthOf(6);

  cy.location('pathname').should('oneOf', [
    '/home/transfer/transfererifysms',
    '/home/settings/phone/add/verify',
    '/home/2fa/disable2faverifysms',
  ]);

  cy.getCurrentContentRouterView()
    .find('input')
    .focus()
    .type(otp)
    .blur();

  // click done button
  cy.get('button:contains("Done")').click();
});

Cypress.Commands.add('goToSettingPage', () => {
  cy.location('pathname').should('oneOf', ['/home', '/']);
  cy.get('[data-cy="settings"]').click();
  cy.fixture('user/users').then(users => {
    users.forEach(user => {
      cy.get('[data-cy="setting-list-user-item"]').contains(user.email_address);
    });
  });
});
Cypress.Commands.add('goToUserSettingPage', () => {
  cy.location('pathname').should('eq', '/home/settings');
  cy.get('@selectedUserEmail').then(selectedUserEmail => {
    cy.get('[data-cy="setting-list-user-item"]')
      .contains(selectedUserEmail)
      .click();
    cy.location('pathname').should('eq', '/home/usersettings');
  });
});
Cypress.Commands.add(
  'addPhoneNumber',
  (countryCode = '852', phone = '61111111') => {
    cy.route('POST', '/api/security/sms/requestotp', createAPIResponse([])).as(
      'requestotp',
    );
    cy.route('POST', '/api/security/phonenumber/add', createAPIResponse([]));
    cy.location('pathname').should('eq', '/home/settings/phone/add');

    // input mobile number
    cy.getCurrentContentRouterView()
      .find('input[type="number"]')
      .then($input => {
        cy.wrap($input).type(phone);
      });

    // select country code
    cy.getCurrentContentRouterView()
      .find('input[type="text"]')
      .click();
    const regCountryCode = new RegExp(`^\\+(${countryCode})$`, 'i');
    cy.get('[data-cy="country-code-item"]')
      .contains(regCountryCode)
      .click();
    cy.getCurrentContentRouterView()
      .find('[data-cy="next"]')
      .click();

    //requesting otp
    cy.wait('@requestotp');
    cy.inputSMSVerificationCode();

    // add phone success popup
    cy.get('.md-dialog')
      .find('[data-cy="confirm"]')
      .click();
  },
);
Cypress.Commands.add('setupPIN', (pin = '111111') => {
  cy.route('POST', '/api/security/pin/setup', createAPIResponse([])).as(
    'setupPin',
  );
  // setup pin page
  cy.location('pathname').should('eq', '/home/settings/pincode/setup');

  inputPINForSetup(pin);
  cy.getCurrentContentRouterView()
    .find('[data-cy="next"]')
    .click();

  // setup pin confirm page
  cy.location('pathname').should('eq', '/home/settings/pincode/confirm');
  inputPINForSetup(pin);
  cy.getCurrentContentRouterView()
    .find('[data-cy="next"]')
    .click();

  cy.wait('@setupPin');

  // setup pin success popup
  cy.get('.md-dialog')
    .find('[data-cy="confirm"]')
    .click();
});
Cypress.Commands.add('getCurrentContentRouterView', () => {
  cy.get('.content-router-view').last();
});
