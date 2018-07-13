<template>
  <a @click="handleClick">
    <slot />
  </a>
</template>

<script>
import { RouteDef } from '@/constants';

export default {
  props: {
    to: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleClick() {
      if (!this.to) {
        return;
      }

      this.$router.push({
        name: RouteDef.WebView.name,
        params: {
          url: this.to,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.legal-and-privacy-screen {
  text-align: left;
  padding: 0 $defaultPageMargin $defaultPageMargin $defaultPageMargin;

  > p {
    white-space: pre-line;
    width: 100%;
  }
}
</style>
