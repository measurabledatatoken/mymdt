<template>
    <md-button :to="to" class="primary-btn md-raised md-primary">{{ label }} </md-button>
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
};
</script>

<style lang="scss" scoped>
.md-button.md-primary {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>

