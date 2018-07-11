<template>
  <md-list-item
    class="earn-mdt-loading-item"
  >
    <Skeleton width="80%" />
    <Skeleton width="50%" />
    <Skeleton 
      class="earn-mdt-loading-item__button" 
      width="60px"
    />
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
.earn-mdt-loading-item {
  /deep/ .md-list-item-content {
    display: block;

    .earn-mdt-loading-item__button {
      margin-left: auto;
    }
  }
}
</style>
