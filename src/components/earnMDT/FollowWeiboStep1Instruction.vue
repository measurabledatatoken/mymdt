<template>
  <div class="container">
    <div class="button-wrapper">
      <MDTMediumButton>
        {{ $t('message.earnMDT.follow.weibo.followMDTWeibo') }}
      </MDTMediumButton>
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

export default {
  components: {
    MDTMediumButton,
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
