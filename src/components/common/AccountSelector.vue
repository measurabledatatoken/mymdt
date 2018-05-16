<template>
  <div class="account-selector">
    <div class="label">{{ label }}</div>

    <md-menu md-size="auto" mdFullWidth mdCloseOnSelect mdAlignTrigger v-on:md-opened="menuOpened" v-on:md-closed="menuClosed">
      <md-button class="trigger" :md-ripple="false" v-bind:style="accountButtonStyle" md-menu-trigger>
        <div class="account-info" v-bind:style="{ 'padding-left': accountInfoPaddingLeft + 'px' }">
          <div class="account-email">
            {{ selectedAccountEmail }}
          </div>
          <div class="account-balance">
            {{ selectedAccountBalance }}
          </div>
          <div v-if="!selectedAccount" class="placeholder"> {{ $t('message.transfer.select_account_placeholder') }} </div>
        </div>
        <md-icon v-if="!isMenuOpened" class="closed" md-src="/static/icons/keyboard_arrow_down.svg"></md-icon>
        <md-icon v-if="isMenuOpened" class="opened" md-src="/static/icons/keyboard_arrow_up.svg"></md-icon>
      </md-button>

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
            <md-icon md-src="/static/icons/done.svg"></md-icon>
          </div>

        </md-menu-item>
      </md-menu-content>
    </md-menu>

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
    };
  },
  props: ['label', 'accounts', 'selectedAccount', 'enableOtherEmail'],
  computed: {
    selectedAccountEmail() {
      if (!this.selectedAccount) {
        return '';
      }
      const emailAddress = this.selectedAccount.emailAddress;
      return emailAddress;
    },
    selectedAccountBalance() {
      if (!this.selectedAccount) {
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


<style lang="scss" scoped>
$mdtAmountColor: #9b9b9b;
$selectedEmailColor: #4187f7;
.account-selector {
  height: 80px;
  margin: 20px 0px;
}

.label {
  text-align: left;
  margin: 8px 16px 0px 16px;
}

.md-menu {
  width: calc(100% - 32px);
  margin: 0px 16px;

  .md-button {
    width: 100%;
    margin-right: 24px;
  }

  .md-button:not([disabled]).md-focused:before,
  .md-button:not([disabled]):active:before,
  .md-button:not([disabled]):hover:before {
    background-color: white;
    opacity: 1;
  }

  .md-button .md-icon {
    width: 16%;
    transform: scale(0.6);
  }
}

.account-info {
  width: 70%;
  height: 52px;
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
    line-height: 52px;
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
  background-color: #f4f6f8;
  border-radius: 0px 0px 4px 4px;
  width: 100%;
  left: 0;
  max-height: 45vh;
  z-index: 9;
}

.md-divider {
  position: absolute;
  background-color: $divider-color;
  border: solid 1px #eeeeee;
  width: 96%;
  top: 0;
  left: 2%;
}

//Menu Item Style
.md-menu-item {
  .account-balance {
    font-size: 14px;
    color: $mdtAmountColor;
  }

  .account-email {
    color: #4a4a4a;

    &.selected {
      color: $selectedEmailColor;
    }
  }
}


.md-icon {
  float: right;
  height: 52px;
  fill: $selectedEmailColor;
}

.icon-container {
  flex: 1;
}
</style>


<style lang="scss">
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

.account-selector .md-button {
  height: 60px;
}
</style>
