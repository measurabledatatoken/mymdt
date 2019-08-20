<template>
  <md-dialog 
    v-bind="$attrs" 
    :md-fullscreen="false"
    v-on="$listeners"
  >
    <div class="header">
      <img
        src="/static/icons/logo-trust-wallet-large.svg" 
        alt="Trust Wallet"
      >
      <md-button 
        class="md-icon-button" 
        @click="onClickCloseButton"
      >
        <md-icon md-src="/static/icons/close-white.svg"/>
      </md-button>
    </div>
    <md-dialog-title>{{ $t('message.dataPointRewards.trustWalletRequired') }}</md-dialog-title>
    <md-dialog-content>{{ $t('message.dataPointRewards.trustWalletDescription') }}</md-dialog-content>
    <md-dialog-actions>
      <WebViewLink
        :to="dappUrl"
        external
      >
        <MDTMediumButton>{{ $t('message.dataPointRewards.openTrustWallet') }}</MDTMediumButton>
      </WebViewLink>
    </md-dialog-actions>
  </md-dialog>
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
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dappUrl: process.env.VUE_APP_TRUST_WALLET_DAPP_URL,
    };
  },
  methods: {
    onClickCloseButton() {
      this.$emit('update:mdActive', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  border-radius: 8px;
  max-width: 100%;
  left: 1rem;
  right: 1rem;
  transform: translateY(-50%);
}

.header {
  padding: 1.5rem 1.5rem 0;
  text-align: center;
  background-color: #3375bb;
}

.md-icon-button {
  position: absolute;
  right: 16px;
  top: 16px;
  margin: 0;
}

.content {
  padding: 1.875rem 1.5rem 1rem;
}

.md-dialog-title {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.87);
}

.md-dialog-actions {
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;

  .md-button {
    flex: 1;
    font-weight: bold;
  }
}
</style>
