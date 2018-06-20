<template>
    <md-dialog v-bind="$attrs" v-on="$listeners">
        <md-icon :md-src="iconSrc"></md-icon>
        <md-dialog-title>
            <span class="title">{{ title }}</span>
        </md-dialog-title>
        <MDTSubtleButton @click="$emit('md-confirm')">{{ confirmText }}</MDTSubtleButton>
    </md-dialog>
</template>

<script>
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  components: {
    MDTSubtleButton,
  },
  props: {
    title: {
      type: String,
    },
    iconSrc: {
      type: String,
    },
    confirmText: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  width: 80%;
  height: 220px;

  .md-icon {
    margin-top: 32px;
    margin-bottom: 0px;
    width: 64px;
    height: 64px;
  }

  .md-dialog-title {
    padding-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }

  /deep/ .md-button.subtle {
    position: absolute;
    width: 100%;
    font-weight: bold;
    bottom: 10px;
  }
}
</style>
