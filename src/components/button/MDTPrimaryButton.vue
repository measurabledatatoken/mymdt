<template>
  <MDTBaseButton v-bind="$attrs" v-on="$listeners" :class="['md-raised', 'primary', { 'primary--bottom': bottom }]">
    <slot></slot>
  </MDTBaseButton>
</template>

<script>
import MDTBaseButton from '@/components/button/MDTBaseButton';

export default {
  props: ['bottom'],
  components: {
    MDTBaseButton,
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
  }

  &.primary--bottom {
    position: fixed;
    bottom: 1.5rem;
    @include center_horizontal;
  }
}
</style>
