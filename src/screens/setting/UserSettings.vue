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
            />
            <md-divider />
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.forgot_pin')" @click="onPasscodeForgotClicked" />
          <md-divider />
        </md-list>
        <SuccessPopup :title="$t('message.passcode.pin_setup_successfully')" :active="showPinSetupSuccessPopup" iconSrc="/static/icons/guarded.svg"></SuccessPopup>
      </template>
    </BaseUserSettingPage>

  </div>

</template>

<script>
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
      showPinSetupSuccessPopup: true,
    };
  },
  methods: {
    onSetupPINClicked() {
      // check if the PIN has already set and show popup

      // Push
      this.$router.push(RouteDef.PinCodeSetup.path);
    },
    onSetupPhoneNumberClicked() {
      // check if the Phone Number has already set and show popup

      // Push
      this.$router.push(RouteDef.PhoneNumberSetup.path);
    },
    onPasscodeForgotClicked() {
      this.$router.push(RouteDef.PinCodeForgot.path);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
