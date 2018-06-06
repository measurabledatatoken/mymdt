<template>
    <md-button v-bind="$attrs" :to="to" v-on:click="onClick()" class="md-raised">
        <slot></slot>
    </md-button>
</template>

<script>

export default {
  props: {
    to: {
      type: String,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
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

