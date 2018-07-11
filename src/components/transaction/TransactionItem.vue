<template>
  <md-list-item v-bind="$attrs">
    <md-avatar v-if="showAvatar && application && application.avatar_url">
      <img :src="application.avatar_url" alt="Avatar">
    </md-avatar>
    <div class="md-list-item-text">
      <TransactionTitle :transaction="transaction" />
      <span>{{ (showApplication && application) ? application.name : $d(new Date(transaction.transaction_time), 'long') }}</span>
    </div>
    <div v-bind:class="['action', getStatusClass(), { 'action--amount-negative': transaction.delta < 0 }]">
      <span>{{ formattedAmount }} MDT</span>
      <span
        class="action-status"
        v-if="showStatus"
      >
        {{ getStatusText }}
      </span>
    </div>
  </md-list-item>
</template>

<script>
import { mapGetters } from 'vuex';

import TransactionTitle from '@/components/transaction/TransactionTitle';

import { transactionStatus } from '@/enum';
import { formatAmount } from '@/utils';

export default {
  props: {
    transaction: Object,
    showAvatar: {
      type: Boolean,
      default: false,
    },
    showApplication: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['getApplication']),
    formattedAmount() {
      return formatAmount(this.transaction.delta, { type: 'short' });
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
  components: {
    TransactionTitle,
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
    color: $theme-placehoder-color;
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
  }
}
</style>
