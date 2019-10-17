<template>
  <div class="card">
    <div class="card-header">
      <div>
        <div 
          v-if="expanded"
          class="card-title card-title-expanded"
        >
          {{ cardTitle }}
        </div>
        <div 
          v-else
          class="card-title"
        >
          <img 
            src="/static/icons/logo-eth.svg"
            class="logo-small"
          >
          {{ cardTitle }}
        </div>
      </div>
      <transition name="logo">
        <img 
          v-if="expanded"
          src="/static/icons/logo-eth-gradient.svg"
          class="logo"
        >
      </transition>
    </div>
    <div :class="['card-info', { 'card-info-expanded': expanded }]">
      <div 
        @click="onCardClick"
      >
        <WalletAddressBlock 
          :hash="user.smartContractETHAddress"
          wallet-class="card-text"
        />
      </div>
      <div
        v-if="hasEditClickListener"
        class="edit-button"
        @click="$emit('editClick')"
      >
        <img src="/static/icons/icon-edit.svg">
      </div>
    </div>
    <div 
      v-if="showBalance && !!ethWalletAmount"
      class="balance"
    >
      <div class="card-text balance-title">{{ $t('message.home.total_balance') }}</div>
      <div class="balance-amount">{{ ethWalletAmount }}</div>
    </div>
    <transition name="footer">
      <div 
        v-if="expanded"
        class="card-footer"
      >
        <span class="card-text">{{ displayName }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import WalletAddressBlock from '@/components/common/WalletAddressBlock';

import { FETCH_BALANCE } from '@/store/modules/ethWallet';
import { GET_BALANCE } from '@/store/modules/entities/ethWallet';

import { formatAmount } from '@/utils';

export default {
  components: {
    WalletAddressBlock,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    showBalance: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ethAddress: '0x2136602B4f3d24638cE7CFE21312AfC7221F2EeA',
      expanded: false,
    };
  },
  computed: {
    ...mapGetters({
      getBalance: GET_BALANCE,
    }),
    hashes() {
      const hashes = [];
      for (
        let index = 2;
        index < this.user.smartContractETHAddress.length;
        index += 4
      ) {
        hashes.push(this.user.smartContractETHAddress.slice(index, index + 4));
      }

      return hashes;
    },
    cardTitle() {
      return this.expanded
        ? 'Ethereum'
        : this.$t('message.dataPointRewards.ethWalletBound');
    },
    displayName() {
      if (!this.user.displayName) {
        return this.user.emailAddress;
      }
      return this.user.displayName;
    },
    hasEditClickListener() {
      return this.$listeners && this.$listeners.editClick;
    },
    ethWalletAmount() {
      if (!this.user.smartContractETHAddress) {
        return '';
      }

      const balanceInStr = this.getBalance(this.user.smartContractETHAddress);
      return `${balanceInStr || '0'} MDT`;
    },
  },
  mounted() {
    if (this.user.smartContractETHAddress) {
      this.fetchBalance(this.user.smartContractETHAddress);
    }
  },
  methods: {
    ...mapActions({
      fetchBalance: FETCH_BALANCE,
    }),
    onCardClick() {
      if (!this.compact) {
        this.expanded = !this.expanded;
      }
    },
    formatMDTAmount(amount) {
      return formatAmount(amount || 0, { suffix: ' MDT' });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0.5rem;
  padding: 1rem 2rem 1.5rem 1.5rem;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25), 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-image: linear-gradient(
      329deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.25)
    ),
    linear-gradient(120deg, #38365f 200px, #1a1931 100px);
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.logo {
  height: 71px;
}

.logo-small {
  margin-right: 0.5rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
}

.card-title-expanded {
  display: inline; // require for safari https://stackoverflow.com/questions/44963978/safari-on-ios-not-displaying-text-when-using-background-clip-and-text-fill-color
  background-image: linear-gradient(124deg, #bbccef, #ffffff 44%, #e6b5e6);
  font-size: 1.5rem;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.96px;
  color: transparent;
  background-clip: text;
  align-items: flex-start;
}

.card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
  transition: margin 0.5s;

  &.card-info-expanded {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
}

.card-text {
  font-weight: 600;
  color: #b4c4e6;
}

.hash {
  font-weight: 600;
  color: #b4c4e6;
}

.edit-button {
  width: 24px;
  height: 24px;
  border: solid 0.5px #b4c4e6;
  border-radius: 12px;
  cursor: pointer;
}

.card-footer {
  text-align: left;
  height: 1.25rem;
}

.name {
  font-size: 0.875rem;
}

.balance {
  margin-top: 1.5rem;

  .balance-title {
    text-transform: uppercase;
    text-align: left;
  }

  .balance-amount {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: normal;
    text-align: right;
    color: #ffffff;
  }
}

.logo-enter-active,
.logo-leave-active {
  transition: height 0.5s;
}
.logo-enter,
.logo-leave-to {
  height: 0;
}

.footer-enter-active,
.footer-leave-active {
  transition: height 0.1s;
}
.footer-enter,
.footer-leave-to {
  height: 0;
}
</style>
