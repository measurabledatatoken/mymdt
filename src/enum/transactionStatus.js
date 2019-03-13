export default {
  PENDING: 0,
  PROCESSING: 1,
  SUSPENDED: 2,
  SUCCESSFUL: 3,
  FAILED: 4,
  CANCELLED: 5,
  EXPIRED: 6,
  PENDING_TO_CLAIM: 7,
  PENDING_TO_APPROVE: 8,
  properties: {
    0: {
      messageId: 'message.transaction.pending',
    },
    1: {
      messageId: 'message.transaction.processing',
    },
    2: {
      messageId: 'message.transaction.suspended',
    },
    3: {
      messageId: 'message.transaction.successful',
    },
    4: {
      messageId: 'message.transaction.failed',
    },
    5: {
      messageId: 'message.transaction.cancelled',
    },
    6: {
      messageId: 'message.transaction.expired',
    },
    7: {
      messageId: 'message.transaction.pendingToClaim',
    },
    8: {
      messageId: 'message.transaction.pendingToApprove',
    },
  },
};
