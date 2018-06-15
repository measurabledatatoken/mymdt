<template>
  <md-list-item
    class="transaction-list-loading-item"
  >
    <Skeleton class="transaction-list-loading-item__picture" width="2.5rem" height="2.5rem" />
    <div class="transaction-list-loading-item__content">
      <Skeleton width="65%" />
      <Skeleton class="account-task-list__loading-item-button" width="55%" />
    </div>
  </md-list-item>
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
.transaction-list-loading-item__picture {
  &.content-placeholder-text {
    border-radius: 100%;
    margin-right: 1.125rem;
  }
}

.transaction-list-loading-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

