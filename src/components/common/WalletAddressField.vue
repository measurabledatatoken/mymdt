<template>
    <div>
        <div class="label">{{ label }}</div>

        <md-field>
            <md-input :placeholder="$t('message.transfer.wallet_address_placeholder')" v-on:change="valueChanged($event.target.value)"
                :value="walletAddress">
            </md-input>
            <md-button :to="RouteDef.TransferEthWalletQrCode">
                <md-icon md-src="/static/icons/qr-blue.svg"></md-icon>
            </md-button>
        </md-field>

    </div>

</template>

<script>
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
    };
  },
  methods: {
    valueChanged(value) {
      this.$emit('walletAddressEntered', value);
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
}
</style>
