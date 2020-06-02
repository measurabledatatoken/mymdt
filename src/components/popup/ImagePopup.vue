<template>
  <md-dialog 
    v-bind="$attrs" 
    :md-fullscreen="true"
    v-on="$listeners"
  >
    <WebViewLink
      :to="actionUrl"
      external
    >
      <img :src="url">
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
  height: 80%;
  width: 80%;
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
    object-fit: contain;
  }
}
</style>
