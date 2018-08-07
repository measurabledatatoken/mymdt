describe('Transfer MDT', () => {
  beforeEach(() => {
    const fromUser = 'testmailtime001@gmail.com';
    const toUser = 'appmailtime@163.com';
    const toETHWalletAddress = '0x0000000000000000000000000000000000000000';

    cy.server();
    cy.fixture('users.json').as('response');
    cy.route('POST', '/api/usersdata', '@response').as('getUsers');
    cy.route('GET', '/api/apps/*/user/rewards', {
      data: [],
      meta: { record_count: 0, status: 200 },
    });

    cy.wrap(fromUser).as('fromUser');
    cy.wrap(toUser).as('toUser');
    cy.wrap(toETHWalletAddress).as('toETHWalletAddress');
  });

  const goToTransferScreen = () => {
    cy.login();
    cy.wait('@getUsers');

    cy.get('@fromUser').then(fromUser => {
      cy.get('.bottom-content')
        .contains(fromUser)
        .parents('.md-card')
        .find('button')
        .click();
    });

    return cy.location('pathname').should('eq', '/home/transfer');
  };

  const clickTransferToEmailAccount = () => {
    return cy
      .getCurrentContentRouterView()
      .find('.md-card')
      .first()
      .find('button')
      .click();
  };

  const clickTransferToETHWallet = () => {
    return cy
      .getCurrentContentRouterView()
      .find('.md-card')
      .last()
      .find('button')
      .click();
  };

  context('pincode is not set', () => {
    beforeEach(() => {
      cy.server();
      cy.get('@fromUser').then(fromUser => {
        cy.fixture('users.json').then(response => {
          const users = response.data;
          const user = users.find(user => user.email_address === fromUser);
          user.is_passcode_set = false;
          cy.route('POST', '/api/usersdata', response).as('getUsers');
        });
      });

      goToTransferScreen();
    });

    it('cannot transfer to neither email account nor ETH Wallet', () => {
      clickTransferToEmailAccount();
      cy.get('.md-dialog').should('exist');

      cy.get('.md-dialog-actions')
        .find('button')
        .first()
        .click();

      clickTransferToETHWallet();
      cy.get('.md-dialog').should('exist');
    });
  });

  context('pincode is set', () => {
    beforeEach(function() {
      cy.server();
      cy.fixture('users.json').then(response => {
        const users = response.data;
        const user = users.find(user => user.email_address === this.fromUser);
        user.is_passcode_set = true;
        cy.route('POST', '/api/usersdata', response).as('getUsers');
      });
      cy.fixture('transaction.json').then(response => {
        const transaction = response.data;
        cy.route(
          'POST',
          '/api/transfer/email',
          Object.assign({}, response, {
            data: Object.assign({}, transaction, {
              from_email: this.fromUser,
              to_email: this.toUser,
            }),
          }),
        );
        cy.route(
          'POST',
          '/api/transfer/eth-address',
          Object.assign({}, response, {
            data: Object.assign({}, transaction, {
              from_email: this.fromUser,
              to_eth_wallet: this.toETHWalletAddress,
            }),
          }),
        );
      });
      cy.stubPinVerify();
      goToTransferScreen();
    });

    it(`can transfer to email address`, () => {
      clickTransferToEmailAccount();
      cy.location('pathname').should('eq', '/home/transfer/email');
      cy.getCurrentContentRouterView()
        .find('.mdtinput')
        .find('input')
        .type(1);
      cy.get('.transfer-to')
        .find('button')
        .click();
      cy.get('@toUser').then(toUser => {
        cy.get('.md-menu-content')
          .contains(toUser)
          .click();
      });
      cy.getCurrentContentRouterView()
        .find('button')
        .last()
        .click();
      cy.location('pathname').should('eq', '/home/transfer/review');
      cy.getCurrentContentRouterView()
        .find('button')
        .last()
        .click();
      cy.get('.md-dialog').should('exist');
      cy.get('.pin-code-field')
        .find('input')
        .then($input => {
          Cypress._.each($input, el => {
            cy.wrap(el).type(1);
          });
        });
      cy.location('pathname').should(
        'eq',
        '/home/transfer/ethwallet/review/success',
      );
    });

    it(`can transfer to ETH wallet`, () => {
      clickTransferToETHWallet();
      cy.location('pathname').should('eq', '/home/transfer/ethwallet');
      cy.getCurrentContentRouterView()
        .find('.mdtinput')
        .find('input')
        .type(16);
      cy.get('@toETHWalletAddress').then(toETHWalletAddress => {
        cy.get('.address-field')
          .find('textarea')
          .focus()
          .type(toETHWalletAddress)
          .blur();
      });
      cy.getCurrentContentRouterView()
        .find('button')
        .last()
        .click();
      cy.location('pathname').should('eq', '/home/transfer/review');
      cy.getCurrentContentRouterView()
        .find('button')
        .last()
        .click();
      cy.get('.md-dialog').should('exist');
      cy.get('.pin-code-field')
        .find('input')
        .then($input => {
          Cypress._.each($input, el => {
            cy.wrap(el).type(1);
          });
        });
      cy.location('pathname').should(
        'eq',
        '/home/transfer/ethwallet/review/success',
      );
    });
  });
});
