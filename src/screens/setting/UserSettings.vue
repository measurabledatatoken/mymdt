<template>
    <div>
        <div>{{ getSelectedSecurityUser.emailAddress }}</div>

        <md-list>
            <setting-list-section-header>{{ $t('message.settings.accountSecurity') }}</setting-list-section-header>
            <md-divider />
            <base-setting-list-item :title="$t('message.passcode.pin_setup_title')" @click="onSetupPINClicked" />
            <md-divider />
            <!-- <base-setting-list-item :title="$t('message.settings.phoneNumber')" @click="onSetupPhoneNumberClicked"
            />
            <md-divider /> -->
            <md-divider />
            <base-setting-list-item :title="$t('message.passcode.forgot_pin')" @click="onPasscodeForgotClicked" />
            <md-divider />
        </md-list>

    </div>

</template>

<script>
import { RouteDef } from '@/constants';
import { mapGetters } from 'vuex';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';

export default {
  components: {
    BaseSettingListItem,
    SettingListSectionHeader,
  },
  computed: {
    ...mapGetters(
      {
        getSelectedSecurityUser: 'getSelectedSecurityUser',
      },
    ),
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
    },
    onPasscodeForgotClicked() {

    },
  },
};
</script>

<style>
</style>
