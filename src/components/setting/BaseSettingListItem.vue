<template>
  <md-list-item v-bind="$attrs">
    <slot name="icon" />
    <div class="md-list-item-text">
      <span>{{ title }}</span>
      <span>{{ description }}</span>
    </div>
    <div class="md-list-action" v-show="showAction">
      <slot name="action-data" />
      <md-icon class="action-icon" md-src="/static/icons/setting-arrow-gray.svg" />
    </div>
  </md-list-item>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    showAction: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.md-list-item-text {
  color: $label-color;
}

.md-list-action {
  display: flex;
  align-items: center;
  line-height: 1.5rem;
  color: $theme-color;

  .action-icon {
    height: 1.5rem;
    width: 1.5rem;
  }
}
</style>

