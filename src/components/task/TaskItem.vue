<template>
  <BaseEarnMDTItem
    class="earn-mdt-task-item"
    :title="task.name"
    :description="description"
    md-src="/static/icons/get-mdt.svg"
    v-bind="$attrs"
  >
    <template slot="action">
      <div class="earn-mdt-task-item__action">
        <span class="earn-mdt-task-item-action__amount-to-earn">{{ amountText }}</span>
        <MDTSecondaryButton
          :href="isExternalUrl ? task.task_url : null"
          :to="isExternalUrl ? null : task.task_url"
          class="earn-mdt-task-item-action__claim-button"
        >
          {{ $t('message.earnMDT.go') }}
        </MDTSecondaryButton>
      </div>
    </template>
  </BaseEarnMDTItem>
</template>

<script>
import { formatAmount } from '@/utils';
import BaseEarnMDTItem from '@/components/task/BaseEarnMDTItem';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';

export default {
  props: {
    task: Object,
  },
  computed: {
    isExternalUrl() {
      return /.+:\/\/.+/.test(this.task.task_url);
    },
    description() {
      return this.task.max_completion > 1 ? this.$t('message.earnMDT.maximumAmountToEarn', {
        amount: formatAmount(this.task.max_amount_to_earn, { type: 'short' }),
        currency: 'MDT',
      }) : null;
    },
    amountText() {
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
    BaseEarnMDTItem,
    MDTSecondaryButton,
  },
};
</script>

<style lang="scss" scoped>
.earn-mdt-task-item {
  .earn-mdt-task-item__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .earn-mdt-task-item-action__amount-to-earn {
      font-size: 0.875rem;
      font-weight: bold;
      color: $theme-color;
      margin-right: 0.625rem;
    }

    .earn-mdt-task-item-action__claim-button {
      margin-right: 0px;
      margin-left: 0px;
    }
  }
}

</style>

