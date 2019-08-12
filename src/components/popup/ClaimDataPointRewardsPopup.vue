<template>
  <md-dialog 
    v-bind="$attrs" 
    :md-fullscreen="true"
    v-on="$listeners"
  >
    <div class="header">
      <img
        :src="imageSrc"
        :srcset="imageSrcset"
        alt="Trust Wallet"
      >
      <md-button 
        class="md-icon-button" 
        @click="onClickCloseButton"
      >
        <md-icon md-src="/static/icons/close-gray.svg"/>
      </md-button>
    </div>
    <md-dialog-title>{{ title }}</md-dialog-title>
    <md-dialog-content>{{ description }}</md-dialog-content>
    <md-dialog-actions>
      <MDTMediumButton @click="onClickCloseButton">{{ $t('message.earnMDT.dataPointReards.okay') }}</MDTMediumButton>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import MDTMediumButton from '@/components/button/MDTMediumButton';

export default {
  components: {
    MDTMediumButton,
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
    imageSrc: {
      type: String,
      default: '',
    },
    imageSrcset: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClickCloseButton() {
      this.$emit('update:mdActive', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 1.5rem 1.5rem 1rem;

  /deep/ .md-dialog-container {
    background-color: white;
    border-radius: 8px;
  }
}

.header {
  position: relative;
  padding-top: 1.5rem;
  text-align: center;
}

.md-icon-button {
  position: absolute;
  right: 16px;
  top: 16px;
  margin: 0;
}

.content {
  padding: 1.875rem 1.5rem 1rem;
}

.md-dialog-title {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.87);
}

.md-dialog-actions {
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;

  .md-button {
    flex: 1;
    font-weight: bold;
  }
}
</style>
