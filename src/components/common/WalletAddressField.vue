<template>
  <BaseField
    :label="label"
    :error="!isAddressValid && $t('message.qrcode.eth_address_invalid')"
  >
    <md-textarea 
      :placeholder="placeholder || $t('message.transfer.wallet_address_placeholder')" 
      v-model="walletAddress"
      md-autogrow
    />
    <!-- <md-button class="md-icon-button" :to="RouteDef.TransferEthWalletQrCode.path">
      <md-icon md-src="/static/icons/qr-blue.svg"></md-icon>
    </md-button> -->
  </BaseField>
</template>

<script>
import BaseField from '@/components/input/BaseField';
import { getEthAddressFromString } from '@/utils';
import { RouteDef } from '@/constants';

export default {
  components: {
    BaseField,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    initWalletAddress: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      RouteDef,
      isAddressValid: true,
      walletAddress: this.initWalletAddress,
    };
  },
  watch: {
    walletAddress(newValue) {
      const ethAddress = getEthAddressFromString(newValue);
      if (ethAddress == null) {
        this.isAddressValid = false;
        this.$emit('walletAddressInvalid', newValue);
      } else {
        this.isAddressValid = true;
        this.$emit('walletAddressEntered', newValue);
      }
    },
  },
  methods: {
    valueChanged(value) {
      this.walletAddress = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-field {
  min-height: 5rem;
}

.md-icon-button {
  height: 36px;
}
</style>
