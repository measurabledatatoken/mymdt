describe('Earn MDT Screen', () => {
  beforeEach(() => {
    cy.server();

    cy.stubUserListingAndDetail('user/index');

    cy.fixture('reward/claimable').then(reward => {
      const rewardAmount = reward.value;

      cy.route('GET', '/api/apps/*/user/rewards', {
        data: [reward],
        meta: {
          record_count: 1,
          status: 200,
        },
      }).as('getRewards');

      cy.wrap(rewardAmount).as('rewardAmount');
    });

    cy.route('GET', '/api/apps/*/user/tasks', {
      data: [],
      meta: { record_count: 0, status: 200 },
    });

    cy.route('POST', '/api/apps/*/user/rewards/*/claim', '').as('claimReward');
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
