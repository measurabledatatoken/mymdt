<template>
  <md-list class="transaction-detail-list md-double-line">
    <transaction-item
      :line1="transaction.name"
      :line2="transaction.application"
      :amount="transaction.delta"
      :status="transaction.status"
    />
    <md-divider />
    <transaction-detail-item :title="$t('message.transaction.type')" :description="$t(transactionType.properties[transaction.type].messageId)" />
    <transaction-detail-item :title="$t('message.transaction.time')" :description="transaction.datetime" />
    <transaction-detail-item v-if="!!transaction.detail" :title="$t('message.transaction.detail')" :description="transaction.detail" />
    <transaction-detail-item v-if="!!transaction.from" :title="$t('message.transaction.from')" :description="transaction.from" />
    <transaction-detail-item v-if="!!transaction.to" :title="$t('message.transaction.to')" :description="transaction.to" />
    <transaction-detail-item v-if="!!transaction.note" :title="$t('message.transaction.note')" :description="transaction.note" />
    <transaction-detail-item
      v-if="typeof transaction.fee === 'number'"
      :title="$t('message.transaction.transactionFee')"
      :description="`${formatAmount(transaction.fee)} MDT`"
      :singleLine="true"
    />
    <transaction-detail-item
      v-if="typeof transaction.balance === 'number'"
      :title="$t('message.transaction.accountBalance')"
      :description="`${formatAmount(transaction.balance)} MDT`"
      :singleLine="true"
    />
  </md-list>
</template>

<script>
import BasePage from '@/screens/BasePage';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionDetailItem from '@/components/transaction/TransactionDetailItem';

import { transactionType } from '@/enum';
import { formatAmount } from '@/utils';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transaction.title'),
    };
  },
  data() {
    return {
      transactionType,
    };
  },
  computed: {
    transaction() {
      return this.$route.params.transaction || {};
    },
  },
  components: {
    TransactionItem,
    TransactionDetailItem,
  },
  methods: {
    formatAmount,
  },
};
</script>

<style lang="scss" scoped>
  .transaction-detail-list {
    padding-top: 0;
  }
</style>
