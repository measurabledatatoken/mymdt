<template>
  <md-list-item class="reward-loading-item">
    <div class="item-content">
      <Skeleton />
      <Skeleton width="85%" />
    </div>
    <div class="item-content item-content-right">
      <Skeleton width="50%" />
      <Skeleton width="35%" />
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
.reward-loading-item {
  justify-content: space-between;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.item-content-right {
    align-items: flex-end;
  }
}
</style>
