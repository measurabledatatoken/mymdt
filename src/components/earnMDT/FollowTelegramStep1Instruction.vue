<template>
  <WebViewLink
    :to="url"
    external
  >
    <MDTMediumButton>
      {{ $t('message.earnMDT.follow.telegram.followTelegram') }}
    </MDTMediumButton>
  </WebViewLink>
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
.md-button {
  width: 100%;
}
</style>
