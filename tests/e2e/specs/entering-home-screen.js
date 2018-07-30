describe('Entering Home Screen', () => {
  context('with Beta Testing On', () => {
    beforeEach(function() {
      const deviceId = 'registeredDeviceId';
      cy.server();
      cy.route({
        method: 'GET',
        url: `/api/devices/${deviceId}/beta-testing-session`,
        status: 200,
        response: {
          data: {
            session_exists: true,
          },
          meta: {
            status: 200,
          },
        },
      });
      cy.wrap(deviceId).as('registeredDeviceId');
    });

    it('prompts error if no device id is specified', () => {
      cy.visit('/');
      cy.get('.md-dialog').should('exist');
    });

    it('asks for access code if non-registered device id is specified', () => {
      cy.visit('/?deviceid=someNonRegisteredDeviceId');
      cy.get('.beta-testing-form__wrapper--active').should('exist');
    });

    it('redirects to home screen if registered device id is specified', () => {
      cy.get('@registeredDeviceId').then(registeredDeviceId => {
        cy.visit(`/?deviceid=${registeredDeviceId}`);
        cy.location('pathname').should('eq', '/');
      });
    });

    it('authenticates with server, fetch users data and display data in home screen', () => {
      cy.get('@registeredDeviceId').then(registeredDeviceId => {
        cy.visit(
          `/autologin?appid=${Cypress.env(
            'APP_ID',
          )}&tokens=AA3sx3rvtfedy5327smh11uppeu,a9d323flfos38tydaio6tz261,ctnxz4pbthrjob9ivu3hefzc4,exdmch39wyp64upo2g6auc1ny,9sn72u7630a31s815onxd08gx,AAcgmay7gvspdaqiq1jxy5x8o0q&emails=test001@jianxinapp.com,test002@jianxinapp.com,mailtimeai@yahoo.com,appmailtime@163.com,testmailtime001@gmail.com,gem@mailtime.com&lang=en-us&needexit=true&deviceid=${registeredDeviceId}`,
        );

        cy.get('.bottom-content')
          .children()
          .should('exist');
      });
    });
  });
});
