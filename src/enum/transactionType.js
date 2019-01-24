export default {
  REWARD: 0,
  REDEEM: 1,
  INTERNAL_TRANSFER: 2,
  EXTERNAL_TRANSFER: 3,
  DEPOSIT: 4,
  REFUND: 5,
  MONTHLY_REWARD: 6,
  properties: {
    0: {
      messageId: 'message.transaction.reward',
    },
    1: {
      messageId: 'message.transaction.redeem',
    },
    2: {
      messageId: 'message.transaction.internalTransfer',
    },
    3: {
      messageId: 'message.transaction.externalTransfer',
    },
    4: {
      messageId: 'message.transaction.deposit',
    },
    5: {
      messageId: 'message.transaction.refund',
    },
    6: {
      messageId: 'message.transaction.monthlyReward',
    },
  },
};
