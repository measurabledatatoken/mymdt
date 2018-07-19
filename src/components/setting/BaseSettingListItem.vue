<template>
  <md-list-item 
    v-bind="$attrs" 
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot name="icon" />
    <div class="md-list-item-text">
      <span :disabled="disabled">{{ title }}</span>
      <span :disabled="disabled">{{ description }}</span>
    </div>
    <div 
      v-show="showAction" 
      class="md-list-action"
    >
      <slot name="action-data" />
      <md-icon 
        class="action-icon" 
        md-src="/static/icons/setting-arrow-gray.svg"
      />
    </div>
  </md-list-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
