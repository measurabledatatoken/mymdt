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
        :md-active.sync="showClaiming"
        :md-fullscreen="false"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
      >
        <div class="dialog-content">
          <div class="animation-container">
            <div ref="loading" />
          </div>
          <p class="label">Claiming...</p>
        </div>
      </md-dialog>
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

export default {
  components: {
    ClaimMDTInDappCard,
  },
  data() {
    return {
      isLoading: false,
      showClaiming: false,
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
    onClick() {
      // TODO: replace with api calling
      this.showClaiming = true;
      this.$nextTick(() => {
        lottie.loadAnimation({
          container: this.$refs.loading,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/static/animation/mymdt-loading.json',
        });
      });
      setTimeout(() => {
        this.showClaiming = false;
      }, 1000);
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

.md-dialog {
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
