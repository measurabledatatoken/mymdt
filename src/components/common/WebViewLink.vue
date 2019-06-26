<template>
  <a
    v-bind="$attrs"
    @click="handleClick"
  >
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
    external: {
      type: Boolean,
      default: false,
    },
    inApp: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      if (!this.to) {
        return;
      }

      if (this.external) {
        if (this.inApp) {
          window.location.href = this.to;
        } else {
          window.location.href = `mdtwallet://open-external-browser?url=${encodeURIComponent(
            this.to,
          )}`;
        }
      } else {
        this.$router.push({
          name: RouteDef.WebView.name,
          params: {
            url: this.to,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.terms-of-use-screen {
  text-align: left;
  padding: 0 $defaultPageMargin $defaultPageMargin $defaultPageMargin;

  > p {
    white-space: pre-line;
    width: 100%;
  }
}
</style>
