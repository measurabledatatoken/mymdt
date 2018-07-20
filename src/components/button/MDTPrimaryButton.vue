<template>
  <MDTBaseButton 
    v-bind="$attrs" 
    :class="['md-raised', 'primary', { 'primary--bottom': bottom }]" 
    v-on="$listeners"
  >
    <slot/>
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
}
</style>
