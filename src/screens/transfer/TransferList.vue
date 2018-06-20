<template>
  <div>
    <div class="account">
      <AccountSelector v-on:accountSelected="setTransferFromAccount" :accounts="allUsers" :selectedAccount="transferFromAccount">
      </AccountSelector>
    </div>
    <div class="action-card-list">
      <ActionCard @actionClick="onTransferMethodClicked(RouteDef.TransferEmail.path)" class="left" :title="$t('message.transfer.transferlist_emailtitle')"
        :actionName="$t('message.common.transferbtn')" imgSrc="/static/icons/transfer-to-email.svg">
      </ActionCard>
      <ActionCard @actionClick="onTransferMethodClicked(RouteDef.TransferEthWallet.path)" class="right" :title="$t('message.transfer.transferlist_ethtitle')"
        :actionName="$t('message.common.transferbtn')" imgSrc="/static/icons/transfer-to-eth.svg">
      </ActionCard>
    </div>


    <MDTConfirmPopup :md-active.sync="showSetupPinDialog" :md-title="$t('message.passcode.pin_setup_remind_title')"
      :md-content="$t('message.passcode.pin_setup_remind_content')" :md-confirm-text="$t('message.common.setup')"
      :md-cancel-text="$t('message.common.cancel')" @md-confirm="onConfirmSetupPinDialogClick" />
  </div>


</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import {
  SET_TRANSFER_FROM_ACCOUNT,
} from '@/store/modules/transfer';
import {
  SET_SELECTED_USER,
} from '@/store/modules/security';
import { RouteDef } from '@/constants';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import AccountSelector from '@/components/common/AccountSelector';
import ActionCard from '@/components/common/ActionCard';

import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.title'),
    };
  },
  data() {
    return {
      RouteDef,
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
    }),
  },
  components: {
    AccountSelector,
    ActionCard,
    MDTConfirmPopup,
  },
  created() {
    this.setTransferFromAccount(this.selectedUser);
  },
  methods: {
    ...mapMutations({
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
      setSecuritySelectedUser: SET_SELECTED_USER,
    }),
    onTransferMethodClicked(path) {
      if (!this.selectedUser.isPasscodeSet) {
        this.showSetupPinDialog = true;
      } else {
        this.$router.push(path);
      }
    },
    onConfirmSetupPinDialogClick() {
      this.setSecuritySelectedUser(this.selectedUser.emailAddress);
      this.$router.push(RouteDef.PinCodeSetup.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.account-selector {
  height: 72px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0px;
}

.action-card-list {
  background-color: $theme-listing-bgcolor;
  height: calc(100% - 72px);
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
