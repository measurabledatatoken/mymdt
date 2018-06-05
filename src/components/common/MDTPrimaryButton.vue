<template>
    <md-button :to="to" v-on:click="onClick()" class="primary-btn md-raised md-primary">{{ label }} </md-button>
</template>

<script>

export default {
  props: {
    to: {
      type: String,
    },
    label: {
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
.md-button.md-primary {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>

