<template>
  <md-list-item v-bind="$attrs">
    <md-avatar v-if="avatar">
      <img :src="avatar" alt="Avatar">
    </md-avatar>
    <div class="md-list-item-text">
      <span class="text-title">{{ line1 }}</span>
      <span>{{ line2 }}</span>
    </div>
    <div v-bind:class="['action', getStatusClass(), { 'action--amount-negative': amount < 0 }]">
      <span>{{ formattedAmount }} MDT</span>
      <span
        class="action-status"
        v-if="!!transactionStatus.properties[status]"
        v-show="showStatus()"
      >
        {{ $t(transactionStatus.properties[status].messageId) }}
      </span>
    </div>
  </md-list-item>
</template>

<script>
import { transactionStatus } from '@/enum';
import { formatAmount } from '@/utils';

export default {
  props: ['avatar', 'line1', 'line2', 'amount', 'status'],
  data() {
    return {
      transactionStatus,
    };
  },
  computed: {
    formattedAmount() {
      return formatAmount(this.amount, { type: 'short' });
    },
  },
  methods: {
    showStatus() {
      return this.$props.status !== transactionStatus.SUCCESSFUL;
    },
    getStatusClass() {
      switch (this.$props.status) {
        case transactionStatus.SUCCESSFUL: {
          return 'action--successful';
        }
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
  .text-title {
    color: var(--md-theme-default-text-primary-on-background, rgba(0,0,0,0.87));
  }

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

