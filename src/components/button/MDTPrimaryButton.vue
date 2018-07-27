<template>
  <MDTBaseButton 
    v-bind="$attrs" 
    :class="['md-raised', 'primary', { 'primary--bottom': bottom }]" 
    v-on="$listeners"
  >
    <slot v-if="!loading" />
    <div 
      v-else
      class="loader"
    />
  </MDTBaseButton>
</template>

<script>
import MDTBaseButton from '@/components/button/MDTBaseButton';

export default {
  components: {
    MDTBaseButton,
  },
  props: {
    bottom: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.md-button.md-raised.primary {
  background-color: $bluebtn-backgroundcolor;
  color: $bluebtn-wordcolor;
  border-radius: 8px;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.25);
  font-size: 20px;
  text-transform: none;
  min-height: 3rem;

  &[disabled] {
    background-color: $bluebtn-backgroundcolor-disabled;
    color: $bluebtn-wordcolor-disabled;
    box-shadow: none;
  }

  &:active {
    box-shadow: none;
  }

  &.primary--bottom {
    position: fixed;
    bottom: 1.5rem;
    @include center_horizontal;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loader {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 0.3em solid rgba(255, 255, 255, 0.2);
    border-right: 0.3em solid rgba(255, 255, 255, 0.2);
    border-bottom: 0.3em solid rgba(255, 255, 255, 0.2);
    border-left: 0.3em solid #ffffff;
    transform: translateZ(0);
    animation: loading 1.1s infinite linear;
  }
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }
}
</style>
