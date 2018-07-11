<template>
  <span class="text-title">
    {{ title }}
  </span>
</template>

<script>
import { transactionType } from '@/enum';

export default {
  props: {
    transaction: Object,
  },
  computed: {
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
        default: {
          return 'title';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-title {
  color: var(
    --md-theme-default-text-primary-on-background,
    rgba(0, 0, 0, 0.87)
  );
}
</style>
