<template>
  <div class="screen-container">
    <div class="main">
      <div class="logo-container">
        <img 
          src="/static/icons/logo-data-point-rewards.svg"
          alt="MyMDT Data point rewards logo"
        >
      </div>
      <ClaimMDTInDappCard 
        :is-loading="isLoading"
        @click="onClick"
      />
      <md-dialog 
        :md-active.sync="showClaimingPopup"
        :md-fullscreen="false"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
        class="claiming-dialog"
      >
        <div class="dialog-content">
          <div class="animation-container">
            <div ref="loading" />
          </div>
          <p class="label">Claiming...</p>
        </div>
      </md-dialog>
      <ClaimDataPointRewardsPopup 
        :md-active.sync="showFinishClaimingPopup"
        :title="finishClaimingPopupTitle"
        :description="finishClaimingPopupDescription"
        :image-src="finishClaimingPopupImageSrc"
        :image-srcset="finishClaimingPopupImageSrcset"
      />
    </div>
    <img 
      src="/static/background/data-point-rewards-background.svg"
      class="footer-background"
    >
  </div>
</template>

<script>
import lottie from 'lottie-web';

import ClaimMDTInDappCard from '@/components/common/ClaimMDTInDappCard';
import ClaimDataPointRewardsPopup from '@/components/popup/ClaimDataPointRewardsPopup';

export default {
  components: {
    ClaimMDTInDappCard,
    ClaimDataPointRewardsPopup,
  },
  data() {
    return {
      isLoading: false,
      showClaimingPopup: false,
      showFinishClaimingPopup: false,
      finishClaimingPopupTitle: '',
      finishClaimingPopupDescription: '',
      finishClaimingPopupImageSrc: '',
      finishClaimingPopupImageSrcset: '',
      anim: null,
    };
  },
  beforeDestroy() {
    if (this.anim) {
      this.anim.destroy();
    }
  },
  created() {
    this.isLoading = true;

    // TODO: replace with data fetching
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  methods: {
    async onClick() {
      // TODO: replace with api calling
      this.showClaimingPopup = true;
      this.$nextTick(() => {
        lottie.loadAnimation({
          container: this.$refs.loading,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/static/animation/mymdt-loading.json',
        });
      });
      const isSuccessful = await new Promise(resolve =>
        setTimeout(() => resolve(true), 1000),
      );
      this.showClaimingPopup = false;

      let title = this.$t('message.earnMDT.dataPointReards.successPopupTitle');
      let description = this.$t(
        'message.earnMDT.dataPointReards.successPopupDescription',
      );
      let imageSrc = '/static/dapp/claiming-success.jpg';
      let imageSrcset =
        '/static/dapp/claiming-success@2x.jpg 2x, /static/dapp/claiming-success@3x.jpg 3x';
      if (!isSuccessful) {
        title = this.$t('message.earnMDT.dataPointReards.errorPopupTitle');
        description = this.$t(
          'message.earnMDT.dataPointReards.errorPopupDescription',
        );
        imageSrc = '/static/dapp/claiming-error.jpg';
        imageSrcset =
          '/static/dapp/claiming-error@2x.jpg 2x, /static/dapp/claiming-error@3x.jpg 3x';
      }
      this.finishClaimingPopupTitle = title;
      this.finishClaimingPopupDescription = description;
      this.finishClaimingPopupImageSrc = imageSrc;
      this.finishClaimingPopupImageSrcset = imageSrcset;
      this.showFinishClaimingPopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.screen-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .main {
    padding: 1.5rem 1rem;
  }
}

.logo-container {
  text-align: left;
  margin-bottom: 1rem;
}

.claiming-dialog {
  border-radius: 8px;
  width: 240px;
  min-width: 240px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
}

.animation-container {
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
}

.label {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: normal;
  color: rgba(0, 0, 0, 0.87);
}

.footer-background {
  width: 100%;
}
</style>
