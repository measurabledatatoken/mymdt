<template>
  <div class="transfer-list-screen">
    <div class="account">
      <AccountSelector 
        :accounts="allUsers" 
        :selected-account="selectedUser" 
        @accountSelected="onAccountSelected"
      />
    </div>
    <PaddedContainer class="action-card-list">
      <ActionCard 
        v-for="(item, index) in transferData"
        :key="`${index}`"
        :title="item.title" 
        :action-name="item.actionName" 
        :img-src="item.imgSrc" 
        @actionClick="item.onClick()"
      />
    </PaddedContainer>


    <MDTConfirmPopup 
      :md-active.sync="showSetupPinDialog"
      :md-title="$t('message.passcode.pin_setup_remind_title')" 
      :md-content="$t('message.passcode.pin_setup_remind_content')"
      :md-confirm-text="$t('message.common.setup')" 
      :md-cancel-text="$t('message.common.cancel')"
      data-cy="setup-pin-dialog" 
      @md-confirm="onConfirmSetupPinDialogClick"
    />

    <MDTConfirmPopup 
      :md-active.sync="showSetupPhoneDialog"
      :md-title="$t('message.phone.add_phone_title')" 
      :md-content="$t('message.phone.add_phone_content')"
      :md-confirm-text="$t('message.common.setup')" 
      :md-cancel-text="$t('message.common.cancel')"
      data-cy="setup-phone-dialog" 
      @md-confirm="onConfirmSetupPhoneDialogClick"
    />
  </div>


</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { trackEvent } from '@/utils';
import { SET_DONE_CALLBACK_PATH } from '@/store/modules/security';
import { SET_SELECTED_USER } from '@/store/modules/home';

import { RouteDef } from '@/constants';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import AccountSelector from '@/components/common/AccountSelector';
import ActionCard from '@/components/common/ActionCard';
import PaddedContainer from '@/components/containers/PaddedContainer';

import BasePage from '@/screens/BasePage';
import OTPActionType from '@/enum/otpActionType';
import SetupPINMode from '@/enum/setupPINMode';

import { enableTransferByEmail } from '@/constants';

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
    const transferData = [
      ...(enableTransferByEmail
        ? [
            {
              title: this.$t('message.transfer.transferlist_emailtitle'),
              actionName: this.$t('message.common.transferbtn'),
              imgSrc: '/static/icons/transfer-to-email.svg',
              onClick: this.onTransferToEmailClicked,
            },
          ]
        : []),
      {
        title: this.$t('message.transfer.transferlist_ethtitle'),
        actionName: this.$t('message.common.transferbtn'),
        imgSrc: '/static/icons/transfer-to-eth.svg',
        onClick: this.onTransferToEthWalletClicked,
      },
      {
        title: this.$t('message.transfer.transferlist_okextitle'),
        actionName: this.$t('message.common.transferbtn'),
        imgSrc: '/static/icons/logo-okex.svg',
        onClick: this.onOKEXClick,
      },
    ];

    return {
      showSetupPinDialog: false,
      showSetupPhoneDialog: false,
      transferData: transferData,
    };
  },
  computed: {
    ...mapGetters({
      allUsers: 'getAllUsers',
      selectedUser: 'getSelectedUser',
    }),
  },
  created() {
    const emailAddress = this.$route.params.account_id;
    this.setSelectedUser(emailAddress);
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
    }),
    onTransferToEmailClicked() {
      trackEvent('Click on Transfer to an email account');
      if (!this.selectedUser.isPasscodeSet) {
        this.showSetupPinDialog = true;
      } else if (!this.selectedUser.isPhoneConfirmed) {
        this.showSetupPhoneDialog = true;
      } else {
        this.$router.push(RouteDef.TransferEmail.path);
      }
    },
    onTransferToEthWalletClicked() {
      trackEvent('Click on transfer to an ETH wallet');
      if (!this.selectedUser.isPasscodeSet) {
        this.showSetupPinDialog = true;
      } else if (!this.selectedUser.isPhoneConfirmed) {
        this.showSetupPhoneDialog = true;
      } else {
        this.$router.push(RouteDef.TransferEthWallet.path);
      }
    },
    onAccountSelected(account) {
      trackEvent('Switch accounts on Transfer Methods Select');
      this.setSelectedUser(account.emailAddress);
    },
    onConfirmSetupPinDialogClick() {
      trackEvent('Start Setting up PIN from the popup');
      this.setDoneCallbackPath(this.$router.currentRoute.path);
      this.$router.push({
        name: RouteDef.PinCodeSetup.name,
        params: {
          mode: SetupPINMode.SETUP,
        },
      });
    },
    onConfirmSetupPhoneDialogClick() {
      trackEvent('Start Setting up Phone from the popup');
      this.setDoneCallbackPath(this.$router.currentRoute.path);
      this.$router.push({
        name: RouteDef.PhoneNumberInput.name,
        params: {
          action: OTPActionType.SetupPhoneNumberAction,
        },
      });
    },
    onOKEXClick() {
      trackEvent('Click on transfer to OKEx');
      if (!this.selectedUser.isPasscodeSet) {
        this.showSetupPinDialog = true;
      } else if (!this.selectedUser.isPhoneConfirmed) {
        this.showSetupPhoneDialog = true;
      } else {
        this.$router.push({
          path: RouteDef.TransferEthWallet.path,
          query: {
            okex: true,
          },
        });
      }
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
  float: left;
  margin: 3%;
}
</style>
