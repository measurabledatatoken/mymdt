<template>
  <div>
    <iframe
      :src="url"
      class="webview-wrapper"
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
.webview-wrapper {
  border: none;
  width: 100%;
}
</style>
