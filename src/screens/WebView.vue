<template>
  <iframe
    :src="url"
    class="webview-screen"
  />
</template>

<script>
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  computed: {
    url() {
      return this.$route.params.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.webview-screen {
  border: none;
}
</style>
