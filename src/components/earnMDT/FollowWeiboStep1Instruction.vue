<template>
  <div class="container">
    <div class="button-wrapper">
      <MDTMediumButton>
        {{ $t('message.earnMDT.follow.weibo.followMDTWeibo') }}
      </MDTMediumButton>
    </div>
    <img
      src="/static/earnMDT/weibo/step-1.jpg"
      srcset="/static/earnMDT/weibo/step-1@2x.jpg 2x, /static/earnMDT/weibo/step-1@3x.jpg 3x"
      alt="Step 2"
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
