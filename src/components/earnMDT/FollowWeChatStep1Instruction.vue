<template>
  <div class="container">
    <div 
      v-for="(account, index) in accounts"
      :key="`account-${index}`"
      class="account"
    >
      <figure class="logo-container">
        <img 
          :src="account.src"
          :alt="account.alt"
          width="52"
          height="52"
        >
        <figcaption class="caption">{{ account.caption }}</figcaption>
      </figure>
      <MDTMediumButton small>
        {{ $t('message.earnMDT.follow.wechat.downloadQRCOde') }}
      </MDTMediumButton>
    </div>
  </div>
</template>

<script>
import MDTMediumButton from '@/components/button/MDTMediumButton';

export default {
  components: {
    MDTMediumButton,
  },
  data() {
    return {
      accounts: [
        {
          src: '/static/icons/mailtime-logo.svg',
          alt: this.$t('message.earnMDT.follow.MailTime'),
          caption: this.$t('message.earnMDT.follow.MailTime'),
        },
        {
          src: '/static/icons/mdt-logo.svg',
          alt: this.$t('message.earnMDT.follow.MDT'),
          caption: this.$t('message.earnMDT.follow.MDT'),
        },
        {
          src: '/static/icons/mai-logo.svg',
          alt: this.$t('message.earnMDT.follow.MAI'),
          caption: this.$t('message.earnMDT.follow.MAI'),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .account {
    margin-bottom: 0.25rem;

    .logo-container {
      margin: 0 0 0.5rem 0;

      .caption {
        color: $primary-text-color;
        margin-top: 0.25rem;
        font-weight: 600;
      }
    }
  }
}
</style>
