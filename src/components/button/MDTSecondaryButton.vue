<template>
  <md-button 
    :class="['md-raised', 'secondary-button', { 'secondary-button__color--secondary': color === 'secondary' }]" 
    v-bind="$attrs" 
    v-on="$listeners"
  >
    <slot/>
  </md-button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.md-button {
  &.secondary-button.md-raised {
    height: auto;
    min-width: 6.5625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.125rem 0.375rem;
    color: white;
    background-color: $theme-color;
    border-radius: 1rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

    &[disabled],
    &:active {
      box-shadow: none;
    }

    &.secondary-button__color--secondary {
      background-color: $theme-secondary-color;
    }

    &[disabled] {
      color: $plainbtn-wordcolor-disabled;
      background-color: #eaeaea;
    }
  }
}
</style>
