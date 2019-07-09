<template>
  <div class="container">
    <div class="button-wrapper">
      <WebViewLink
        :to="url"
        external
      >
        <MDTMediumButton>
          {{ $t('message.earnMDT.follow.weibo.followMDTWeibo') }}
        </MDTMediumButton>
      </WebViewLink>
    </div>
    <img
      :src="$t('message.earnMDT.follow.weibo.step1Src')"
      :srcset="$t('message.earnMDT.follow.weibo.step1Srcset')"
      alt="Step 1"
    >
  </div>
</template>

<script>
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';

export default {
  components: {
    MDTMediumButton,
    WebViewLink,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .button-wrapper {
    margin-bottom: 1rem;

    .md-button {
      width: 100%;
    }
  }
}
</style>
