<template>
  <BaseEarnMDTItem
    :title="task.name"
    :description="description"
    :task="task"
    v-bind="$attrs"
    class="earn-mdt-task-item"
    md-src="/static/icons/get-mdt.svg"
  >
    <template slot="action">
      <div class="earn-mdt-task-item__action">
        <span class="earn-mdt-task-item-action__amount-to-earn">{{ amountText }}</span>
        <MDTSecondaryButton
          class="earn-mdt-task-item-action__claim-button"
          @click.stop="onGoToTaskClicked"
        > 
          {{ $t('message.earnMDT.go') }}
        </MDTSecondaryButton>
      </div>
    </template>
  </BaseEarnMDTItem>
</template>

<script>
import { formatAmount, trackEvent } from '@/utils';
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
      default() {
        return {};
      },
    },
    userId: {
      type: String,
      default: '',
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
      return this.task.task_url.replace('[email]', this.userId);
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
  methods: {
    onGoToTaskClicked() {
      trackEvent('Click on task button', {
        'Task Name': this.task.name,
        'Task ID': this.task.task_id,
      });
      if (this.isExternalUrl) {
        window.location = this.taskUrl;
      } else {
        this.$router.push(this.taskUrl);
      }
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
