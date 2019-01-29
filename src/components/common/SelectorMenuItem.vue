<template>
  <md-menu-item 
    :class="['menu-item', {
      'menu-item--single-line': !primaryText || !secondaryText,
      'menu-item--selected': selected,
      'menu-item--drawer-top-item': isDrawerTopItem,
    }]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="menu-item-info">
      <div 
        v-if="primaryText" 
        class="primary-text"
      >
        {{ primaryText }}
      </div>
      <div 
        v-if="secondaryText" 
        class="secondary-text"
      >
        {{ secondaryText }}
      </div>
    </div>
    <md-icon
      v-if="selected" 
      class="menu-item__icon"
      md-src="/static/icons/done.svg"
    />
    <md-icon
      v-if="isDrawerTopItem"
      class="menu-item__icon"
      md-src="/static/icons/keyboard_arrow_up.svg"
    />
  </md-menu-item>
</template>

<script>
// import { formatAmount } from '@/utils';

export default {
  props: {
    primaryText: {
      type: String,
      default: null,
    },
    secondaryText: {
      type: String,
      default: null,
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
  // computed: {
  //   balanceText() {
  //     if (
  //       this.account.mdtBalance === undefined ||
  //       this.account.mdtBalance === null
  //     ) {
  //       return null;
  //     }

  //     return `${this.$t('message.transfer.amountlbl')}: ${formatAmount(
  //       this.account.mdtBalance,
  //     )} MDT`;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
$selectedColor: $theme-color;
$menuItemCellHeight: 60px;
$menuItemOtherCellHeight: 44px;

//Menu Item Style
.menu-item {
  &.menu-item--selected,
  &.menu-item--drawer-top-item {
    .primary-text {
      color: $selectedColor !important;
    }
  }

  &.menu-item--drawer-top-item {
    background-color: white;
  }

  /deep/ .md-list-item-content {
    min-height: $menuItemCellHeight;
  }

  &.menu-item--single-line {
    /deep/ .md-list-item-content {
      min-height: $menuItemOtherCellHeight;
    }
  }

  .menu-item-info {
    flex: 1;
    word-break: break-all;
    white-space: normal;

    .secondary-text {
      font-size: 14px;
      color: $mdtAmountColor;
    }

    .primary-text {
      color: #4a4a4a;
    }
  }

  .menu-item__icon {
    /deep/ svg {
      fill: $selectedColor;
    }
  }
}
</style>
