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

    <MDTConfirmPopup 
      :md-active.sync="showSetup2faDialog"
      :md-title="$t('message.twoFactorAuthentication.setupTitle')" 
      :md-content="$t('message.twoFactorAuthentication.turn_on_2fa_content')"
      :md-confirm-text="$t('message.common.setup')" 
      :md-cancel-text="$t('message.common.cancel')"
      @md-confirm="onConfirmSetup2faDialogClick"
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
import { openExternalBrowser } from '@/utils';

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
        actionName: this.$t('message.common.registerbtn'),
        imgSrc: '/static/icons/logo-okex.svg',
        onClick: this.onOKEXClick,
      },
      {
        title: this.$t('message.transfer.transferlist_binancetitle'),
        actionName: this.$t('message.common.registerbtn'),
        imgSrc: '/static/icons/logo-binance.svg',
        onClick: this.onBinanceClick,
      },
      {
        title: this.$t('message.transfer.transferlist_digifinextitle'),
        actionName: this.$t('message.common.registerbtn'),
        imgSrc: '/static/icons/logo-digifinex.svg',
        onClick: this.onDigifinexClick,
      },
    ];

    return {
      showSetupPinDialog: false,
      showSetupPhoneDialog: false,
      showSetup2faDialog: false,
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
      } else if (!this.selectedUser.isTwofaEnabled) {
        this.showSetup2faDialog = true;
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
      } else if (!this.selectedUser.isTwofaEnabled) {
        this.showSetup2faDialog = true;
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
    onConfirmSetup2faDialogClick() {
      trackEvent('Start Setting up 2fa from the popup on transfer list page');
      this.$router.push({
        name: RouteDef.UserSettings.name,
        params: {
          account_id: this.selectedUser.emailAddress,
        },
      });
    },
    onOKEXClick() {
      trackEvent('Click on register OKEx');
      if (this.$i18n.locale === 'zh-cn') {
        openExternalBrowser('https://www.digifinex.xyz/zh-cn/from/lpKlJk');
      } else {
        openExternalBrowser('https://www.digifinex.com/en-ww/from/lpKlJk');
      }
    },
    onBinanceClick() {
      trackEvent('Click on register binance');
      if (this.$i18n.locale === 'zh-cn') {
        openExternalBrowser(
          'https://www.binancezh.com/cn/register?ref=VXR61SQI',
        );
      } else {
        openExternalBrowser('https://www.binance.com/en/register?ref=VXR61SQI');
      }
    },
    onDigifinexClick() {
      trackEvent('Click on register digifinex');
      if (this.$i18n.locale === 'zh-cn') {
        openExternalBrowser('https://www.okex.me/join/1838164');
      } else {
        openExternalBrowser('https://www.okex.com/join/1838164');
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
