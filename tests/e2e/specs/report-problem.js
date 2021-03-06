import createAPIResponse from '../utils/createAPIResponse';

describe('Report Problem', () => {
  beforeEach(() => {
    cy.stubUserListingAndDetail('user/index');
    cy.stubPinVerify();
    cy.login();
  });

  it('can report problem', () => {
    const email = 'xxx@xxx.com';
    const comment = 'Houston, we have a problem';
    const getVuex = () => cy.window({ log: false }).its('app.$store');
    cy.route('POST', '/api/user/apps/*/problems', createAPIResponse());
    cy.goToSettingPage();
    cy.getCurrentContentRouterView()
      .find('[data-cy="report-problem"]')
      .click();

    cy.location('pathname').should('eq', '/home/settings/problems');
    cy.getCurrentContentRouterView()
      .find('[data-cy="email"]')
      .focus()
      .type(email);

    cy.getCurrentContentRouterView()
      .find('[data-cy="problem"]')
      .focus()
      .type(comment);

    getVuex().invoke('dispatch', 'reportProblem/REPORT_PROBLEM', {
      email_address: email,
      comments: comment,
    });

    cy.location('pathname').should('eq', '/home/settings/problems/success');
  });
});
