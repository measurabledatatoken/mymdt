<template>
    <md-button v-bind="$attrs" @click="onClick" :disabled="disabled">
        <slot></slot>
    </md-button>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    onClick() {
      this.disabled = true;
      this.$emit('click');
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
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

