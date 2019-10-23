<template>
  <TransactionItem
    :title="title"
    :subtitle="address"
    :description="dateDescription"
    :amount="amount"
    :positive="positive"
    v-on="$listeners"
  />
</template>

<script>
import TransactionItem from '@/components/common/TransactionItem';

export default {
  components: {
    TransactionItem,
  },
  props: {
    transaction: {
      type: Object,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    title() {
      return this.transaction.is_transfer_in
        ? this.$t('message.ethWallet.transferFrom')
        : this.$t('message.ethWallet.transferTo');
    },
    address() {
      if (!this.transaction) {
        return '';
      }

      const adddress = this.transaction.is_transfer_in
        ? this.transaction.from
        : this.transaction.to;

      return `${adddress.slice(0, 6)}...${adddress.slice(-6)}`;
    },
    amount() {
      if (!this.transaction) {
        return 0;
      }

      return this.transaction.value;
    },
    dateDescription() {
      if (!this.transaction.timestamp) {
        return '';
      }

      return this.$d(new Date(this.transaction.timestamp * 1000), 'long');
    },
    positive() {
      if (!this.transaction) {
        return false;
      }

      return this.transaction.is_transfer_in;
    },
  },
};
</script>
