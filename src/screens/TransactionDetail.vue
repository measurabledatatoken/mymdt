<template>
  <md-list class="transaction-detail-list md-double-line">
    <TransactionItem
      :transaction="transaction"
      show-application
    />
    <md-divider />
    <TransactionDetailItem 
      :title="$t('message.transaction.type')" 
      :description="$t(transactionType.properties[transaction.transaction_type].messageId)"
    />
    <TransactionDetailItem 
      :title="$t('message.transaction.time')" 
      :description="$d(new Date(transaction.transaction_time), 'long')"
    />
    <!-- <TransactionDetailItem v-if="!!transaction.detail" :title="$t('message.transaction.detail')" :description="transaction.detail" /> -->
    <TransactionDetailItem 
      v-if="!!from" 
      :title="$t('message.transaction.from')" 
      :description="from"
    />
    <TransactionDetailItem 
      v-if="!!to" 
      :title="$t('message.transaction.to')" 
      :description="to"
    />
    <TransactionDetailItem 
      v-if="!!transaction.note" 
      :title="$t('message.transaction.note')" 
      :description="transaction.note"
    />
    <TransactionDetailItem
      v-if="typeof transaction.transaction_fee === 'number'"
      :title="$t('message.transaction.transactionFee')"
      :description="`${formatAmount(transaction.transaction_fee, { type: 'long' })} MDT`"
      :single-line="true"
    />
    <TransactionDetailItem
      v-if="typeof transaction.account_balance === 'number'"
      :title="$t('message.transaction.accountBalance')"
      :description="`${formatAmount(transaction.account_balance, { type: 'long' })} MDT`"
      :single-line="true"
    />
    <TransactionDetailItem
      v-if="transaction.ethereum_transaction && transaction.ethereum_transaction.etherscan_link"
      :title="$t('message.transaction.transactionRecord')"
    >
      <template
        slot="description"
      >
        <WebViewLink
          :to="transaction.ethereum_transaction.etherscan_link"
          external
        >{{ transaction.ethereum_transaction.etherscan_link }}</WebViewLink>
      </template>
    </TransactionDetailItem>
  </md-list>
</template>

<script>
import BasePage from '@/screens/BasePage';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionDetailItem from '@/components/transaction/TransactionDetailItem';
import WebViewLink from '@/components/common/WebViewLink';

import { transactionType } from '@/enum';
import { formatAmount } from '@/utils';

export default {
  components: {
    TransactionItem,
    TransactionDetailItem,
    WebViewLink,
  },
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
    from() {
      switch (this.transaction.transaction_type) {
        case transactionType.INTERNAL_TRANSFER: {
          return this.transaction.from_email;
        }
        case transactionType.EXTERNAL_TRANSFER: {
          return this.transaction.from_eth_wallet;
        }
        default: {
          return null;
        }
      }
    },
    to() {
      switch (this.transaction.transaction_type) {
        case transactionType.INTERNAL_TRANSFER: {
          return this.transaction.to_email;
        }
        case transactionType.EXTERNAL_TRANSFER: {
          return this.transaction.to_eth_wallet;
        }
        default: {
          return null;
        }
      }
    },
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
