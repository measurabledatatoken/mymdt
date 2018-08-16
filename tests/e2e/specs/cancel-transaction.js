import { createAPIResponse } from '../utils';

describe('Transaction', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail('user/index');
    cy.stubPinVerify();

    cy.route('GET', '/api/apps/*/user/rewards', createAPIResponse([]));

    cy.fixture('account/registeredApps').then(registeredApps => {
      cy.route(
        'GET',
        '/api/account/registered-apps',
        createAPIResponse(registeredApps),
      );
    });

    cy.fixture('transaction/cancellable').then(transaction => {
      const transactionId = transaction.id;

      cy.route(
        'GET',
        `/api/user/transactions?*`,
        createAPIResponse([transaction], { paging: true }),
      ).as('getTransactions');

      cy.route(
        'POST',
        `/api/user/transactions/${transactionId}/cancel`,
        createAPIResponse(transaction),
      ).as('cancelTransaction');

      cy.wrap(transactionId).as('transactionId');
    });
  });

  const goToAccountDetailScreen = () => {
    cy.login();

    cy.wait('@getUsers');

    cy.get('@selectedUserEmail').then(selectedUserEmail => {
      cy.get('.bottom-content')
        .contains(selectedUserEmail)
        .parents('.md-card')
        .find('.md-card-header')
        .click();

      cy.location('pathname').should(
        'eq',
        `/home/accounts/${selectedUserEmail}`,
      );
    });
  };

  const goToTransactionDetailScreen = () => {
    cy.wait('@getTransactions');

    cy.getCurrentContentRouterView()
      .find('.transaction-list')
      .find('.md-list-item-button')
      .first()
      .click();

    cy.get('@transactionId').then(transactionId => {
      cy.get('@selectedUserEmail').then(selectedUserEmail => {
        cy.location('pathname').should(
          'eq',
          `/home/accounts/${selectedUserEmail}/transactions/${transactionId}`,
        );
      });
    });
  };

  it('can be cancelled', () => {
    goToAccountDetailScreen();

    goToTransactionDetailScreen();

    cy.getCurrentContentRouterView()
      .find('.item--problem')
      .find('button')
      .click();

    cy.get('.md-dialog')
      .find('.transaction-problem-list')
      .find('li')
      .last()
      .click();

    cy.get('.md-dialog')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();

    cy.inputPinCode();

    cy.wait('@cancelTransaction');

    cy.location('pathname').should('eq', '/');
  });
});
