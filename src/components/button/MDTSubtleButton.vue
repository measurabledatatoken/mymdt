<template>
    <MDTBaseButton v-bind="$attrs" v-on="$listeners" class="subtle">
        <slot></slot>
    </MDTBaseButton>
</template>

<script>
import MDTBaseButton from '@/components/button/MDTBaseButton';

export default {
  components: {
    MDTBaseButton,
  },
};
</script>

<style lang="scss" scoped>
.md-button.subtle {
  font-size: 16px;
  color: $plainbtn-wordcolor;
  text-transform: none;

  /deep/ .md-ripple {
    padding: 0px;
  }

  &[disabled] {
    color: $plainbtn-wordcolor;
    opacity: 0.6;
  }
}
</style>
