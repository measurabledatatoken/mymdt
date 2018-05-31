<template>
  <md-list class="transaction-list md-double-line">
    <md-subheader>{{ $t('message.account.transactions') }}</md-subheader>
    <transaction-item-divider />
    <template v-for="transaction in transactions">
      <transaction-item
        :key="transaction.id"
        :to="{ name: 'transactionDetail', params: { transaction_id: transaction.id, transaction } }"
        :avatar="transaction.avatar"
        :line1="transaction.name"
        :line2="transaction.datetime"
        :amount="transaction.delta"
        :status="transaction.status"
      />
      <transaction-item-divider :key="`${transaction.id}-divider`" class="list-item-divider" />
    </template>
  </md-list>
</template>

<script>
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionItemDivider from '@/components/transaction/TransactionItemDivider';

export default {
  props: ['transactions'],
  components: {
    TransactionItem,
    TransactionItemDivider,
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
    flex: none;
  }
</style>

