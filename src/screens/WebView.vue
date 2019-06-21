<template>
  <div class="webview-container">
    <iframe
      :src="url"
      class="webview"
    />
  </div>
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
.webview-container {
  display: flex;
}

.webview {
  border: none;
  width: 100%;
  height: 100%;
}
</style>
