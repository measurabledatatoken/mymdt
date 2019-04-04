<template>
  <div>
    <BaseUserSettingPage>
      <template slot="unpaded-content">
        <md-list>
          <setting-list-section-header>{{ $t('message.settings.accountSecurity') }}</setting-list-section-header>
          <md-divider/>
          <base-setting-list-item
            :title="$t('message.passcode.pin_setup_title')"
            data-cy="setting-setup-pin"
            @click="onSetupPINClicked"
          >
            <template
              v-if="!selectedUser.isPasscodeSet"
              slot="action-data"
            >{{ $t('message.settings.setUpNow') }}</template>
            <template 
              v-if="selectedUser.isPasscodeSet" 
              slot="action-data"
            >
              <md-icon 
                data-cy="icon-complete" 
                md-src="/static/icons/settings-account-3.svg"
              />
            </template>
          </base-setting-list-item>
          <md-divider/>
          <base-setting-list-item
            :title="$t('message.settings.phoneNumber')"
            :disabled="!selectedUser.isPasscodeSet"
            data-cy="setting-setup-phone"
            @click="onSetupPhoneNumberClicked"
          >
            <template
              v-if="showPhoneNumberSetup"
              slot="action-data"
            >{{ $t('message.settings.setUpNow') }}</template>
            <template 
              v-if="selectedUser.isPhoneConfirmed" 
              slot="action-data"
            >
              <md-icon 
                data-cy="icon-complete" 
                md-src="/static/icons/settings-account-3.svg"
              />
            </template>
          </base-setting-list-item>
          <md-divider/>
          <md-divider/>
          <base-setting-list-item
            :title="$t('message.googleAuth.setupTitle')"
            :disabled="!(selectedUser.isPasscodeSet)"
            data-cy="setting-setup-google-auth"
            @click="onGoogleAuthClicked"
          >
            <template 
              v-if="selectedUser.isGoogleAuthEnabled" 
              slot="action-data"
            >
              <md-icon 
                data-cy="icon-complete" 
                md-src="/static/icons/settings-account-3.svg"
              />
            </template>
            <template
              v-if="!selectedUser.isGoogleAuthEnabled && selectedUser.hasGoogleAuthSecret"
              slot="action-data"
            >
              <md-icon 
                data-cy="icon-incomplete" 
                md-src="/static/icons/settings-incomplete.svg"
              />
            </template>
          </base-setting-list-item>
          <md-divider/>
          <md-divider/>
          <base-setting-list-item
            :title="$t('message.twoFactorAuthentication.setupTitle')"
            :disabled="!allowTwoFactorSetup"
            data-cy="setting-setup-2fa"
            @click="onTwoFactorClicked"
          >
            <template 
              v-if="selectedUser.isTwofaEnabled" 
              slot="action-data"
            >
              <md-icon 
                data-cy="icon-complete" 
                md-src="/static/icons/settings-account-3.svg"
              />
            </template>
          </base-setting-list-item>
          <md-divider/>
          <md-divider/>
          <base-setting-list-item
            :title="$t('message.passcode.forgot_pin')"
            :disabled="!selectedUser.isPasscodeSet"
            data-cy="forgot-pin"
            @click="onPasscodeForgotClicked"
          />
          <md-divider/>
        </md-list>

        <MDTConfirmPopup
          :md-active.sync="showAlreadySetPinDialog"
          :md-title="$t('message.passcode.already_setup_title')"
          :md-content="$t('message.passcode.already_setup_content')"
          :md-confirm-text="$t('message.common.change')"
          :md-cancel-text="$t('message.common.cancel')"
          data-cy="popup-change-pin"
          @md-confirm="onConfirmChangePIN"
        />

        <MDTConfirmPopup
          :md-active.sync="showAlreadySetPhoneDialog"
          :md-title="$t('message.phone.already_setup_title')"
          :md-content="$t('message.phone.already_setup_content')"
          :md-confirm-text="$t('message.common.change')"
          :md-cancel-text="$t('message.common.cancel')"
          data-cy="popup-change-phone"
          @md-confirm="onConfirmChangePhoneNumber"
        />

        <!-- will show when the action required to setup pin first -->
        <MDTConfirmPopup
          :md-active.sync="showSetPinDialog"
          :md-title="$t('message.passcode.please_setup_pin_title')"
          :md-content="pinSetupPopupDescription"
          :md-confirm-text="$t('message.passcode.please_setup_pin_action')"
          :md-cancel-text="$t('message.common.cancel')"
          class="popup-setup-pin"
          @md-confirm="onSetupPINClicked"
        />

        <!-- input Pin popup -->
        <PinCodeInputPopup
          ref="pinCodeInputPopup"
          :md-active.sync="showPinCodeInput"
          :title="pinCodePopupTitle"
          @codefilled="onPinCodeFilled"
          @close-click="showPinCodeInput = false"
        />

        <!-- disable Google authenticator popup -->
        <MDTConfirmPopup
          :md-active.sync="showDisableGoogleAuthPopup"
          :md-title="$t('message.googleAuth.disablePopupTitle')"
          :md-content="disableGoogleAuthPopupDescription"
          :md-confirm-text="$t('message.common.disable')"
          :md-cancel-text="$t('message.common.cancel')"
          data-cy="popup-disable-google-auth"
          @md-confirm="goToGoogleAuthSetting('disable')"
        />

        <!-- Continue to setup Google authenticator popup, show if the google auth secret exists -->
        <MDTConfirmPopup
          :md-active.sync="showContinueGoogleAuthPopup"
          :md-title="$t('message.googleAuth.continueSetupPopupTitle')"
          :md-content="$t('message.googleAuth.continueSetupPopupDescription')"
          :md-confirm-text="$t('message.common.continue')"
          :md-cancel-text="$t('message.common.startOver')"
          data-cy="popup-continue-setup-google-auth"
          @md-confirm="goToGoogleAuthSetting('continue')"
          @md-cancel="goToGoogleAuthSetting('setup-new')"
        />
      </template>
    </BaseUserSettingPage>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { trackEvent } from '@/utils';
