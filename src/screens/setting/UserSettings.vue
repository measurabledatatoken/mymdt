<template>
  <div>
    <BaseUserSettingPage>
      <template slot="content">
        <md-list>
          <setting-list-section-header>{{ $t('message.settings.accountSecurity') }}</setting-list-section-header>
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.pin_setup_title')" @click="onSetupPINClicked">
            <template slot="action-data" v-if="!getSelectedSecurityUser().isPasscodeSet">
              {{$t('message.settings.setUpNow')}}
            </template>
            <template slot="action-data" v-if="getSelectedSecurityUser().isPasscodeSet">
              <md-icon md-src="/static/icons/settings-account-3.svg"></md-icon>
            </template>
          </base-setting-list-item>
          <md-divider />
          <base-setting-list-item :title="$t('message.settings.phoneNumber')" @click="onSetupPhoneNumberClicked"
            :disabled="!getSelectedSecurityUser().isPasscodeSet">
            <template slot="action-data" v-if="showPhoneNumberSetup">
              {{$t('message.settings.setUpNow')}}
            </template>
            <template slot="action-data" v-if="getSelectedSecurityUser().isPhoneConfirmed">
              <md-icon md-src="/static/icons/settings-account-3.svg"></md-icon>
            </template>
          </base-setting-list-item>
          <md-divider />
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.forgot_pin')" @click="onPasscodeForgotClicked" :disabled="!getSelectedSecurityUser().isPasscodeSet"
          />
          <md-divider />
        </md-list>

        <MDTConfirmPopup :md-active.sync="showAlreadySetPinDialog" :md-title="$t('message.passcode.already_setup_title')"
          :md-content="$t('message.passcode.already_setup_content')" :md-confirm-text="$t('message.common.change')"
          :md-cancel-text="$t('message.common.cancel')" @md-confirm="onConfirmSetupPIN" />

        <MDTConfirmPopup :md-active.sync="showAlreadySetPhoneDialog" :md-title="$t('message.phone.already_setup_title')"
          :md-content="$t('message.phone.already_setup_content')" :md-confirm-text="$t('message.common.change')"
          :md-cancel-text="$t('message.common.cancel')" @md-confirm="onConfirmSetupPhoneNumber" />
      </template>
    </BaseUserSettingPage>

  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';

export default {
  components: {
    BaseUserSettingPage,
    BaseSettingListItem,
    SettingListSectionHeader,
    MDTConfirmPopup,
  },
  data() {
    return {
      ...mapGetters(
        {
          getSelectedSecurityUser: 'getSelectedSecurityUser',
        },
      ),
      showAlreadySetPinDialog: false,
      showAlreadySetPhoneDialog: false,
    };
  },
  computed: {
    showPhoneNumberSetup() {
      return !this.getSelectedSecurityUser().isPhoneConfirmed && this.getSelectedSecurityUser().isPasscodeSet;
    },
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
</style>
