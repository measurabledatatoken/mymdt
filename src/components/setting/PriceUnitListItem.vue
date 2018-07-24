<template>
  <md-list-item 
    :class="{ 'list-item--selected': selected }" 
    :disabled="disabled"
    v-bind="$attrs" 
    @click="$emit('click')"
  >
    <span class="md-list-item-text">{{ title }}</span>
    <md-icon 
      v-if="selected" 
      class="action-icon" 
      md-src="/static/icons/done.svg"
    />
  </md-list-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item--selected {
  /deep/ .md-list-item-text {
    color: $theme-font-color-btn;
  }
}

.action-icon {
  /deep/ &.md-theme-default.md-icon-image {
    svg {
      fill: $theme-font-color-btn;
    }
  }
}
</style>
