const fromUser = 'testmailtime001@gmail.com';
const transactionId = '8b69560a867d400ba242dce8cc9c7501';

describe('Transaction', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail(fromUser);
    cy.stubPinVerify();

    cy.route('GET', '/api/apps/*/user/rewards', {
      data: [],
      meta: { record_count: 0, status: 200 },
    });

    cy.fixture('transaction.json').then(response => {
      const transaction = response.data;
      transaction.id = transactionId;
      transaction.amount = 1;
      transaction.delta = -1;
      transaction.expiry_time = '2018-08-15T03:35:37.344786Z';
      transaction.is_cancelable = true;
      transaction.status = 7;
      transaction.from_email = fromUser;
      transaction.to_email = 'some_random_email@mailtime.com';
      transaction.from_eth_wallet = '';
      transaction.to_eth_wallet = '';
      transaction.transaction_type = 2;

      cy.route('GET', '/api/user/transactions', {
        data: [transaction],
        meta: {
          record_count: 15,
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
    });
  });

  const goToAccountDetailScreen = () => {
    cy.login();

    cy.wait('@getUsers');

    cy.get('.bottom-content')
      .contains(fromUser)
      .parents('.md-card')
      .find('.md-card-header')
      .click();

    cy.location('pathname').should('eq', `/home/accounts/${fromUser}`);
  };

  const goToTransactionDetailScreen = () => {
    cy.wait('@getTransactions');

    cy.getCurrentContentRouterView()
      .find('.transaction-list')
      .find('.md-list-item-button')
      .first()
      .click();

    cy.location('pathname').should(
      'eq',
      `/home/accounts/${fromUser}/transactions/${transactionId}`,
    );
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

    cy.location('pathname').should('eq', `/home/accounts/${fromUser}`);
  });
});
