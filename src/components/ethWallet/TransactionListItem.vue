<template>
  <md-list-item 
    v-bind="$attrs" 
    v-on="$listeners"
  >
    <div class="item-info">
      <span class="title">
        {{ title }}
      </span>
      <WalletAddressBlock
        :hash="address"
        class="wallet-address"
      />
      <span class="description">{{ dateDescription }}</span>
    </div>
    <div class="action">
      <span>{{ amount }}</span>
    </div>
  </md-list-item>
</template>

<script>
import WalletAddressBlock from '@/components/common/WalletAddressBlock';

export default {
  components: {
    WalletAddressBlock,
  },
  props: {
    transaction: {
      type: Object,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    title() {
      return this.transaction.is_transfer_in
        ? this.$t('message.ethWallet.transferFrom')
        : this.$t('message.ethWallet.transferTo');
    },
    address() {
      return this.transaction.is_transfer_in
        ? this.transaction.from
        : this.transaction.to;
    },
    amount() {
      return `${this.transaction.value} MDT`;
    },
    dateDescription() {
      if (!this.transaction.timestamp) {
        return '';
      }

      return this.$d(new Date(this.transaction.timestamp * 1000), 'long');
    },
  },
};
</script>

<style lang="scss" scoped>
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  color: var(
    --md-theme-default-text-primary-on-background,
    rgba(0, 0, 0, 0.87)
  );
}

.wallet-address {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.description {
  font-size: 12px;
  color: $secondary-text-color;
}

.action {
  margin-left: 16px;
  color: $label-color;
  font-weight: bold;
  text-align: right;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  flex: 1;
}
</style>
