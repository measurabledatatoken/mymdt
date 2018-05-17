<template>
    <div>
        <div class="label">{{ label }}</div>

        <md-field>
            <md-input :placeholder="$t('message.transfer.wallet_address_placeholder')" v-on:change="valueChanged($event.target.value)"
                :value="walletAddress">
            </md-input>
        </md-field>
    </div>

</template>

<script>
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