import { RouteDef } from '@/constants';
import {
  SET_SECURITY_USER_PHONE_INFO,
  VALIDATE_PIN,
  SET_DONE_CALLBACK_PATH,
  REQUEST_VERIFICATION_CODE,
  SET_PIN_FOR_SECURITY,
} from '@/store/modules/security';
import { SET_SELECTED_USER } from '@/store/modules/home';
import SetupPINMode from '@/enum/setupPINMode';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';
import OTPActionType from '@/enum/otpActionType';
import TwoFactorOption from '@/enum/twoFactorOption';

export default {
  components: {
    BaseUserSettingPage,
    BaseSettingListItem,
    SettingListSectionHeader,
    MDTConfirmPopup,
    PinCodeInputPopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.title'),
    };
  },
  data() {
    return {
      showAlreadySetPinDialog: false,
      showAlreadySetPhoneDialog: false,
      showPinCodeInput: false,
      pinCodePopupTitle: '',
      nextRouteNameAfterPINFilled: '',
      showSetPinDialog: false,
      pinSetupPopupDescription: '',
      showDisableGoogleAuthPopup: false,
      disableGoogleAuthPopupDescription: '',
      showContinueGoogleAuthPopup: false,
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getUser: 'getUser',
    }),
    allowTwoFactorSetup() {
      return (
        this.selectedUser.isPasscodeSet &&
        (this.selectedUser.isPhoneConfirmed ||
          this.selectedUser.isGoogleAuthEnabled)
      );
    },
    showPhoneNumberSetup() {
      return (
        !this.selectedUser.isPhoneConfirmed && this.selectedUser.isPasscodeSet
      );
    },
  },
  created() {
    this.setDoneCallbackPath(this.$router.currentRoute.path);
    const emailAddress = this.$route.params.account_id;
    this.setSelectedUser(emailAddress);
    this.setSecurityUserInfo(this.getUser(emailAddress));
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setSecurityUserInfo: SET_SECURITY_USER_PHONE_INFO,
      setPinForSecuirty: SET_PIN_FOR_SECURITY,
    }),
    ...mapActions({
      validatePIN: VALIDATE_PIN,
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onSetupPINClicked() {
      trackEvent('Click on PIN');

      // check if the PIN has already set and show popup
      if (this.selectedUser.isPasscodeSet) {
        this.showAlreadySetPinDialog = true;
        return;
      }

      trackEvent('Start Setting up PIN from the account security page');
      this.$router.push({
        name: RouteDef.PinCodeSetup.name,
        params: {
          mode: SetupPINMode.SETUP,
          doneCallBackPath: RouteDef.UserSettings.path,
        },
      });
    },
    onConfirmChangePIN() {
      this.pinCodePopupTitle = this.$t('message.passcode.oldpin_popup_title');
      this.nextRouteNameAfterPINFilled = RouteDef.PinCodeSetup.name;
      this.showPinCodeInput = true;
    },
    async onPinCodeFilled(pinCode) {
      try {
        await this.validatePIN(pinCode);
        this.setPinForSecuirty(pinCode);
        this.showPinCodeInput = false;
      } catch (error) {
        console.error(`error in validating: ${error.message}`);
        this.$refs.pinCodeInputPopup.setInvalid();
        return;
      }

      switch (this.nextRouteNameAfterPINFilled) {
        case RouteDef.PinCodeSetup.name:
          trackEvent('Start Setting up PIN from the account security page');
          this.$router.push({
            name: RouteDef.PinCodeSetup.name,
            params: {
              mode: SetupPINMode.CHANGE,
              oldPIN: pinCode,
            },
          });
          break;
        case RouteDef.ChangePhoneNumberInput.name:
          try {
            await this.requestVerificationCode({
              action: OTPActionType.VerifyPhoneNumberAction,
            });
            this.$router.push({
              name: RouteDef.PhoneNumberVerify.name,
              params: {
                emailAddress: this.selectedUser.emailAddress,
                nextPagePathName: RouteDef.ChangePhoneNumberInput.name,
                payloadForNextPage: { pin: pinCode },
                action: OTPActionType.VerifyPhoneNumberAction,
              },
            });
          } catch (error) {
            console.error(
              `error in requesting verification code: ${error.message}`,
            );
          }
          break;
        default:
          this.$router.push({
            name: this.nextRouteNameAfterPINFilled,
            params: {
              pin: pinCode,
            },
          });
      }
    },
    onSetupPhoneNumberClicked() {
      trackEvent('Click on Phone Number');
      if (!this.selectedUser.isPasscodeSet) {
        this.pinSetupPopupDescription = this.$t(
          'message.phone.pinSetupPopupDescription',
        );
        this.showSetPinDialog = true;
        return;
      }
      // check if the Phone Number has already set and show popup
      if (this.selectedUser.isPhoneConfirmed) {
        this.showAlreadySetPhoneDialog = true;
        return;
      }

      this.pinCodePopupTitle = this.$t('message.passcode.pin_popup_title');
      this.nextRouteNameAfterPINFilled = RouteDef.AddPhoneNumberInput.name;
      this.showPinCodeInput = true;
    },
    onConfirmChangePhoneNumber() {
      this.pinCodePopupTitle = this.$t('message.passcode.pin_popup_title');
      this.nextRouteNameAfterPINFilled = RouteDef.ChangePhoneNumberInput.name;
      this.showPinCodeInput = true;
    },
    onPasscodeForgotClicked() {
      trackEvent('Click on forgot PIN');
      if (!this.selectedUser.isPasscodeSet) {
        return;
      }

      this.$router.push(RouteDef.PinCodeForgot.path);
    },
    onTwoFactorClicked() {
      if (!this.selectedUser.isPasscodeSet) {
        this.pinSetupPopupDescription = this.$t(
          'message.twoFactorAuthentication.pinSetupPopupDescription',
        );
        this.showSetPinDialog = true;
      } else if (this.allowTwoFactorSetup) {
        this.pinCodePopupTitle = this.$t('message.passcode.pin_popup_title');
        this.nextRouteNameAfterPINFilled =
          RouteDef.TwoFactorAuthenticationSetting.name;
        this.showPinCodeInput = true;
      }
    },
    disableGoogleAuth() {
      if (
        this.selectedUser.isTwofaEnabled &&
        this.selectedUser.twofaMethod === TwoFactorOption.METHOD.GOOGLE
      ) {
        if (this.selectedUser.isPhoneConfirmed) {
          // will switch 2FA method to SMS
          this.disableGoogleAuthPopupDescription = this.$t(
            'message.googleAuth.disablePopupContentCase1',
          );
        } else {
          // will disable 2FA
          this.disableGoogleAuthPopupDescription = this.$t(
            'message.googleAuth.disablePopupContentCase2',
          );
        }
      } else {
        // will disable google auth
        this.disableGoogleAuthPopupDescription = this.$t(
          'message.googleAuth.disablePopupContentCase3',
        );
      }
      this.showDisableGoogleAuthPopup = true;
    },
    setupGoogleAuth() {
      if (this.selectedUser.hasGoogleAuthSecret) {
        this.showContinueGoogleAuthPopup = true;
      } else {
        this.goToGoogleAuthSetting('setup-new');
      }
    },
    onGoogleAuthClicked() {
      if (!this.selectedUser.isPasscodeSet) {
        this.pinSetupPopupDescription = this.$t(
          'message.googleAuth.pinSetupPopupDescription',
        );
        this.showSetPinDialog = true;
      } else if (this.selectedUser.isGoogleAuthEnabled) {
        this.disableGoogleAuth();
      } else {
        this.setupGoogleAuth();
      }
    },
    goToGoogleAuthSetting(action) {
      this.pinCodePopupTitle = this.$t('message.passcode.pin_popup_title');
      switch (action) {
        case 'setup-new':
          this.nextRouteNameAfterPINFilled =
            RouteDef.GoogleAuthSettingStep1.name;
          break;
        case 'continue':
          this.nextRouteNameAfterPINFilled =
            RouteDef.GoogleAuthSettingStep3.name;
          break;
        case 'disable':
          this.nextRouteNameAfterPINFilled =
            RouteDef.DisableGoogleAuthVerifyPage.name;
          break;
        default:
          break;
      }
      this.showPinCodeInput = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-setup-pin {
  /deep/ .md-dialog-content {
    font-size: 14px;
  }
}
</style>
