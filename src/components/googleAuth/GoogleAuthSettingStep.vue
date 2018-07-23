<template>
  <div class="google-authenticator-setting-step">
    <div class="content">
      <p class="step-title">
        {{ stepTitle }}
      </p>
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
export default {
  components: {
    MDTPrimaryButton,
  },
  props: {
    stepTitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.google-authenticator-setting-step {
  font-size: 16px;
  padding: $defaultPageMargin;
  .step-title {
    margin: 0 0 24px 0;
    font-weight: bold;
  }
}
</style>
