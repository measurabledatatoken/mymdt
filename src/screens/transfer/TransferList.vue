<template>
  <div class="transfer-list-screen">
    <div class="account">
      <AccountSelector 
        :accounts="allUsers" 
        :selected-account="transferFromAccount" 
        @accountSelected="onAccountSelected"
      />
    </div>
    <div class="action-card-list">
      <ActionCard 
        :title="$t('message.transfer.transferlist_emailtitle')" 
        :action-name="$t('message.common.transferbtn')" 
        class="left"
        img-src="/static/icons/transfer-to-email.svg" 
        @actionClick="onTransferToEmailClicked()"
      />
      <ActionCard 
        :title="$t('message.transfer.transferlist_ethtitle')" 
        :action-name="$t('message.common.transferbtn')" 
        class="right"
        img-src="/static/icons/transfer-to-eth.svg" 
        @actionClick="onTransferToEthWalletClicked()"
      />
    </div>


    <MDTConfirmPopup 
      :md-active.sync="showSetupPinDialog" 
      :md-title="$t('message.passcode.pin_setup_remind_title')"
      :md-content="$t('message.passcode.pin_setup_remind_content')" 
      :md-confirm-text="$t('message.common.setup')"
      :md-cancel-text="$t('message.common.cancel')" 
      @md-confirm="onConfirmSetupPinDialogClick"
    />
  </div>


</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { trackEvent } from '@/utils';
import { SET_TRANSFER_FROM_ACCOUNT } from '@/store/modules/transfer';
import { SET_DONE_CALLBACK_PATH } from '@/store/modules/security';
import { RouteDef } from '@/constants';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import AccountSelector from '@/components/common/AccountSelector';
import ActionCard from '@/components/common/ActionCard';

import BasePage from '@/screens/BasePage';

export default {
  components: {
    AccountSelector,
    ActionCard,
    MDTConfirmPopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.title'),
    };
  },
  data() {
    return {
      showSetupPinDialog: false,
    };
  },
  computed: {
    ...mapState({
      transferFromAccount: state => state.transfer.transferFromAccount,
    }),
    ...mapGetters({
      allUsers: 'getAllUsers',
      selectedUser: 'getSelectedUser',
      securitySelectedUser: 'getSelectedSecurityUser',
    }),
  },
  methods: {
    ...mapMutations({
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
    }),
    onTransferToEmailClicked() {
      trackEvent('Click on Transfer to an email account');
      if (!this.transferFromAccount.isPasscodeSet) {
        this.showSetupPinDialog = true;
      } else {
        this.$router.push(RouteDef.TransferEmail.path);
      }
    },
    onTransferToEthWalletClicked() {
      trackEvent('Click on transfer to an ETH wallet');
      if (!this.transferFromAccount.isPasscodeSet) {
        this.showSetupPinDialog = true;
      } else {
        this.$router.push(RouteDef.TransferEthWallet.path);
      }
    },
    onAccountSelected(account) {
      trackEvent('Switch accounts on Transfer Methods Select');
      this.setTransferFromAccount(account);
    },
    onConfirmSetupPinDialogClick() {
      trackEvent('Start Setting up PIN from the popup');
      this.setSecuritySelectedUser(this.transferFromAccount.emailAddress);
      this.setDoneCallbackPath(RouteDef.TransferList.path);
      this.$router.push({
        name: RouteDef.PinCodeSetup.name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer-list-screen {
  display: flex;
  flex-direction: column;
}

.account-selector {
  height: 72px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0px;
}

.action-card-list {
  background-color: $theme-listing-bgcolor;
  flex: 1;

  &::after {
    content: '';
    clear: both;
    display: table;
  }
}

.action-card {
  width: 44%;
  height: 210px;
  margin: 4% 2% 4% 4%;
  float: left;

  &.right {
    margin: 4% 4% 4% 2%;
  }
}
</style>
