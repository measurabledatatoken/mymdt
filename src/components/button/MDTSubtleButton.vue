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

  &[disabled] {
    color: $plainbtn-wordcolor-disabled;
  }
}
</style>

