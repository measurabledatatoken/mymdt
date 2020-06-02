<template>
  <md-dialog 
    v-bind="$attrs" 
    :md-fullscreen="true" 
    v-on="$listeners"
  >
    <md-button 
      class="md-icon-button" 
      @click="$emit('close');"
    >
      <md-icon md-src="/static/icons/close-white.svg" />
    </md-button>
    <WebViewLink 
      :to="actionUrl" 
      external
    >
      <img :src="url" >
    </WebViewLink>
  </md-dialog>
</template>

<script>
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import WebViewLink from '@/components/common/WebViewLink';

export default {
  components: {
    MDTSubtleButton,
    WebViewLink,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
    actionUrl: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  height: 86%;
  width: 90%;
  min-width: 0px;
  background: transparent;
  a {
    height: 100%;
    width: 100%;
    margin: auto;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .md-icon-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
