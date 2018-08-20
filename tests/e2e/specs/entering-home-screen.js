describe('Entering Home Screen', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail('user/index');
    const autoLoginUrl = `/autologin?appid=${Cypress.env(
      'APP_ID',
    )}&tokens=AA3sx3rvtfedy5327smh11uppeu,a9d323flfos38tydaio6tz261,ctnxz4pbthrjob9ivu3hefzc4,exdmch39wyp64upo2g6auc1ny,9sn72u7630a31s815onxd08gx,AAcgmay7gvspdaqiq1jxy5x8o0q&emails=test001@jianxinapp.com,test002@jianxinapp.com,mailtimeai@yahoo.com,appmailtime@163.com,testmailtime001@gmail.com,gem@mailtime.com&lang=en-us&needexit=true`;

    cy.wrap(autoLoginUrl).as('autoLoginUrl');
  });
  // it('can enter welcome page', () => {
  //   cy.get('@autoLoginUrl').then(autoLoginUrl => {
  //     cy.visit(autoLoginUrl);
  //     cy.location('pathname').should('eq', '/welcome');
  //     cy.get('button')
  //       .contains('Import Account(s)')
  //       .should('exist');
  //   });
  // });
  it('can be redirected to home page after checks the agreement', () => {
    cy.get('@autoLoginUrl').then(autoLoginUrl => {
      cy.visit(autoLoginUrl);
      cy.location('pathname').should('eq', '/welcome');

      cy.get('.mdt-checkbox__checkmark').click();
      cy.get('button')
        .contains('Import Account(s)')
        .click();

      cy.location('pathname').should('eq', '/');
      cy.get('.bottom-content')
        .children()
        .should('exist');
    });
  });

  //TODO: tests for unsupported os version, cypress doesn't support to change the useragent during test run
  // https://github.com/cypress-io/cypress/issues/2100
});
