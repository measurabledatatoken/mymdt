<template>
  <md-button 
    :class="['md-raised', 'medium-button', {
      'medium-button-small': small
    }, { secondary: styleType === 1 }]" 
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
    small: {
      type: Boolean,
      default: false,
    },
    styleType: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.md-button {
  &.medium-button.md-raised {
    height: 2.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0;
    color: white;
    background-color: $theme-color;
    border-radius: 0.25rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

    &[disabled],
    &:active {
      box-shadow: none;
    }

    &[disabled] {
      background-color: #eaeaee;
      color: $plainbtn-wordcolor-disabled;
      box-shadow: none;
    }

    /deep/ .md-ripple {
      padding: 0.5rem 1.5rem;
    }

    &.medium-button-small {
      /deep/ .md-ripple {
        padding: 0.25rem 0.5rem;
      }
    }

    &.secondary {
      border-radius: 1rem;
      font-weight: bold;
    }
  }
}
</style>
