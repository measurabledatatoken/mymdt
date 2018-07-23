<template>
  <MDTBaseButton 
    v-bind="$attrs" 
    class="subtle" 
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
};
</script>

<style lang="scss" scoped>
.md-button.subtle {
  font-size: 16px;
  color: $plainbtn-wordcolor;
  text-transform: none;
  min-height: 3rem;
  margin-left: 0rem;
  margin-right: 0rem;

  /deep/ .md-ripple {
    padding: 0px;
  }

  &[disabled] {
    color: $plainbtn-wordcolor;
    opacity: 0.6;
  }
}
</style>
