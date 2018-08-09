describe('Earn MDT Screen', () => {
  beforeEach(() => {
    const rewardAmount = 1;

    cy.server();

    cy.fixture('users.json').then(response => {
      response.data = response.data.slice(0, 1);
      cy.route('POST', '/api/usersdata', response).as('getUsers');

      cy.route('GET', '/api/account/data', {
        data: response.data[0],
        meta: {
          status: 200,
        },
      }).as('getUser');
    });

    cy.fixture('reward.json').then(response => {
      const rewards = response.data;
      rewards.forEach(reward => {
        reward.claimed = false;
        reward.value = rewardAmount;
      });

      cy.route('GET', '/api/apps/*/user/rewards', response).as('getRewards');
    });

    cy.route('GET', '/api/apps/*/user/tasks', {
      data: [],
      meta: { record_count: 0, status: 200 },
    });

    cy.route('POST', '/api/apps/*/user/rewards/*/claim', '').as('claimReward');

    cy.wrap(rewardAmount).as('rewardAmount');
  });

  const goToEarnMDTScreen = () => {
    cy.login();

    cy.wait('@getUsers');

    cy.wait('@getRewards');

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
