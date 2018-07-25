<template>
  <div class="account-selector">
    <BaseField 
      :label="label" 
      class="selector-menu"
    >
      <md-menu 
        :md-offset-y="-60"
        md-size="auto" 
        md-full-width 
        md-close-on-select
        @md-opened="menuOpened" 
        @md-closed="menuClosed"
      >
        <!-- Button -->
        <md-button 
          :md-ripple="false" 
          :class="{ 'other': selectedOther, 'open': isMenuOpened }" 
          :md-menu-trigger="menuTrigger"
        >
          <div 
            :class="{ 'open': isMenuOpened }" 
            class="account-info"
          >
            <div 
              v-if="selectedAccount || selectedOther" 
              class="account-email"
            >
              {{ selectedAccountEmail }}
            </div>
            <div 
              v-if="selectedAccount" 
              class="account-balance"
            >
              {{ selectedAccountBalance }}
            </div>
            <div 
              v-if="!selectedAccount && !selectedOther" 
              class="placeholder"
            > {{ $t('message.transfer.select_account_placeholder') }} </div>
          </div>
          <md-icon 
            v-if="menuTrigger"
            v-show="!isMenuOpened" 
            :class="{ 'other': selectedOther }" 
            md-src="/static/icons/keyboard_arrow_down.svg"
          />
          <md-icon 
            v-if="menuTrigger"
            v-show="isMenuOpened" 
            :class="{ 'other': selectedOther }" 
            md-src="/static/icons/keyboard_arrow_up.svg"
          />
        </md-button>

        <!-- Content -->
        <md-menu-content>
          <AccountSelectorMenuItem
            v-if="!selectedOther && selectedAccount"
            :account="selectedAccount"
            :is-drawer-top-item="true"
          />
          <li class="account-selector-sub-menu">
            <ul class="account-selector-sub-menu-list">
              <template v-for="(account, index) in filteredAccounts">
                <md-divider
                  v-if="index > 0"
                  :key="`${account.emailAddress}-divider`"
                />
                <AccountSelectorMenuItem
                  :key="account.emailAddress" 
                  :selected="account.emailAddress === selectedAccountEmail"
                  :account="account"
                  @click="selectAccount(account)"
                />
              </template>
            </ul>
          </li>

          <!-- Other email address. Only show if the props  enableOther is true-->
          <md-menu-item 
            v-if="enableOther" 
            class="account-selector-other" 
            @click="selectOther()"
          >
            <div> {{ $t('message.transfer.other_emailaddress') }} </div>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

    </BaseField>
    <!-- Input field for user after pressed other email -->
    <BaseField 
      v-if="selectedOther" 
      :error="isEmailValid!=null && !isEmailValid && invalidEmailText"
      class="other-email" 
      md-dense 
      md-inline 
      md-clearable
    >
      <md-input 
        :value="otherEmailAddress" 
        :placeholder="$t('message.transfer.enter_emailaddress')"
        @change="onOtherEmailEntered($event.target.value)"
      />
    </BaseField>
  </div>

</template>

<script>
import BaseField from '@/components/input/BaseField';
import AccountSelectorMenuItem from '@/components/common/AccountSelectorMenuItem';
import { formatAmount } from '@/utils';

export default {
  components: {
    BaseField,
    AccountSelectorMenuItem,
  },
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
      default: null,
    },
    enableOther: {
      type: Boolean,
      default: false,
    },
    disableForSingleAccount: {
      type: Boolean,
      default: true,
    },
    isEmailValid: {
      type: Boolean,
      default: null,
    },
    invalidEmailText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isMenuOpened: false,
      selectedOther: false,
    };
  },
  computed: {
    otherEmailAddress() {
      if (!this.selectedAccount) {
        return '';
      }
      return this.selectedAccount.emailAddress;
    },
    selectedAccountEmail() {
      if (this.selectedOther) {
        return this.$t('message.transfer.other_emailaddress');
      }

      if (!this.selectedAccount) {
        return '';
      }

      const emailAddress = this.selectedAccount.emailAddress;
      return emailAddress;
    },
    selectedAccountBalance() {
      if (
        !this.selectedAccount ||
        this.selectedAccount.mdtBalance === undefined
      ) {
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
    menuTrigger() {
      if (
        this.disableForSingleAccount &&
        !this.enableOther &&
        this.accounts.length === 1
      ) {
        return false;
      }

      return true;
    },
  },
  created() {
    this.selectedOther = true;

    if (!this.selectedAccount) {
      this.selectedOther = false;
    }

    if (this.accounts && this.selectedAccount) {
      this.accounts.forEach(account => {
        if (account.emailAddress === this.selectedAccount.emailAddress) {
          this.selectedOther = false;
        }
      });
    }
  },
  methods: {
    selectAccount(account) {
      this.selectedOther = false;
      this.$emit('accountSelected', account);
    },
    selectOther() {
      this.selectedOther = true;
      this.$emit('otherSelected');
    },
    menuOpened() {
      this.isMenuOpened = true;
      this.$emit('menuOpened');
    },
    menuClosed() {
      this.isMenuOpened = false;
      this.$emit('menuClosed');
    },
    onOtherEmailEntered(value) {
      this.$emit('accountSelected', { emailAddress: value });
    },
    formatAmount,
  },
};
</script>

<style lang="scss" scoped>
$selectedEmailColor: $theme-color;
$menuItemCellHeight: 60px;
$menuItemOtherCellHeight: 44px;

.account-selector {
  margin: 0.4rem 0;
  min-height: 4.5rem;

  .selector-menu {
    margin: 0;
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
    height: $menuItemCellHeight;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0s;

    &.other {
      height: $menuItemOtherCellHeight;
    }

    /deep/ .md-button-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: padding 50ms;
    }

    /deep/ .md-ripple {
      padding: 0px;
    }

    .md-icon {
      height: 26px;

      &.other {
        margin-top: 9px;
      }

      /deep/ svg {
        fill: $selectedEmailColor;
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
  flex: 1;
  word-break: break-all;
  white-space: normal;

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
  background-color: $theme-listing-bgcolor;
  width: 100%;
  left: 0;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 0px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  -webkit-overflow-scrolling: touch;

  /deep/ .md-list {
    background-color: $theme-listing-bgcolor;
    border-radius: 0px 0px 4px 4px !important;
    padding: 0;
  }

  /deep/ .md-menu-content-container {
    overflow: hidden;

    .md-list {
      height: 100%;

      .account-selector-sub-menu {
        overflow: auto;
        border-top: solid 1px #eeeeee;

        .account-selector-sub-menu-list {
          list-style: none;
          padding: 0;
        }
      }

      .account-selector-other {
        box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.1);

        /deep/ .md-list-item-content {
          min-height: 40px;
          justify-content: flex-start;
        }
      }
    }
  }
}

.md-divider {
  height: 2px;
  background-color: #eeeeee;
}

.other-email {
  &.base-field {
    margin-top: -0.5rem;
  }
}
</style>
