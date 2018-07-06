<template>
  <div class="account-selector">
    <BaseField :label="label" class="selector-menu">
      <md-menu md-size="auto" mdFullWidth mdCloseOnSelect mdAlignTrigger v-on:md-opened="menuOpened" v-on:md-closed="menuClosed">
        <!-- Button -->
        <md-button :md-ripple="false" v-bind:class="{ 'open': isMenuOpened }" md-menu-trigger>
          <div class="account-info" v-bind:class="{ 'other': selectedOther, 'open': isMenuOpened }">
            <div v-if="selectedAccount" class="account-email">
              {{ selectedAccountEmail }}
            </div>
            <div v-if="selectedAccount" class="account-balance">
              {{ selectedAccountBalance }}
            </div>
            <div v-if="!selectedAccount" class="placeholder"> {{ $t('message.transfer.select_account_placeholder') }} </div>
          </div>
          <md-icon v-show="!isMenuOpened" v-bind:class="{ 'other': selectedOther }" md-src="/static/icons/keyboard_arrow_down.svg">
          </md-icon>
          <md-icon v-show="isMenuOpened" v-bind:class="{ 'other': selectedOther }" md-src="/static/icons/keyboard_arrow_up.svg">
          </md-icon>
        </md-button>

        <!-- Content -->
        <md-menu-content>
          <md-menu-item @click="selectAccount(account)" v-for="account in filteredAccounts" :key="account.emailAddress">
            <md-divider></md-divider>
            <div>
              <div class="account-email" v-bind:class="{ 'selected' : account.emailAddress === selectedAccountEmail }">
                {{ account.emailAddress }}
              </div>
              <div class="account-balance" v-if="account.mdtBalance != undefined">
                {{ `${$t('message.transfer.amountlbl')}: ${formatAmount(account.mdtBalance)}` }} MDT
              </div>
            </div>
            <div v-if="account.emailAddress === selectedAccountEmail" class="icon-container">
              <md-icon md-src="/static/icons/done.svg"></md-icon>
            </div>

          </md-menu-item>

          <!-- Other email address. Only show if the props  enableOther is true-->
          <md-menu-item class="other" v-if="enableOther" @click="selectOther()">
            <md-divider></md-divider>
            <div> {{ $t('message.transfer.other_emailaddress') }} </div>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

    </BaseField>
    <!-- Input field for user after pressed other email -->
    <BaseField class="other-email" v-if="selectedOther" md-dense md-inline md-clearable>
      <md-input v-model="otherEmailAddress" :placeholder="$t('message.transfer.enter_emailaddress')"></md-input>
    </BaseField>
  </div>

</template>

<script>
import BaseField from '@/components/input/BaseField';
import { formatAmount } from '@/utils';

export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    accounts: {
      type: Array,
      required: true,
    },
    selectedAccount: {
      type: Object,
    },
    enableOther: {
      type: Boolean,
    },
  },
  data() {
    return {
      isMenuOpened: false,
      selectedOther: false,
    };
  },
  computed: {
    otherEmailAddress: {
      get() {
        if (!this.selectedAccount) {
          return '';
        }
        return this.selectedAccount.emailAddress;
      },
      set(value) {
        this.$emit('accountSelected', { emailAddress: value });
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
      if (!this.selectedAccount || this.selectedAccount.mdtBalance === undefined) {
        return '';
      }

      if (this.selectedOther) {
        return '';
      }
      const balance = this.selectedAccount.mdtBalance;
      const balanceStr = formatAmount(balance);
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
    },
    menuClosed() {
      this.isMenuOpened = false;
    },
    formatAmount,
  },
  created() {
    this.selectedOther = true;

    if (!this.selectedAccount) {
      this.selectedOther = false;
    }

    if (this.accounts && this.selectedAccount) {
      this.accounts.forEach((account) => {
        if (account.emailAddress === this.selectedAccount.emailAddress) {
          this.selectedOther = false;
        }
      });
    }
  },
  components: {
    BaseField,
  },
};
</script>

<style lang="scss" scoped>
$selectedEmailColor: $theme-color;
$menuItemCellHeight: 56px;
$menuItemOtherCellHeight: 44px;

.account-selector {
  margin: 0.5rem 0;

  .selector-menu {
    /deep/ .md-field {
      margin-bottom: 0px;

      &::after {
        display: none;
      }
    }
  }
}

.md-menu {
  width: 100%;

  .md-button {
    width: 100%;
    height: 100%;

    &.open {
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      border-radius: 4px 4px 0px 0px;
      background-color: white;
    }

    /deep/ .md-button-content {
      width: 100%;
    }

    /deep/ .md-ripple {
      padding: 0px;
    }

    .md-icon {
      width: 16%;
      height: 26px;
      margin-top: 13px;

      &.other {
        margin-top: 9px;
      }
    }
  }

  .md-button:not([disabled]).md-focused:before,
  .md-button:not([disabled]):active:before,
  .md-button:not([disabled]):hover:before {
    background-color: white;
    opacity: 1;
  }
}

.account-info {
  width: 70%;
  height: 100%;
  height: $menuItemCellHeight;
  float: left;

  &.open {
    padding-left: 16px;
  }

  &.other {
    padding-top: 7px;
    height: $menuItemOtherCellHeight;
  }

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
    line-height: $menuItemCellHeight;
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
  z-index: 9;

  /deep/ .md-list {
    background-color: $theme-listing-bgcolor;
    border-radius: 0px 0px 4px 4px !important;
  }
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
    height: $menuItemOtherCellHeight;
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

.md-button,
.md-menu-item {
  /deep/ .md-icon {
    float: right;
    height: 100%;

    svg {
      fill: $selectedEmailColor;
    }
  }
}

.icon-container {
  flex: 1;
}

.other-email {
  &.base-field {
    margin-top: -0.5rem;
  }
}
</style>

