describe('Transaction', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail('user/index');
    cy.stubPinVerify();

    cy.route('GET', '/api/apps/*/user/rewards', {
      data: [],
      meta: { record_count: 0, status: 200 },
    });

    cy.fixture('transaction/cancellable').then(transaction => {
      const transactionId = transaction.id;

      cy.route('GET', '/api/user/transactions', {
        data: [transaction],
        meta: {
          record_count: 1,
          status: 200,
        },
      }).as('getTransactions');

      cy.route(
        'POST',
        `/api/apps/*/user/transactions/${transactionId}/cancel`,
        {
          data: transaction,
          meta: {
            status: 200,
          },
        },
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

    cy.get('@selectedUserEmail').then(selectedUserEmail => {
      cy.location('pathname').should(
        'eq',
        `/home/accounts/${selectedUserEmail}`,
      );
    });
  });
});
