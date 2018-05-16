<template>
  <div class="account-selector">
    <div class="label">{{ label }}</div>

    <md-menu md-size="auto" mdFullWidth mdCloseOnSelect mdAlignTrigger v-on:md-opened="menuOpened" v-on:md-closed="menuClosed">
      <!-- Button -->
      <md-button class="open-menu-button" :md-ripple="false" v-bind:style="accountButtonStyle" md-menu-trigger>
        <div class="account-info" v-bind:style="{ 'padding-left': accountInfoPaddingLeft + 'px' }">
          <div class="account-email">
            {{ selectedAccountEmail }}
          </div>
          <div class="account-balance">
            {{ selectedAccountBalance }}
          </div>
          <div v-if="!selectedAccount" class="placeholder"> {{ $t('message.transfer.select_account_placeholder') }} </div>
        </div>
        <md-icon v-if="!isMenuOpened" v-bind:class="{ 'other': selectedOther }" class="closed" md-src="/static/icons/keyboard_arrow_down.svg">
        </md-icon>
        <md-icon v-if="isMenuOpened" v-bind:class="{ 'other': selectedOther }" class="opened" md-src="/static/icons/keyboard_arrow_up.svg">
        </md-icon>
      </md-button>

      <!-- Content -->
      <md-menu-content class="account-selector-menu-content">
        <md-menu-item @click="selectAccount(account)" v-for="account in filteredAccounts" :key="account.emailAddress">
          <md-divider></md-divider>
          <div>
            <div class="account-email" v-bind:class="{ 'selected' : account.emailAddress === selectedAccountEmail }">
              {{ account.emailAddress }}
            </div>
            <div class="account-balance">
              {{ `${$t('message.transfer.amountlbl')}: ${parseFloat(account.mdtBalance).toFixed(4)}` }} MDT
            </div>
          </div>
          <div v-if="account.emailAddress === selectedAccountEmail" class="icon-container">
            <md-icon class="done" md-src="/static/icons/done.svg"></md-icon>
          </div>

        </md-menu-item>

        <!-- Other email address. Only show if the props  enableOther is true-->
        <md-menu-item class="other" v-if="enableOther" @click="selectOther()">
          <md-divider></md-divider>
          <div> {{ $t('message.transfer.other_emailaddress') }} </div>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <!-- Input field for user after pressed other email -->
    <md-field class="other-email" v-if="selectedOther" md-dense md-inline md-clearable>
      <label>{{ $t('message.transfer.enter_emailaddress') }}</label>
      <md-input v-model="otherEmailAddress"></md-input>
    </md-field>
  </div>

</template>

<script>
export default {
  name: 'AccountSelector',
  data() {
    return {
      isMenuOpened: false,
      accountInfoPaddingLeft: 0,
      accountButtonStyle: '',
      selectedOther: false,
    };
  },
  props: ['label', 'accounts', 'selectedAccount', 'enableOther'],
  computed: {
    otherEmailAddress: {
      set(value) {
        this.$emit('accountSelected', { emailAddress: value, mdtBalance: 0 });
      },
    },
    selectedAccountEmail() {
      if (!this.selectedAccount) {
        return '';
      }

      if (this.selectedOther) {
        return this.$t('message.transfer.other_emailaddress');
      }
      const emailAddress = this.selectedAccount.emailAddress;
      return emailAddress;
    },
    selectedAccountBalance() {
      if (!this.selectedAccount) {
        return '';
      }

      if (this.selectedOther) {
        return '';
      }
      const balance = this.selectedAccount.mdtBalance;
      const balanceStr = parseFloat(balance.toFixed(4));
      return `${balanceStr} MDT`;
    },
    filteredAccounts() {
      if (this.accounts === undefined) {
        return [];
      }

      return this.accounts;
    },
  },
  methods: {
    selectAccount(account) {
      this.$emit('accountSelected', account);
      this.selectedOther = false;
    },
    selectOther() {
      this.selectedOther = true;
    },
    menuOpened() {
      this.isMenuOpened = true;
      this.accountInfoPaddingLeft = 16;
      this.accountButtonStyle = 'box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2); border-radius: 4px 4px 0px 0px; background-color: white;';
    },
    menuClosed() {
      this.isMenuOpened = false;
      this.accountInfoPaddingLeft = 0;
      this.accountButtonStyle = '';
    },
  },
};
</script>


<style lang="scss">
$mdtAmountColor: #9b9b9b;
$selectedEmailColor: #4187f7;

.account-selector .md-ripple,
.account-selector .md-button-content {
  width: 100%;
}

.account-selector .md-ripple {
  padding: 0px;
}

.account-selector-menu-content .md-menu-content-container .md-list {
  padding: 0px;
}

.account-selector .open-menu-button {
  height: 100%;
}

.md-icon.md-theme-default.md-icon-image svg {
  fill: $selectedEmailColor;
}

.md-list.md-theme-default {
  background-color: #f4f6f8;
  border-radius: 0px 0px 4px 4px !important;
}
</style>


<style lang="scss" scoped>
$mdtAmountColor: #9b9b9b;
$selectedEmailColor: #4187f7;
$menuItemCellHeight: 56px;
$marginLeftRight: 16px;

.account-selector {
  height: 80px;
  margin: 16px 0px;
}

.label {
  text-align: left;
  margin: 8px $marginLeftRight 0px $marginLeftRight;
}

.md-menu {
  width: calc(100% - 2 *#{$marginLeftRight});
  margin: 0px $marginLeftRight;

  .md-button {
    width: 100%;
  }

  .md-button:not([disabled]).md-focused:before,
  .md-button:not([disabled]):active:before,
  .md-button:not([disabled]):hover:before {
    background-color: white;
    opacity: 1;
  }

  .md-button .md-icon {
    width: 16%;
    height: 26px;
    margin-top: 13px;
  }

  .md-button .md-icon.other {
    margin-top: 0px;
  }
}

.account-info {
  width: 70%;
  height: 100%;
  float: left;

  .account-email {
    color: $selectedEmailColor;
    text-transform: none;
    font-size: 16px;
  }

  .account-balance {
    color: $mdtAmountColor;
  }

  .placeholder {
    color: $mdtAmountColor;
    line-height: 100%;
    font-size: 16px;
    text-align: left;
  }

  .account-email,
  .account-balance {
    text-align: left;
    margin: 4px 0px;
  }
}

.md-menu-content {
  border-radius: 0px 0px 4px 4px !important;
  width: 100%;
  left: 0;
  max-height: 45vh;
  z-index: 9;
}

.md-divider {
  position: absolute;
  background-color: transparent;
  border: solid 1px #eeeeee;
  width: 96%;
  top: -1px;
  left: 2%;
}

//Menu Item Style
.md-menu-item {
  height: $menuItemCellHeight;
  &.other {
    height: 48px;
  }

  .account-balance {
    font-size: 14px;
    color: $mdtAmountColor;
  }

  .account-email {
    color: #4a4a4a;

    &.selected {
      color: $selectedEmailColor !important;
    }
  }
}

.closed,
.opened,
.done {
  float: right;
  height: 100%;
}

.icon-container {
  flex: 1;
}

.other-email {
  margin: -20px $marginLeftRight;
  width: calc(100% - 2 * #{$marginLeftRight});

  .md-button {
    right: 12px;
  }
}
</style>

