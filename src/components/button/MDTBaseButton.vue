<template>
    <md-button v-bind="$attrs" @click="onClick">
        <slot></slot>
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
      shouldStopClickEmit: false,
    };
  },
  methods: {
    onClick() {
      if (!this.shouldStopClickEmit) {
        this.$emit('click');

        if (this.preventDoubleClick) {
          this.shouldStopClickEmit = true;
          setTimeout(() => {
            this.shouldStopClickEmit = false;
          }, 3000);
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

