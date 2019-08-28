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
        :disabled="claimButtonDisabled || isProcessing"
        :unclaimed="unclaimed"
        :claimed="claimed"
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
        :link="finishClaimingPopupLink"
        :image-src="finishClaimingPopupImageSrc"
        :image-srcset="finishClaimingPopupImageSrcset"
        @update:mdActive="onUpdateMdActive"
      />
    </div>
    <img 
      src="/static/background/data-point-rewards-background.svg"
      class="footer-background"
    >
  </div>
</template>

<script>
// import lottie from 'lottie-web';

import ClaimMDTInDappCard from '@/components/common/ClaimMDTInDappCard';
import ClaimDataPointRewardsPopup from '@/components/popup/ClaimDataPointRewardsPopup';

import MDTDataRewardContract from '@/dapp/contracts/MDTDataReward.json';
import getWeb3 from '@/dapp/utils/getWeb3';

export default {
  components: {
    ClaimMDTInDappCard,
    ClaimDataPointRewardsPopup,
  },
  data() {
    return {
      mainAccount: '',
      contract: null,
      isLoading: false,
      isProcessing: false,
      showClaimingPopup: false,
      showFinishClaimingPopup: false,
      finishClaimingPopupTitle: '',
      finishClaimingPopupDescription: '',
      finishClaimingPopupLink: '',
      finishClaimingPopupImageSrc: '',
      finishClaimingPopupImageSrcset: '',
      unclaimed: 0,
      claimed: 0,
      claimButtonDisabled: true,
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

      const deployedNetwork = MDTDataRewardContract.networks[networkId];
      if (!deployedNetwork) {
        throw new Error(`No contract deployed on current network ${networkId}`);
      }

      const contract = new web3.eth.Contract(
        MDTDataRewardContract.abi,
        deployedNetwork.address,
      );

      this.contract = contract;
      this.mainAccount = accounts[0];

      await this.loadData();
    } catch (error) {
      console.log('Failed to init Web3', error);
      this.openErrorPopup();
    }

    this.isLoading = false;
  },
  methods: {
    async loadData() {
      if (this.contract) {
        const [
          claimableValue,
          totalTokensClaimed,
          canClaimRecord,
        ] = await Promise.all([
          this.contract.methods
            .getClaimableValue()
            .call({ from: this.mainAccount }),
          this.contract.methods
            .getTotalTokensClaimed()
            .call({ from: this.mainAccount }),
          this.contract.methods
            .canClaimReward()
            .call({ from: this.mainAccount }),
        ]);

        this.claimed = Number(totalTokensClaimed) / 1e18;
        this.unclaimed = Number(claimableValue) / 1e18;
        this.claimButtonDisabled = !canClaimRecord;
      }
    },
    async onClick() {
      this.isProcessing = true;

      // this.$nextTick(() => {
      //   lottie.loadAnimation({
      //     container: this.$refs.loading,
      //     renderer: 'svg',
      //     loop: true,
      //     autoplay: true,
      //     path: '/static/animation/mymdt-loading.json',
      //   });
      // });

      let isSuccessful = false;
      try {
        await this.contract.methods
          .claimReward()
          .send({ from: this.mainAccount }, params => {
            console.log('params', params);
            this.openProcessingPopup(params);
          });

        isSuccessful = true;
      } catch (error) {
        console.error('Cannot claim rewards: ', error);
      }

      // In case the pending popup is still showing
      if (this.showFinishClaimingPopup) {
        this.showFinishClaimingPopup = false;
        // wait for animation finish
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));
      }

      if (isSuccessful) {
        this.openSuccessPopup();
      } else {
        this.openErrorPopup();
      }

      this.isProcessing = false;
    },
    async onUpdateMdActive(mdActive) {
      if (!mdActive) {
        this.isLoading = true;
        try {
          await this.loadData();
        } catch (error) {
          console.error('Cannot reload data: ', error);
        }

        this.isLoading = false;
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
    openProcessingPopup(transactionHash) {
      this.finishClaimingPopupTitle = this.$t(
        'message.earnMDT.dataPointReards.processingPopupTitle',
      );
      if (typeof transactionHash === 'string') {
        this.finishClaimingPopupDescription = this.$t(
          'message.earnMDT.dataPointReards.processingPopupDescription1',
        );
        this.finishClaimingPopupLink = `https://etherscan.io/tx/${transactionHash}`;
      } else {
        this.finishClaimingPopupDescription = this.$t(
          'message.earnMDT.dataPointReards.processingPopupDescription2',
        );
      }
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
