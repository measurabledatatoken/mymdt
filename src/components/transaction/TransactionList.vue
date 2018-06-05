<template>
  <md-list class="transaction-list md-double-line">
    <md-subheader>{{ $t('message.account.transactions') }}</md-subheader>
    <md-divider />
    <template v-for="transaction in transactions">
      <transaction-item
        :key="transaction.id"
        :to="{ name: RouteDef.TransactionDetail.name, params: { transaction_id: transaction.id, transaction } }"
        :avatar="transaction.avatar"
        :line1="transaction.name"
        :line2="transaction.datetime"
        :amount="transaction.delta"
        :status="transaction.status"
      />
      <md-divider :key="`${transaction.id}-divider`" class="list-item-divider" />
    </template>
  </md-list>
</template>

<script>
import TransactionItem from '@/components/transaction/TransactionItem';

import { RouteDef } from '@/constants';

export default {
  data() {
    return {
      RouteDef,
    };
  },
  props: ['transactions'],
  components: {
    TransactionItem,
  },
};
</script>

<style lang="scss" scoped>
  .transaction-list {
    overflow-y: scroll;
    padding-bottom: 80px;
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

