<template>
  <md-dialog-confirm 
    v-bind="$attrs" 
    v-on="$listeners"
  />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.md-dialog {
  z-index: 10000;
  /deep/ .md-dialog-actions {
    justify-content: space-between;
    padding-right: 24px;

    .md-ripple {
      padding: 0px;
    }
  }

  /deep/ .md-button-content {
    text-transform: none;
  }
}
</style>
