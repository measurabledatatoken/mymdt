import { createAPIResponse } from '../utils';

describe('Earn MDT Screen', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail('user/index');

    cy.fixture('auth/autologin').then(credentials => {
      cy.route(
        'POST',
        '/api/account/autologin',
        createAPIResponse(credentials),
      );
    });

    cy.fixture('reward/claimable').then(reward => {
      const rewardAmount = reward.value;

      cy.route(
        'GET',
        '/api/apps/*/user/rewards',
        createAPIResponse([reward]),
      ).as('getRewards');

      cy.wrap(rewardAmount).as('rewardAmount');
    });

    cy.route('GET', '/api/apps/*/user/tasks', createAPIResponse([]));

    cy.route('POST', '/api/apps/*/user/rewards/*/claim', '').as('claimReward');
  });

  const goToEarnMDTScreen = () => {
    cy.login();

    cy.wait('@getUsers');

    cy.get('.md-dialog')
      .find('.md-dialog-actions')
      .find('button')
      .last()
      .click();

    cy.location('pathname').should('eq', '/home/earn');
  };

  it('can claim reward', () => {
    goToEarnMDTScreen();

    cy.getCurrentContentRouterView()
      .get('.earn-mdt-reward-item')
      .first()
      .find('button.earn-mdt-reward-item-action__claim-button')
      .click();

    cy.wait('@claimReward');
    cy.wait('@getUser');

    cy.get('@rewardAmount').then(rewardAmount => {
      cy.get('.earn-mdt-reward-item')
        .first()
        .find('.earn-mdt-reward-item-action__amount-wrapper')
        .should($div => {
          const text = $div.text();
          expect(text).to.match(new RegExp(`.*${rewardAmount}\\..*MDT`));
        });
    });
  });
});
