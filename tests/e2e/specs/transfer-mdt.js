describe('Transfer MDT', () => {
  beforeEach(() => {
    const fromUser = 'testmailtime001@gmail.com';
    const toUser = 'appmailtime@163.com';
    const toETHWalletAddress = '0x0000000000000000000000000000000000000000';

    cy.server();
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

  const goToTransferToEmailScreenAndInputRelatedInfo = () => {
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
  };

  const goToTransferToETHWalletScreenAndInputRelatedInfo = () => {
    clickTransferToETHWallet();

    cy.location('pathname').should('eq', '/home/transfer/ethwallet');

    cy.getCurrentContentRouterView()
      .find('.mdtinput')
      .find('input')
      .focus()
      .type(16)
      .blur();

    cy.get('@toETHWalletAddress').then(toETHWalletAddress => {
      cy.get('.address-field')
        .find('textarea')
        .focus()
        .type(toETHWalletAddress)
        .blur();
    });
  };

  const goToTransferReviewScreenAndInputPin = () => {
    cy.getCurrentContentRouterView()
      .find('button')
      .last()
      .click();

    cy.location('pathname').should('eq', '/home/transfer/review');

    cy.getCurrentContentRouterView()
      .find('button')
      .last()
      .click();

    cy.inputPinCode();
  };

  describe('failed transfer', () => {
    context('pincode is not set', () => {
      beforeEach(() => {
        cy.server();
        cy.get('@fromUser').then(fromUser => {
          cy.stubUserListingAndDetail('user/index', {
            emailAddress: fromUser,
          });
        });

        goToTransferScreen();
      });

      it('cannot transfer to neither email account nor ETH Wallet', () => {
        clickTransferToEmailAccount();
        cy.get('.md-dialog').should('exist');

        // click cancel button
        cy.get('.md-dialog-actions')
          .find('button')
          .first()
          .click();

        clickTransferToETHWallet();
        cy.get('.md-dialog').should('exist');
      });
    });
  });

  describe('successful transfer', () => {
    beforeEach(function() {
      cy.server();
      cy.fixture('transaction/index').then(transaction => {
        cy.route('POST', '/api/transfer/email', {
          data: Object.assign({}, transaction, {
            from_email: this.fromUser,
            to_email: this.toUser,
          }),
          meta: {
            status: 200,
          },
        }).as('postTransferToEmail');

        cy.route('POST', '/api/transfer/eth-address', {
          data: Object.assign({}, transaction, {
            from_email: this.fromUser,
            to_eth_wallet: this.toETHWalletAddress,
          }),
          meta: {
            status: 200,
          },
        }).as('postTransferToETH');
      });

      cy.stubPinVerify();
    });

    context('pincode is set but 2fa is not enabled', () => {
      beforeEach(function() {
        cy.server();
        cy.stubUserListingAndDetail('user/passcodeSet', {
          emailAddresses: [this.fromUser, this.toUser],
        });

        goToTransferScreen();
      });

      it(`can transfer to email address`, () => {
        goToTransferToEmailScreenAndInputRelatedInfo();

        goToTransferReviewScreenAndInputPin();

        cy.location('pathname').should(
          'eq',
          '/home/transfer/ethwallet/review/success',
        );
      });

      it(`can transfer to ETH wallet`, () => {
        goToTransferToETHWalletScreenAndInputRelatedInfo();

        goToTransferReviewScreenAndInputPin();

        cy.location('pathname').should(
          'eq',
          '/home/transfer/ethwallet/review/success',
        );
      });
    });

    context(
      'pincode is set, 2fa for transaction is enabled with google authenticator',
      () => {
        beforeEach(function() {
          cy.server();
          cy.stubUserListingAndDetail('user/2faEnabledWithGoogle', {
            emailAddresses: [this.fromUser, this.toUser],
          });

          cy.stubGoogleVerify();

          goToTransferScreen();
        });

        it(`can transfer to email address`, () => {
          goToTransferToEmailScreenAndInputRelatedInfo();

          goToTransferReviewScreenAndInputPin();

          cy.inputGoogleAuthVerificationCode();

          cy.wait('@postTransferToEmail');

          cy.location('pathname').should(
            'eq',
            '/home/transfer/ethwallet/review/success',
          );
        });

        it(`can transfer to ETH wallet`, () => {
          goToTransferToETHWalletScreenAndInputRelatedInfo();

          goToTransferReviewScreenAndInputPin();

          cy.inputGoogleAuthVerificationCode();

          cy.wait('@postTransferToETH');

          cy.location('pathname').should(
            'eq',
            '/home/transfer/ethwallet/review/success',
          );
        });
      },
    );

    context(
      'pincode is set, 2fa for transaction is enabled with SMS verification',
      () => {
        beforeEach(function() {
          cy.server();
          cy.stubUserListingAndDetail('user/2faEnabledWithSms', {
            emailAddresses: [this.fromUser, this.toUser],
          });

          cy.stubSMSRequestAndVerify();

          goToTransferScreen();
        });

        it(`can transfer to email address`, () => {
          goToTransferToEmailScreenAndInputRelatedInfo();

          goToTransferReviewScreenAndInputPin();

          cy.inputSMSVerificationCode();

          cy.wait('@postTransferToEmail');

          cy.location('pathname').should(
            'eq',
            '/home/transfer/ethwallet/review/success',
          );
        });

        it(`can transfer to ETH wallet`, () => {
          goToTransferToETHWalletScreenAndInputRelatedInfo();

          goToTransferReviewScreenAndInputPin();

          cy.inputSMSVerificationCode();

          cy.wait('@postTransferToETH');

          cy.location('pathname').should(
            'eq',
            '/home/transfer/ethwallet/review/success',
          );
        });
      },
    );
  });
});
