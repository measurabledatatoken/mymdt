<template>
  <md-button
    v-bind="$attrs"
    @click="onClick"
  >
    <slot/>
  </md-button>
</template>

<script>
export default {
  props: {
    preventDoubleClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      stopClickEmitTimer: null,
    };
  },
  beforeDestroy() {
    if (this.stopClickEmitTimer != null) {
      clearTimeout(this.stopClickEmitTimer);
      this.stopClickEmitTimer = null;
    }
  },
  methods: {
    onClick() {
      if (this.stopClickEmitTimer == null) {
        this.$emit('click');

        if (this.preventDoubleClick) {
          this.stopClickEmitTimer = setTimeout(() => {
            this.stopClickEmitTimer = null;
          }, 1000);
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.md-button.md-raised {
  width: 86%;
  height: 48px;
  margin: 0px;
  z-index: 4;
}
</style>
