<template>
  <md-card :md-with-hover="hover">
    <div 
      class="md-card-header" 
      @click="$emit('clickMailtimeWallet')"
    >
      <UserInfo 
        :user="user"
        :disabled="disabled"
        :show-mdt="false"
      />
    </div>
    <md-list :class="['wallet-list', { 'wallet-list-disabled': disabled }]">
      <md-list-item
        class="wallet-list-item"
        @click="$emit('clickMailtimeWallet')"
      >
        <span class="md-caption wallet-name">{{ $t("message.home.mailtimeWallet") }}</span>
        <div class="wallet-action">
          <span>{{ formatMDTAmount(user.mdtBalance) }}</span>
          <md-icon 
            md-src="/static/icons/setting-arrow-gray.svg"
          />
        </div>
      </md-list-item>
      <md-divider />
      <md-list-item 
        :disabled="!hasAnyAddress"
        @click="hasAnyAddress ? onETHWalletClick() : null"
      >
        <span class="md-caption wallet-name">{{ ethWalletTitle }}</span>
        <div
          v-if="hasAnyAddress"
          class="wallet-action"
        >
          <span>{{ ethWalletAmount }}</span>
          <md-icon 
            md-src="/static/icons/setting-arrow-gray.svg"
          />
        </div>
        <MDTMediumButton
          v-else
          :disabled="disabled"
          class="bind-button"
          @click="onBindingButtonClick"
        >
          <div class="bind-button-content">
            <img
              class="bind-button-icon"
              src="/static/icons/icon-bind.svg"
            >
            {{ $t("message.home.bindWallet") }}
          </div>
        </MDTMediumButton>
      </md-list-item>
    </md-list>
    <PinCodePopup
      :user="user"
      :md-active.sync="showPinCode"
      :pin-setup-content="$t('message.ethBinding.pinSetupPopupDescription')"
      @codefilled="onPinCodeFilled"
    />
  </md-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import UserInfo from '@/components/common/UserInfo';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import PinCodePopup from '@/components/popup/PinCodePopup';

import { FETCH_BALANCE } from '@/store/modules/ethWallet';
import { GET_BALANCE } from '@/store/modules/entities/ethWallet';

import { formatAmount } from '@/utils';

import { RouteDef } from '@/constants';

export default {
  components: {
    UserInfo,
    MDTSubtleButton,
    MDTMediumButton,
    PinCodePopup,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    hover: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPinCode: false,
    };
  },
  computed: {
    ...mapGetters({
      getBalance: GET_BALANCE,
    }),
    ethWalletTitle() {
      if (this.user.smartContractPendingETHAddress) {
        return this.$t('message.home.ethWalletUpdating');
      } else if (this.user.smartContractETHAddress) {
        return this.$t('message.home.ethWalletWithHash', {
          hash: this.user.smartContractETHAddress.slice(-4),
        });
      } else {
        return this.$t('message.home.ethWallet');
      }
    },
    ethWalletAmount() {
      if (
        this.user.smartContractPendingETHAddress ||
        !this.user.smartContractETHAddress
      ) {
        return 'N/A';
      } else {
        const balanceInStr = this.getBalance(this.user.smartContractETHAddress);
        return `${balanceInStr || '0'} MDT`;
      }
    },
    hasAnyAddress() {
      return (
        !!this.user.smartContractETHAddress ||
        !!this.user.smartContractPendingETHAddress
      );
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
    formatMDTAmount(amount) {
      return formatAmount(amount || 0, { suffix: ' MDT' });
    },
    onETHWalletClick() {
      if (!this.disabled) {
        this.$router.push({
          name: RouteDef.ETHWalletDetail.name,
          params: {
            wallet_address: this.user.smartContractETHAddress,
          },
        });
      }
    },
    onBindingButtonClick() {
      this.showPinCode = true;
    },
    onPinCodeFilled() {
      this.$router.push({
        name: RouteDef.ETHBinding.name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin: 0.5em;
  z-index: initial;
}

.wallet-list {
  border-radius: inherit;
  padding: 0 0 0 calc(40px + 1rem);

  &.wallet-list-disabled {
    opacity: 0.6;
  }

  /deep/ .md-list-item-content {
    padding-right: 0.5rem;
  }

  .wallet-name {
    color: $primary-text-color;
    font-weight: bold;
  }

  .wallet-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 24px;
    font-size: 1rem;
    font-weight: bold;
    text-align: right;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    flex: 1;
    margin-left: 0.5rem;
  }

  .bind-button.medium-button {
    height: 2rem;
    text-transform: none;

    /deep/ .md-ripple {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .bind-button-content {
    display: flex;
    align-items: center;

    .bind-button-icon {
      width: 1rem;
      height: 1rem;
      margin-right: 0.25rem;
    }
  }
}
</style>
