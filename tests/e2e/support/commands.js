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

Cypress.Commands.add('login', (deviceId = 'someArbitraryDeviceId') => {
  cy.visit(
    `/autologin?appid=${Cypress.env('APP_ID')}&tokens=${Cypress.env(
      'TOKENS',
    )}&emails=${Cypress.env('EMAILS')}&lang=${Cypress.env(
      'LANG',
    )}&needexit=${Cypress.env('NEED_EXIT')}&deviceid=${deviceId}&isadmin=true`,
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
    options = Object.assign(
      {},
      {
        emailAddresses: 'testmailtime001@gmail.com',
      },
      options,
    );

    cy.fixture('user/users').then(users => {
      let selectedUsers = users.filter(
        user =>
          Array.isArray(options.emailAddresses)
            ? options.emailAddresses.includes(user.email_address)
            : user.email_address === options.emailAddresses,
      );

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

        cy.route('POST', '/api/usersdata', {
          data: selectedUsers,
          meta: {
            record_count: 1,
            status: 200,
          },
        }).as('getUsers');

        cy.route('GET', '/api/account/data', {
          data: selectedUsers[0],
          meta: {
            status: 200,
          },
        }).as('getUser');

        cy.wrap(
          Array.isArray(options.emailAddresses)
            ? options.emailAddresses[0]
            : options.emailAddresses,
        ).as('selectedUserEmail');
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

  cy.location('pathname').should(
    'eq',
    '/home/transfer/transfererifygoogleauth',
  );

  cy.getCurrentContentRouterView()
    .find('.google-authenticator-container')
    .find('input')
    .focus()
    .type(otp)
    .blur();

  // click done button
  cy.get('.container')
    .find('button')
    .click();
});

Cypress.Commands.add('inputSMSVerificationCode', (otp = '111111') => {
  expect(otp).to.have.lengthOf(6);

  cy.location('pathname').should('eq', '/home/transfer/transfererifysms');

  cy.getCurrentContentRouterView()
    .find('input')
    .focus()
    .type(otp)
    .blur();

  // click done button
  cy.get('button')
    .last()
    .click();
});

Cypress.Commands.add('getCurrentContentRouterView', () => {
  cy.get('.content-router-view').last();
});
