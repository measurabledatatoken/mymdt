<template>
    <div>
        <div>{{ emailAddress }}</div>

        <md-list>
            <setting-list-section-header>{{ $t('message.settings.accountSecurity') }}</setting-list-section-header>
            <md-divider />
            <base-setting-list-item :title="$t('message.passcode.pin_setup_title')" @click="onSetupPINClicked"/>
            <md-divider />
            <base-setting-list-item :title="$t('message.settings.phoneNumber')" @click="onSetupPhoneNumberClicked"/>
            <md-divider />
            <md-divider />
            <base-setting-list-item :title="$t('message.passcode.forgot_pin')" @click="onPasscodeForgotClicked"/>
            <md-divider />
        </md-list>

    </div>

</template>

<script>
import { RouteDef } from '@/constants';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';

export default {
  props: {
    emailAddress: {
      type: String,
    },
  },
  components: {
    BaseSettingListItem,
  },
  methods: {
    onSetupPINClicked() {
      // check if the PIN has already set and show popup

      this.$router.push(RouteDef.PinCodeSetup.path);
    },
    onSetupPhoneNumberClicked() {

    },
    onPasscodeForgotClicked() {

    },
  },
};
</script>

<style>
</style>
