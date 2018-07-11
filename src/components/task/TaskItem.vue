<template>
  <BaseEarnMDTItem
    :title="task.name"
    :description="description"
    v-bind="$attrs"
    class="earn-mdt-task-item"
    md-src="/static/icons/get-mdt.svg"
  >
    <template slot="action">
      <div class="earn-mdt-task-item__action">
        <span class="earn-mdt-task-item-action__amount-to-earn">{{ amountText }}</span>
        <MDTSecondaryButton
          :href="isExternalUrl ? taskUrl : null"
          :to="isExternalUrl ? null : taskUrl"
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
  components: {
    BaseEarnMDTItem,
    MDTSecondaryButton,
  },
  props: {
    task: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isExternalUrl() {
      return /.+:\/\/.+/.test(this.task.task_url);
    },
    taskUrl() {
      if (!this.task.task_url) {
        return '';
      }
      return this.task.task_url.replace('[email]', this.user.emailAddress);
    },
    description() {
      return this.task.max_completion > 1
        ? this.$t('message.earnMDT.maximumAmountToEarn', {
            amount: formatAmount(this.task.max_amount_to_earn, {
              type: 'short',
            }),
            currency: 'MDT',
          })
        : null;
    },
    amountText() {
      const amount = `${formatAmount(this.task.reward_value, {
        type: 'short',
      })} MDT`;
      if (this.task.max_completion > 1) {
        return this.$t('message.earnMDT.amountPerTime', {
          amount,
        });
      }

      return amount;
    },
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
