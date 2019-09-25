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
      <md-list-item class="wallet-list-item">
        <span class="md-caption wallet-name">{{ $t("message.home.mailtimeWallet") }}</span>
        <md-button
          class="wallet-button"
          @click="$emit('clickMailtimeWallet')"
        >
          <div class="wallet-action">
            <span>{{ formatMDTAmount(user.mdtBalance) }}</span>
            <md-icon 
              md-src="/static/icons/setting-arrow-gray.svg"
            />
          </div>
        </md-button>
      </md-list-item>
      <md-divider />
      <md-list-item>
        <span class="md-caption wallet-name">{{ ethWalletTitle }}</span>
        <md-button
          v-if="hasAnyAddress"
          :disabled="disabled"
          class="wallet-button"
          @click="onETHWalletClick"
        >
          <div class="wallet-action">
            <span>{{ ethWalletAmount }}</span>
            <md-icon 
              md-src="/static/icons/setting-arrow-gray.svg"
            />
          </div>
        </md-button>
        <MDTMediumButton
          v-else
          :disabled="disabled"
          class="bind-button"
          @click="onBindingButtonClick"
        >
          <div class="bind-button-content">
            <img src="/static/icons/icon-bind.svg" >
            {{ $t("message.home.bindWallet") }}
          </div>
        </MDTMediumButton>
      </md-list-item>
    </md-list>
    <PinCodePopup
      :md-active.sync="showPinCode"
      :pin-setup-content="$t('message.ethBinding.pinSetupPopupDescription')"
      @codefilled="onPinCodeFilled"
    />
  </md-card>
</template>

<script>
import UserInfo from '@/components/common/UserInfo';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import PinCodePopup from '@/components/popup/PinCodePopup';

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
      if (this.user.smartContractPendingETHAddress) {
        return 'N/A';
      } else {
        // TODO: use correct property name after API is ready
        return this.formatMDTAmount(this.user.eth_wallet_balance);
      }
    },
    hasAnyAddress() {
      return (
        !!this.user.smartContractETHAddress ||
        !!this.user.smartContractPendingETHAddress
      );
    },
  },
  methods: {
    formatMDTAmount(amount) {
      return formatAmount(amount || 0, { suffix: ' MDT' });
    },
    onETHWalletClick() {
      if (!this.disabled) {
        // TODO
        this.$router.push({
          name: RouteDef.AccountDetail.name,
          params: {
            account_id: this.user.emailAddress,
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

  .wallet-button {
    height: 24px;
    margin: 0;
    min-width: auto;
  }

  .wallet-action {
    display: flex;
    align-items: center;
    line-height: 24px;
    font-size: 1rem;
    font-weight: bold;
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
  }
}
</style>
