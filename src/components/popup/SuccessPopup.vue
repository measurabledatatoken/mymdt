<template>
  <md-dialog 
    v-bind="$attrs" 
    v-on="$listeners"
  >
    <md-icon :md-src="iconSrc"/>
    <div class="md-dialog-title">
      <span class="title">{{ title }}</span>
    </div>
    <md-dialog-actions v-if="confirmText && cancelText && hasConfirmClickedListener">
      <md-button @click="onClick">{{ cancelText }}</md-button>
      <md-button 
        class="md-primary" 
        @click="onConfirmClicked"
      >{{ confirmText }}</md-button>
    </md-dialog-actions>
    <MDTSubtleButton 
      v-else 
      @click="onClick"
    >{{ confirmText }}</MDTSubtleButton>
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
      default: '',
    },
    iconSrc: {
      type: String,
      default: null,
    },
    confirmText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasConfirmClickedListener() {
      return this.$listeners && this.$listeners.confirmClicked;
    },
  },
  methods: {
    onConfirmClicked() {
      this.$emit('confirmClicked');
      this.$emit('update:mdActive', false);
    },
    onClick() {
      this.$emit('md-confirm');
      this.$emit('update:mdActive', false);
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
    padding-top: 14px;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 24px;
    min-height: 40px;
    text-align: center;
    font-weight: bold;
  }

  /deep/ .md-button.subtle {
    position: absolute;
    width: 100%;
    font-weight: bold;
    bottom: 10px;
  }

  /deep/ .md-dialog-actions {
    justify-content: space-between;
    padding-right: 24px;

    .md-ripple {
      padding: 0px;
    }
  }
}
</style>
