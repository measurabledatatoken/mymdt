<template>
  <PaddedContainer>
    <div class="google-authenticator-setting-step">
      <div class="content">
        <p class="step-title">
          {{ stepTitle }}
        </p>
        <slot name="content"/>
      </div>
    </div>
  </PaddedContainer>
</template>

<script>
import PaddedContainer from '@/components/containers/PaddedContainer';

export default {
  components: {
    PaddedContainer,
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
  .step-title {
    margin: 24px 0;
    font-weight: bold;
  }
  .content {
    padding: 0 8px;
    /deep/ .md-button {
      width: 100%;
    }
  }
}
</style>
