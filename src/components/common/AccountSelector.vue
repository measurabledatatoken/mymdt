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
            <div>
              {{ account.emailAddress }}
            </div>
            <div>
              {{ `${$t('message.transfer.amountlbl')}: ${account.mdtBalance}` }} MDT
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
      return `${balance}MDT`;
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
.label {
  text-align: left;
  margin: 8px 16px;
}

.account-selector {
  height: 80px;
  margin: 20px 0px;
}

.md-menu {
  width: calc(100% - 32px);
  margin: 0px 16px;
}

.account-info {
  width: 70%;
  height: 52px;
  float: left;
}

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

.trigger .md-icon {
  width: 20%;
  transform: scale(0.6);
}

.md-icon {
  float: right;
  height: 52px;
  fill: #4187f7;
}

.account-email {
  color: #4187f7;
}

.account-balance {
  color: #9b9b9b;
}

.placeholder {
  color: #9b9b9b;
  line-height: 52px;
  font-size: 16px;
  text-align: left;
}

.account-email,
.account-balance {
  text-align: left;
  margin: 4px 0px;
}


.md-menu-content {
  background-color: #f4f6f8;
  border-radius: 0px 0px 4px 4px;
  width: 100%;
  left: 0;
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
.md-menu-item .icon-container {
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
