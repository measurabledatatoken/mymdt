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
    `/autologin?appid=${Cypress.env(
      'APP_ID',
    )}&tokens=AA3sx3rvtfedy5327smh11uppeu,a9d323flfos38tydaio6tz261,ctnxz4pbthrjob9ivu3hefzc4,exdmch39wyp64upo2g6auc1ny,9sn72u7630a31s815onxd08gx,AAcgmay7gvspdaqiq1jxy5x8o0q&emails=test001@jianxinapp.com,test002@jianxinapp.com,mailtimeai@yahoo.com,appmailtime@163.com,testmailtime001@gmail.com,gem@mailtime.com&lang=en-us&needexit=true&deviceid=${deviceId}&isadmin=true`,
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

Cypress.Commands.add('getCurrentContentRouterView', () => {
  cy.get('.content-router-view').last();
});
