<template>
  <BaseUserSettingPage>
    <template slot="content">
      <WalletAddressField 
        :init-wallet-address="selectedUser.smartContractETHAddress"
        label="ETH wallet address"
        placeholder="0x"
        @walletAddressEntered="walletAddressEntered"
        @walletAddressInvalid="walletAddressInvalid"
      />
      <p class="description">{{ $t('message.settings.mymdtWouldNotVerify') }}</p>
      <MDTPrimaryButton 
        :disabled="!isWalletAddressValid"
        @click="onDoneClick"
      >
        {{ $t('message.common.submit') }}
      </MDTPrimaryButton>
    </template>
  </BaseUserSettingPage>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import WalletAddressField from '@/components/common/WalletAddressField';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import PaddedContainer from '@/components/containers/PaddedContainer';

import BasePage from '@/screens/BasePage';

import { SET_ETH_ADDRESS } from '@/store/modules/ethBinding';

export default {
  components: {
    BaseUserSettingPage,
    WalletAddressField,
    MDTPrimaryButton,
    PaddedContainer,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.ethWalletBinding'),
    };
  },
  data() {
    return {
      isWalletAddressValid: false,
      walletAddress: '',
    };
  },
  computed: {
    ...mapState({
      pin: state => state.security.pin,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
    }),
  },
  methods: {
    walletAddressEntered(value) {
      this.isWalletAddressValid = true;
      this.walletAddress = value;
    },
    walletAddressInvalid() {
      this.isWalletAddressValid = false;
    },
    async onDoneClick() {
      const result = await this.$store.dispatch(SET_ETH_ADDRESS, {
        pin: this.pin,
        eth_address: this.walletAddress,
      });
      if (result) {
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.description {
  font-size: 0.75rem;
  line-height: normal;
  color: #8f8f8f;
  text-align: left;
}
</style>
