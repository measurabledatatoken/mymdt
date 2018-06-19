<template>
  <div>
    <BaseUserSettingPage>
      <template slot="content">
        <md-list>
          <setting-list-section-header>{{ $t('message.settings.accountSecurity') }}</setting-list-section-header>
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.pin_setup_title')" @click="onSetupPINClicked" />
          <md-divider />
          <base-setting-list-item :title="$t('message.settings.phoneNumber')" @click="onSetupPhoneNumberClicked"
            :disabled="!getSelectedSecurityUser().isPasscodeSet" />
          <md-divider />
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.forgot_pin')" @click="onPasscodeForgotClicked" :disabled="!getSelectedSecurityUser().isPasscodeSet"
          />
          <md-divider />
        </md-list>
        <SuccessPopup :title="$t('message.passcode.pin_setup_successfully')" :active="showPinSetupSuccessPopup"
          iconSrc="/static/icons/guarded.svg"></SuccessPopup>
      </template>
    </BaseUserSettingPage>

    <md-dialog-confirm :md-active.sync="showAlreadySetPinDialog" :md-title="$t('message.passcode.already_setup_title')"
      :md-content="$t('message.passcode.already_setup_content')" :md-confirm-text="$t('message.common.change')"
      :md-cancel-text="$t('message.common.cancel')" @md-confirm="onConfirmSetupPIN" />


    <md-dialog-confirm :md-active.sync="showAlreadySetPhoneDialog" :md-title="$t('message.phone.already_setup_title')"
      :md-content="$t('message.phone.already_setup_content')" :md-confirm-text="$t('message.common.change')"
      :md-cancel-text="$t('message.common.cancel')" @md-confirm="onConfirmSetupPhoneNumber" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import SuccessPopup from '@/components/popup/SuccessPopup';

export default {
  components: {
    BaseUserSettingPage,
    BaseSettingListItem,
    SettingListSectionHeader,
    SuccessPopup,
  },
  data() {
    return {
      ...mapGetters(
        {
          getSelectedSecurityUser: 'getSelectedSecurityUser',
        },
      ),
      showPinSetupSuccessPopup: true,
      showAlreadySetPinDialog: false,
      showAlreadySetPhoneDialog: false,
    };
  },
  methods: {
    onSetupPINClicked() {
      // check if the PIN has already set and show popup
      if (this.getSelectedSecurityUser().isPasscodeSet) {
        this.showAlreadySetPinDialog = true;
        return;
      }

      // Push
      this.$router.push(RouteDef.PinCodeSetup.path);
    },
    onConfirmSetupPIN() {
      this.$router.push(RouteDef.PinCodeSetup.path);
    },
    onSetupPhoneNumberClicked() {
      if (!this.getSelectedSecurityUser().isPasscodeSet) {
        return;
      }
      // check if the Phone Number has already set and show popup
      if (this.getSelectedSecurityUser().isPhoneConfirmed) {
        this.showAlreadySetPhoneDialog = true;
        return;
      }

      // Push
      this.$router.push(RouteDef.PhoneNumberSetup.path);
    },
    onConfirmSetupPhoneNumber() {
      this.$router.push(RouteDef.PhoneNumberSetup.path);
    },
    onPasscodeForgotClicked() {
      if (!this.getSelectedSecurityUser().isPasscodeSet) {
        return;
      }

      this.$router.push(RouteDef.PinCodeForgot.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  /deep/ .md-dialog-actions {
    justify-content: space-between;
    padding-right: 24px;

    .md-ripple {
      padding: 0px;
    }
  }

  /deep/ .md-button-content {
    text-transform: none;
  }
}
</style>
