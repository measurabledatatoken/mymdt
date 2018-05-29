<template>
  <md-list class="transaction-list md-double-line">
    <md-subheader>{{ $t('message.account.transactions') }}</md-subheader>
    <md-divider class="list-item-divider"></md-divider>
    <template v-for="transaction in transactions">
      <md-list-item :key="transaction.id">
        <md-avatar>
          <img :src="transaction.avatar" alt="Avatar">
        </md-avatar>
        <div class="md-list-item-text">
          <span>{{ transaction.name }}</span>
          <span>{{ transaction.datetime }}</span>
        </div>
        <div v-bind:class="[
          'list-item__action',
          {
            'list-item__action--negative': transaction.delta < 0
          }
        ]">
          {{ transaction.delta }} MDT
        </div>
      </md-list-item>
      <md-divider :key="`${transaction.id}-divider`" class="list-item-divider"></md-divider>
    </template>
  </md-list>
</template>

<script>
export default {
  props: ['transactions'],
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

