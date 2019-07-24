<template>
  <div>
    <img 
      :src="$t('message.earnMDT.follow.telegram.step2Src1')"
      :srcset="$t('message.earnMDT.follow.telegram.step2Srcset1')"
    >
    <img 
      :src="$t('message.earnMDT.follow.telegram.step2Src2')"
      :srcset="$t('message.earnMDT.follow.telegram.step2Srcset2')"
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
img:first-of-type {
  margin-bottom: 1rem;
}
</style>
