<template>    
  <div class="view-wrapper">
    <div class="header-wrapper">
      <md-subheader>{{ $t('message.account.transactions') }}</md-subheader>
      <md-divider />
    </div>
    <md-list>
      <template v-if="loading && transactions.length === 0">
        <TransactionListLoadingItem
          v-for="n in 5"
          :key="n"
        />
      </template>
      <template v-else-if="transactions.length > 0">
        <template v-for="transaction in transactions">
          <TransactionListItem
            :key="transaction.transaction_hash"
            :transaction="transaction"
            @click="onTransactionItemClicked(transaction)"
          />
          <md-divider 
            :key="`${transaction.transaction_hash}-divider`" 
            class="divider"
          />
        </template>
      </template>
      <TransactionListEmptyItem v-else-if="transactions.length === 0" />
    </md-list>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TransactionListItem from '@/components/ethWallet/TransactionListItem';
import TransactionListLoadingItem from '@/components/ethWallet/TransactionListLoadingItem';
import TransactionListEmptyItem from '@/components/transaction/TransactionListEmptyItem';
import Skeleton from '@/components/common/Skeleton';

import { FETCH_TRANSACTIONS } from '@/store/modules/ethWallet';
import { GET_TRANSACTIONS } from '@/store/modules/entities/ethWallet';

import { RouteDef } from '@/constants';

export default {
  components: {
    TransactionListItem,
    TransactionListLoadingItem,
    TransactionListEmptyItem,
    Skeleton,
  },
  data() {
    return {
      loading: false,
      numberOfLoadingItems: 0,
      numberOfItemsPerPage: 5,
      PULLTO_TOP_CONFIG: {
        pullText: this.$t('message.transaction.listing.pullDownText'),
        triggerText: this.$t('message.transaction.listing.triggerText'),
        loadingText: this.$t('message.transaction.listing.loadingText'),
        doneText: this.$t('message.transaction.listing.doneText'),
        failText: this.$t('message.transaction.listing.failText'),
      },
      PULLTO_BOTTOM_CONFIG: {
        pullText: this.$t('message.transaction.listing.pullUpText'),
        triggerText: this.$t('message.transaction.listing.triggerText'),
        loadingText: this.$t('message.transaction.listing.loadingText'),
        doneText: this.$t('message.transaction.listing.doneText'),
        failText: this.$t('message.transaction.listing.failText'),
        triggerDistance: 10,
      },
      showBottomText: false,
    };
  },
  computed: {
    ...mapGetters({
      getTransactions: GET_TRANSACTIONS,
    }),
    transactions() {
      return this.getTransactions(this.$route.params.wallet_address);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.fetchTransactions({
        walletAddress: this.$route.params.wallet_address,
      });
      // eslint-disable-next-line
    } catch {}
    this.loading = false;
  },
  methods: {
    ...mapActions({
      fetchTransactions: FETCH_TRANSACTIONS,
    }),
    onTransactionItemClicked(transaction) {
      this.$router.push({
        name: RouteDef.ETHWalletTransactionDetail.name,
        params: {
          wallet_address: this.$route.params.wallet_address,
          transaction_hash: transaction.transaction_hash,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.divider {
  margin: 10px 1rem;
}
</style>
