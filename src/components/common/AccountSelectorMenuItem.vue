<template>
  <md-menu-item 
    :class="['menu-item-account', {
      'menu-item-account--single-line': account.mdtBalance === undefined || account.mdtBalance === null,
      'menu-item-account--selected': selected,
      'menu-item-account--drawer-top-item': isDrawerTopItem,
    }]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="menu-item-account-info">
      <div class="account-email">
        {{ account.emailAddress }}
      </div>
      <div 
        v-if="balanceText" 
        class="account-balance"
      >
        {{ balanceText }}
      </div>
    </div>
    <md-icon
      v-if="selected" 
      class="menu-item-account__icon"
      md-src="/static/icons/done.svg"
    />
    <md-icon
      v-if="isDrawerTopItem"
      class="menu-item-account__icon"
      md-src="/static/icons/keyboard_arrow_up.svg"
    />
  </md-menu-item>
</template>

<script>
import { formatAmount } from '@/utils';

export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    isDrawerTopItem: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    balanceText() {
      if (
        this.account.mdtBalance === undefined ||
        this.account.mdtBalance === null
      ) {
        return null;
      }

      return `${this.$t('message.transfer.amountlbl')}: ${formatAmount(
        this.account.mdtBalance,
      )} MDT`;
    },
  },
};
</script>

<style lang="scss" scoped>
$selectedEmailColor: $theme-color;
$menuItemCellHeight: 60px;
$menuItemOtherCellHeight: 44px;

//Menu Item Style
.menu-item-account {
  &.menu-item-account--selected,
  &.menu-item-account--drawer-top-item {
    .account-email {
      color: $selectedEmailColor !important;
    }
  }

  &.menu-item-account--drawer-top-item {
    background-color: white;
  }

  /deep/ .md-list-item-content {
    min-height: $menuItemCellHeight;
  }

  &.menu-item-account--single-line {
    /deep/ .md-list-item-content {
      min-height: $menuItemOtherCellHeight;
    }
  }

  .menu-item-account-info {
    flex: 1;
    word-break: break-all;
    white-space: normal;

    .account-balance {
      font-size: 14px;
      color: $mdtAmountColor;
    }

    .account-email {
      color: #4a4a4a;
    }
  }

  .menu-item-account__icon {
    /deep/ svg {
      fill: $selectedEmailColor;
    }
  }
}
</style>
