<template>
  <VueQrcode 
    :value="value"
    tag="img"
  />
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: {
    VueQrcode,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
};
</script>


<style lang="scss" scoped>
img {
  -webkit-touch-callout: default; // enable Save Image for iOS WebView which is disabled by vue-material
}
</style>
