<template>
  <md-list-item class="task-item" v-bind="$attrs">
    <div class="task-item__info">
      <md-icon class="task-item__icon" md-src="/static/icons/get-mdt.svg" />
      <div class="md-list-item-text">
        <span class="task-item__info-title">{{ task.name }}</span>
        <span v-if="showMaximum()">{{ getMaximumAmountText() }}</span>
      </div>
    </div>
    <div class="task-item__action">
      <span class="action__amount-to-earn">{{getAmountText()}}</span>
      <MDTSecondaryButton
        ref="claimButton"
        class="action__claim-button"
      >
        {{ $t('message.earnMDT.go') }}
      </MDTSecondaryButton>
    </div>
  </md-list-item>
</template>

<script>
import { formatAmount } from '@/utils';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';

export default {
  props: {
    task: Object,
  },
  methods: {
    showMaximum() {
      return this.task.max_completion > 1;
    },
    getMaximumAmountText() {
      return this.$t('message.earnMDT.maximumAmountToEarn', {
        amount: formatAmount(this.task.max_amount_to_earn, { type: 'short' }),
        currency: 'MDT',
      });
    },
    getAmountText() {
      const amount = `${formatAmount(this.task.reward_value, { type: 'short' })} MDT`;
      if (this.task.max_completion > 1) {
        return this.$t('message.earnMDT.amountPerTime', {
          amount,
        });
      }

      return amount;
    },
  },
  components: {
    MDTSecondaryButton,
  },
};
</script>

<style lang="scss" scoped>
.task-item {
  /deep/ .md-list-item-content {
    display: block;
  }

  .task-item__info {
    display: flex;
    align-items: flex-start;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 0.5rem;

    .task-item__info-title {
      font-weight: bold;
      color: $label-color;
    }

    .task-item__icon {
      line-height: 1.25rem;
      width: 1rem;
      height: 1rem;
    }
  }

  .task-item__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .action__claim-button {
      margin-right: 0px;
      margin-left: 0px;
    }

    .action__amount-to-earn {
      font-size: 0.875rem;
      color: $theme-color;
      margin-right: 0.625rem;
    }
  }
}

</style>

