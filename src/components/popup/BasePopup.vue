<template>
  <md-dialog 
    v-bind="$attrs" 
    :md-fullscreen="false"
    v-on="$listeners"
  >
    <md-dialog-title>{{ title }}</md-dialog-title>
    <md-dialog-content>{{ description }}</md-dialog-content>
    <md-dialog-actions>
      <MDTSubtleButton 
        data-cy="confirm"
        @click="onClick"
      >
        {{ confirmText }}
      </MDTSubtleButton>
    </md-dialog-actions>
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
    description: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasConfirmClickedListener() {
      return this.$listeners && this.$listeners['md-confirm'];
    },
  },
  methods: {
    onClick() {
      this.$emit('md-confirm');
      this.$emit('update:mdActive', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  .md-dialog-content {
    padding-bottom: 0;
  }
}
</style>
