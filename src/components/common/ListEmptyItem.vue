<template>
  <li
    class="list-empty-item"
  >
    <md-icon 
      class="md-size-3x" 
      md-src="/static/icons/transaction-empty.svg"
    />
    <p class="list-empty-item__label">{{ label }}</p>
  </li>
</template>

<script>
import Skeleton from '@/components/common/Skeleton';

export default {
  components: {
    Skeleton,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.list-empty-item {
  justify-content: center;
  padding-top: 2.5rem;

  .list-empty-item__label {
    font-size: 0.875rem;
    color: #aaaaaa;
  }
}
</style>
