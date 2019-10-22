<template>
  <TransactionItem
    :title="title"
    :description="description"
    :avatar-url="avatarUrl"
    v-on="$listeners"
  >
    <template slot="action">
      <div :class="['action', getStatusClass(), { 'action--amount-negative': transaction.delta < 0 }]">
        <span>{{ formattedAmount }} MDT</span>
        <span
          v-if="showStatus"
          :class="[ 'action-status', { 'action-status-danger' : transaction.status === transactionStatus.CANCELLED}]"
        >
          {{ getStatusText }}
        </span>
      </div>
    </template>
  </TransactionItem>
</template>

<script>
import { mapGetters } from 'vuex';

import TransactionItem from '@/components/common/TransactionItem';

import { transactionStatus, transactionType } from '@/enum';
import { formatAmount } from '@/utils';

export default {
  components: {
    TransactionItem,
  },
  props: {
    transaction: {
      type: Object,
      default: null,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    showApplication: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      transactionStatus,
    };
  },
  computed: {
    ...mapGetters(['getApplication']),
    formattedAmount() {
      return formatAmount(Math.abs(this.transaction.delta), {
        type: 'short',
        prefix: this.transaction.delta < 0 ? '-' : '+',
      });
    },
    getStatusText() {
      return this.$t(
        transactionStatus.properties[this.transaction.status].messageId,
      );
    },
    showStatus() {
      return (
        transactionStatus.properties[this.transaction.status] &&
        this.transaction.status !== transactionStatus.SUCCESSFUL
      );
    },
    application() {
      return this.getApplication(this.transaction.application_id);
    },
    title() {
      switch (this.transaction.transaction_type) {
        case transactionType.REWARD: {
          return this.$t('message.transaction.reward');
        }
        case transactionType.REDEEM: {
          return this.$t('message.transaction.redeem');
        }
        case transactionType.INTERNAL_TRANSFER: {
          if (this.transaction.is_transfer_out) {
            return this.$t('message.transaction.transferOutToEmail', {
              email: this.transaction.to_email,
            });
          }

          return this.$t('message.transaction.transferInFromEmail', {
            email: this.transaction.from_email,
          });
        }
        case transactionType.EXTERNAL_TRANSFER: {
          return this.$t('message.transaction.transferOutToETHWallet');
        }
        case transactionType.DEPOSIT: {
          return this.$t('message.transaction.deposit');
        }
        case transactionType.REFUND: {
          return this.$t('message.transaction.refund');
        }
        default: {
          return 'title';
        }
      }
    },
    description() {
      return this.showApplication && this.application
        ? this.application.name
        : this.$d(new Date(this.transaction.transaction_time), 'long');
    },
    avatarUrl() {
      return (
        (this.showAvatar &&
          !!this.application &&
          this.application.avatar_url) ||
        ''
      );
    },
  },
  methods: {
    getStatusClass() {
      switch (this.transaction.status) {
        case transactionStatus.SUCCESSFUL: {
          return 'action--successful';
        }
        case transactionStatus.SUSPENDED:
        case transactionStatus.FAILED: {
          return 'action--failed';
        }
        default: {
          return 'action--pending';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  margin-left: 16px;
  color: $theme-font-color-btn;
  display: flex;
  flex-direction: column;
  text-align: right;

  &.action--pending {
    color: $theme-placeholder-color;
    font-style: italic;
  }

  &.action--successful {
    color: $theme-font-color-btn;

    &.action--amount-negative {
      color: $label-color;
    }
  }

  &.action--failed {
    color: $error-color;
  }

  .action-status {
    font-size: $secondary-font-size;
    &.action-status-danger {
      color: $error-color;
    }
  }
}
</style>
