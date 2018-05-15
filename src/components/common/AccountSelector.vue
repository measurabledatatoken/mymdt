<template>
    <div class="account-selector">
        <div class="label">{{ label }}</div>

        <md-menu md-size="auto" mdFullWidth mdCloseOnSelect>
            <md-button md-menu-trigger>
                <div class="account-info">
                    <div class="account-email">
                        {{ selectedAccountEmail }}
                    </div>
                    <div class="account-balance">
                        {{ selectedAccountBalance }} MDT
                    </div>
                </div>
                <md-icon md-src="/static/icons/keyboard_arrow_down.svg"></md-icon>

            </md-button>
            <md-menu-content>
                <md-menu-item @click="selectAccount(account)" v-for="account in filteredAccounts" :key="account.emailAddress">
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
  props: ['label', 'accounts', 'selectedAccount'],
  computed: {
    selectedAccountEmail() {
      if (this.selectedAccount !== undefined) {
        const emailAddress = this.selectedAccount.emailAddress;
        return emailAddress;
      }
      return '';
    },
    selectedAccountBalance() {
      if (this.selectedAccount !== undefined) {
        const balance = this.selectedAccount.mdtBalance;
        return balance;
      }
      return '';
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
  },
};
</script>


<style lang="scss" scoped>
.label {
  text-align: left;
  margin: 16px;
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

.md-icon {
  height: 52px;
  fill: #4187f7;
}

.account-email {
  color: #4187f7;
}

.account-balance {
  color: #9b9b9b;
}

.account-email,
.account-balance {
  text-align: left;
  margin: 4px 0px;
}

.md-icon {
  float: right;
}

.account-selector {
  height: 80px;
  margin-top: 16px;
}

.md-menu-content {
  background-color: #f4f6f8;
  width: 100%;
  left: 0;
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
</style>
