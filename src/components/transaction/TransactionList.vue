<template>
  <md-list class="transaction-list md-double-line">
    <md-subheader>{{ $t('message.account.transactions') }}</md-subheader>
    <md-divider />
    <template v-if="uiState.isFetchingTransactions">
      <TransactionListLoadingItem />
      <TransactionListLoadingItem />
      <TransactionListLoadingItem />
    </template>
    <template
      v-for="transaction in transactions"
      v-else-if="Array.isArray(transactions) && transactions.length > 0"
    >
      <TransactionItem
        :key="transaction.id"
        :transaction="transaction"
        show-avatar
        @click="onTransactionItemClicked(transaction)"
      />
      <md-divider 
        :key="`${transaction.id}-divider`" 
        class="list-item-divider"
      />
    </template>
    <TransactionListEmptyItem v-else />
  </md-list>
</template>

<script>
import { mapState } from 'vuex';
import { trackEvent } from '@/utils';

import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionListLoadingItem from '@/components/transaction/TransactionListLoadingItem';
import TransactionListEmptyItem from '@/components/transaction/TransactionListEmptyItem';
import Skeleton from '@/components/common/Skeleton';

import { RouteDef } from '@/constants';

export default {
  components: {
    TransactionItem,
    TransactionListLoadingItem,
    TransactionListEmptyItem,
    Skeleton,
  },
  props: {
    transactions: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      uiState: state => state.ui.transactionList,
    }),
  },
  methods: {
    onTransactionItemClicked(transaction) {
      trackEvent('Click on one transction to view transaction details');
      this.$router.push({
        name: RouteDef.TransactionDetail.name,
        params: { transaction_id: transaction.id, transaction },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-list {
  overflow-y: scroll;

  > li {
    flex-shrink: 0;
  }
}

.list-item__action {
  margin-left: 16px;
  color: $theme-font-color-btn;

  &.list-item__action--negative {
    color: $label-color;
  }
}

.list-item-divider {
  margin: 0 16px;
}
</style>
