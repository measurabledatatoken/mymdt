<template>
  <md-button :class="['secondary-button', { 'secondary-button__color--secondary': color === 'secondary' }]" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </md-button>
</template>

<script>
export default {
  props: ['color'],
};
</script>

<style lang="scss" scoped>
.md-button {
  &.secondary-button {
    height: auto;
    min-width: 6.5625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.125rem 0.375rem;
    color: white;
    background-color: $theme-color;
    border-radius: 1rem;

    &.secondary-button__color--secondary {
      background-color: $theme-secondary-color;
    }
  }
}
</style>

