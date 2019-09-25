<template>
  <div class="card">
    <div class="card-header">
      <img 
        src="/static/icons/icon-update.svg"
        class="logo"
      >
      <span>{{ $t('message.dataPointRewards.updatingYourETHWalletAddress') }}</span>
    </div>
    <div class="card-info">
      <WalletAddressBlock :hash="user.smartContractETHAddress" />
      <div class="separator">
        <img src="/static/icons/icon-arrow-downward.svg">
      </div>
      <WalletAddressBlock :hash="user.smartContractPendingETHAddress" />
    </div>
  </div>
</template>

<script>
import WalletAddressBlock from '@/components/common/WalletAddressBlock';

export default {
  components: {
    WalletAddressBlock,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: $theme-color;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.logo {
  margin-right: 0.5rem;
}

.separator {
  margin: 0.5rem 0;
}

.card-info {
  padding: 1rem;
}
</style>
