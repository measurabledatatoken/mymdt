<template>
  <li
    class="transaction-list-empty-item"
  >
    <md-icon 
      class="md-size-3x" 
      md-src="/static/icons/transaction-empty.svg"
    />
    <p class="transaction-list-empty-item__label">{{ $t('message.transaction.noTransaction') }}</p>
  </li>
</template>

<script>
import Skeleton from '@/components/common/Skeleton';

export default {
  components: {
    Skeleton,
  },
};
</script>

<style lang="scss" scoped>
.transaction-list-empty-item {
  justify-content: center;
  padding-top: 2.5rem;

  .transaction-list-empty-item__label {
    font-size: 0.875rem;
    color: #aaaaaa;
  }
}
</style>
