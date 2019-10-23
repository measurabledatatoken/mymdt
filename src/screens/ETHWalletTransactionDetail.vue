<template>
  <md-list class="transaction-detail-list md-double-line">
    <TransactionListItem :transaction="transaction" />
    <md-divider />
    <TransactionDetailItem
      :title="$t(transaction.is_transfer_in ? 'message.ethWallet.transferFrom' : 'message.ethWallet.transferTo')"
    >
      <template
        slot="description"
      >
        <WalletAddressBlock
          :hash="transaction.is_transfer_in ? transaction.from : transaction.to"
          class="wallet-address"
        />
      </template>
    </TransactionDetailItem>
    <TransactionDetailItem 
      :title="$t('message.ethWallet.block')"
      :description="String(transaction.block)"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.gasPrice')"
      :description="`${transaction.gas_price} ETH`"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.gasUsed')"
      :description="transaction.gas_used"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.transactionFee')"
      :description="`${transaction.transaction_fee} ETH`"
    />
    <TransactionDetailItem 
      :title="$t('message.ethWallet.transactionHash')"
      :description="transaction.transaction_hash"
    />
    <TransactionDetailItem
      v-if="etherscanUrl"
      :title="$t('message.transaction.transactionRecord')"
    >
      <template
        slot="description"
      >
        <WebViewLink
          :to="etherscanUrl"
          external
        >{{ etherscanUrl }}</WebViewLink>
      </template>
    </TransactionDetailItem>
  </md-list>
</template>
<script>
import { mapGetters } from 'vuex';
import BasePage from '@/screens/BasePage';
import TransactionDetailItem from '@/components/transaction/TransactionDetailItem';
import WalletAddressBlock from '@/components/common/WalletAddressBlock';

import TransactionListItem from '@/components/ethWallet/TransactionListItem';
import WebViewLink from '@/components/common/WebViewLink';

import { GET_TRANSACTION_BY_ID } from '@/store/modules/entities/ethWalletTransaction';

export default {
  components: {
    TransactionListItem,
    TransactionDetailItem,
    WebViewLink,
    WalletAddressBlock,
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
    etherscanUrl() {
      if (!this.transaction.transaction_hash) {
        return '';
      }

      return `https://etherscan.io/tx/${this.transaction.transaction_hash}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-detail-list {
  padding-top: 0.25rem;
}

.md-divider {
  margin-top: 0.25rem;
}

.wallet-address {
  display: table;
  font-weight: normal;
  margin-left: auto;
}
</style>
