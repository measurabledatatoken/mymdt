<template>
  <div>
    <div class="label">{{ label }}</div>

    <md-field>
      <md-textarea md-autogrow :placeholder="$t('message.transfer.wallet_address_placeholder')" v-on:change="valueChanged($event.target.value)"
        :value="walletAddress">
      </md-textarea>
      <md-button :to="RouteDef.TransferEthWalletQrCode">
        <md-icon md-src="/static/icons/qr-blue.svg"></md-icon>
      </md-button>
      <span v-if="!isAddressValid" class="md-helper-text">{{ $t('message.qrcode.eth_address_invalid') }}</span>
    </md-field>

  </div>

</template>

<script>
import { getEthAddressFromString } from '@/utils';
import { RouteDef } from '@/constants';

export default {
  name: 'WalletAddressField',
  props: {
    label: {
      type: String,
      default: '',
    },
    walletAddress: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      RouteDef,
      isAddressValid: true,
    };
  },
  mounted() {
    const ethAddress = getEthAddressFromString(this.walletAddress);
    if (ethAddress == null) {
      this.isAddressValid = false;
      this.$emit('walletAddressInvalid', ethAddress);
    } else {
      this.isAddressValid = true;
      this.$emit('walletAddressEntered', ethAddress);
    }
  },
  methods: {
    valueChanged(value) {
      const ethAddress = getEthAddressFromString(value);
      if (ethAddress == null) {
        this.isAddressValid = false;
        this.$emit('walletAddressInvalid', value);
      } else {
        this.isAddressValid = true;
        this.$emit('walletAddressEntered', value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  text-align: left;
  font-weight: bold;
  margin: 16px $transferMarginLeftRight 10px $transferMarginLeftRight;
  color: $label-color;
}

.md-field {
  width: calc(100% - #{2 * $transferMarginLeftRight});
  margin-left: $transferMarginLeftRight;
  min-height: 32px;
  padding-top: 0px;

  .md-button {
    min-width: 0;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .md-helper-text {
    color: red;
  }
}
</style>
