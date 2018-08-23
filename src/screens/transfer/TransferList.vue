<template>
  <div class="transfer-list-screen">
    <div class="account">
      <AccountSelector 
        :accounts="allUsers" 
        :selected-account="transferFromAccount" 
        @accountSelected="onAccountSelected"
      />
    </div>
    <PaddedContainer class="action-card-list">
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
    </PaddedContainer>


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
import { mapGetters, mapMutations } from 'vuex';
import { trackEvent } from '@/utils';
import { SET_TRANSFER_FROM_ACCOUNT } from '@/store/modules/transfer';
import {
  SET_DONE_CALLBACK_PATH,
  SET_SELECTED_SECURITY_USER,
} from '@/store/modules/security';
import { RouteDef } from '@/constants';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import AccountSelector from '@/components/common/AccountSelector';
import ActionCard from '@/components/common/ActionCard';
import PaddedContainer from '@/components/containers/PaddedContainer';

import BasePage from '@/screens/BasePage';
import { SET_SELECTED_USER } from '@/store/modules/home';

export default {
  components: {
    AccountSelector,
    ActionCard,
    MDTConfirmPopup,
    PaddedContainer,
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
    ...mapGetters({
      allUsers: 'getAllUsers',
      selectedUser: 'getSelectedUser',
      transferFromAccount: 'transferFromAccount',
    }),
  },
  created() {
    const emailAddress = this.$route.params.account_id;
    this.setSelectedUser(emailAddress);
    this.setSelectedSecurityUser(emailAddress);
    this.setTransferFromAccount(emailAddress);
  },
  methods: {
    ...mapMutations({
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
      setSelectedSecurityUser: SET_SELECTED_SECURITY_USER,
      setSelectedUser: SET_SELECTED_USER,
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
      this.setTransferFromAccount(account.emailAddress);
      this.setSelectedSecurityUser(account.emailAddress);
    },
    onConfirmSetupPinDialogClick() {
      trackEvent('Start Setting up PIN from the popup');
      this.setDoneCallbackPath(this.$router.currentRoute.path);
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
  padding: 0 1rem;
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
