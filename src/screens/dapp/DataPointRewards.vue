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

import MDTokenLockupContract from '@/dapp/contracts/MDTokenLockup.json';
import getWeb3 from '@/dapp/utils/getWeb3';

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
  async created() {
    this.isLoading = true;

    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();

      const deployedNetwork = MDTokenLockupContract.networks[networkId];
      if (!deployedNetwork) {
        throw new Error(`No contract deployed on current network ${networkId}`);
      }

      const contract = new web3.eth.Contract(
        MDTokenLockupContract.abi,
        deployedNetwork.address,
      );

      // TODO: replace with correct contract method
      const response = await contract.methods
        .privateSaleTokenLockup(accounts[0])
        .call({ from: accounts[0] });
      console.log('response', response);
    } catch (error) {
      console.log('Failed to init Web3', error);
      this.openErrorPopup();
    }

    this.isLoading = false;
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

      if (isSuccessful) {
        this.openSuccessPopup();
      } else {
        this.openErrorPopup();
      }
    },
    openErrorPopup() {
      this.finishClaimingPopupTitle = this.$t(
        'message.earnMDT.dataPointReards.errorPopupTitle',
      );
      this.finishClaimingPopupDescription = this.$t(
        'message.earnMDT.dataPointReards.errorPopupDescription',
      );
      this.finishClaimingPopupImageSrc = '/static/dapp/claiming-error.jpg';
      this.finishClaimingPopupImageSrcset =
        '/static/dapp/claiming-error@2x.jpg 2x, /static/dapp/claiming-error@3x.jpg 3x';
      this.showFinishClaimingPopup = true;
    },
    openSuccessPopup() {
      this.finishClaimingPopupTitle = this.$t(
        'message.earnMDT.dataPointReards.successPopupTitle',
      );
      this.finishClaimingPopupDescription = this.$t(
        'message.earnMDT.dataPointReards.successPopupDescription',
      );
      this.finishClaimingPopupImageSrc = '/static/dapp/claiming-success.jpg';
      this.finishClaimingPopupImageSrcset =
        '/static/dapp/claiming-success@2x.jpg 2x, /static/dapp/claiming-success@3x.jpg 3x';
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
