<template>
  <md-list-item>
    <div class="loading-item-content">
      <Skeleton />
      <Skeleton 
        class="description" 
        width="85%"
      />
    </div>
    <Skeleton
      class="label"
      width="64px" 
      height="1rem"
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
.loading-item-content {
  flex: 1;
}

.description {
  margin: 0;
}

.label {
  margin-left: 1rem;
}
</style>
