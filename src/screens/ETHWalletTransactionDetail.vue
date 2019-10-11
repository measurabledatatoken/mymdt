<template>
  <md-list class="transaction-detail-list md-double-line">
    <TransactionListItem :transaction="transaction" />
    <md-divider />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.block')"
      :description="String(transaction.block)"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.gasPrice')"
      :description="String(gasPrice)"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.gasUsed')"
      :description="String(transaction.gas_used)"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.transactionFee')"
      :description="String(transactionFee)"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.transactionHash')"
      :description="transaction.transaction_hash"
    />
  </md-list>
</template>
<script>
import { mapGetters } from 'vuex';
import BasePage from '@/screens/BasePage';
import TransactionDetailItem from '@/components/transaction/TransactionDetailItem';

import TransactionListItem from '@/components/ethWallet/TransactionListItem';

import { GET_TRANSACTION_BY_ID } from '@/store/modules/entities/ethWalletTransaction';

export default {
  components: {
    TransactionListItem,
    TransactionDetailItem,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transaction.title'),
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getTransaction: GET_TRANSACTION_BY_ID,
    }),
    transaction() {
      return this.getTransaction(this.$route.params.transaction_hash);
    },
    gasPrice() {
      return this.transaction.gas_price;
    },
    transactionFee() {
      return this.gasPrice * this.transaction.gas_used;
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-detail-list {
  padding-top: 0;
}
</style>
