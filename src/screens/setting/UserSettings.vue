<template>
  <div>
    <BaseUserSettingPage>
      <template slot="content">
        <md-list>
          <setting-list-section-header>{{ $t('message.settings.accountSecurity') }}</setting-list-section-header>
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.pin_setup_title')"
                                  @click="onSetupPINClicked">
            <template slot="action-data"
                      v-if="!getSelectedSecurityUser.isPasscodeSet">
              {{$t('message.settings.setUpNow')}}
            </template>
            <template slot="action-data"
                      v-if="getSelectedSecurityUser.isPasscodeSet">
              <md-icon md-src="/static/icons/settings-account-3.svg"></md-icon>
            </template>
          </base-setting-list-item>
          <md-divider />
          <base-setting-list-item :title="$t('message.settings.phoneNumber')"
                                  @click="onSetupPhoneNumberClicked"
                                  :disabled="!getSelectedSecurityUser.isPasscodeSet">
            <template slot="action-data"
                      v-if="showPhoneNumberSetup">
              {{$t('message.settings.setUpNow')}}
            </template>
            <template slot="action-data"
                      v-if="getSelectedSecurityUser.isPhoneConfirmed">
              <md-icon md-src="/static/icons/settings-account-3.svg"></md-icon>
            </template>
          </base-setting-list-item>
          <md-divider />
          <md-divider />
          <base-setting-list-item :title="$t('message.passcode.forgot_pin')"
                                  @click="onPasscodeForgotClicked"
                                  :disabled="!getSelectedSecurityUser.isPasscodeSet" />
          <md-divider />
        </md-list>

        <MDTConfirmPopup :md-active.sync="showAlreadySetPinDialog"
                         :md-title="$t('message.passcode.already_setup_title')"
                         :md-content="$t('message.passcode.already_setup_content')"
                         :md-confirm-text="$t('message.common.change')"
                         :md-cancel-text="$t('message.common.cancel')"
                         @md-confirm="onConfirmChangePIN" />

        <MDTConfirmPopup :md-active.sync="showAlreadySetPhoneDialog"
                         :md-title="$t('message.phone.already_setup_title')"
                         :md-content="$t('message.phone.already_setup_content')"
                         :md-confirm-text="$t('message.common.change')"
                         :md-cancel-text="$t('message.common.cancel')"
                         @md-confirm="onConfirmChangePhoneNumber" />

        <PinCodeInputPopup ref="pinCodeInputPopup"
                           :md-active.sync="showPinCodeInput"
                           :title="pinCodePopupTitle"
                           :emailAddress="getSelectedSecurityUser.emailAddress"
                           @codefilled="onPinCodeFilled"
                           @close-click="showPinCodeInput = false"
                           @fotgot-click="onFotgotClicked">
        </PinCodeInputPopup>

      </template>
    </BaseUserSettingPage>

  </div>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { SET_SELECTED_USER, SET_SECURITY_USER_PHONE_INFO, VALIDATE_PIN_FOR_SECURITY, SET_DONE_CALLBACK_PATH, REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import SetupPINMode from '@/enum/setupPINMode';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';
import OTPActionType from '@/enum/otpActionType';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.title'),
    };
  },
  components: {
    BaseUserSettingPage,
    BaseSettingListItem,
    SettingListSectionHeader,
    MDTConfirmPopup,
    PinCodeInputPopup,
  },
  data() {
    return {
      showAlreadySetPinDialog: false,
      showAlreadySetPhoneDialog: false,
      showPinCodeInput: false,
      pinCodePopupTitle: '',
      nextRouteNameAfterPINFilled: '',
    };
  },
  computed: {
    ...mapGetters(
      {
        getSelectedSecurityUser: 'getSelectedSecurityUser',
        getUser: 'getUser',
      },
    ),
    showPhoneNumberSetup() {
      return !this.getSelectedSecurityUser.isPhoneConfirmed && this.getSelectedSecurityUser.isPasscodeSet;
    },
  },
  created() {
    this.setDoneCallbackPath(RouteDef.UserSettings.path);
    const emailAddress = this.$route.query.email;
    if (emailAddress) {
      this.setSelectedUser(emailAddress);
      this.setSecurityUserInfo(this.getUser(emailAddress));
    }
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setSecurityUserInfo: SET_SECURITY_USER_PHONE_INFO,
    }),
    ...mapActions({
      validatePIN: VALIDATE_PIN_FOR_SECURITY,
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onSetupPINClicked() {
      // check if the PIN has already set and show popup
      if (this.getSelectedSecurityUser.isPasscodeSet) {
        this.showAlreadySetPinDialog = true;
        return;
      }

      this.$router.push(
        {
          name: RouteDef.PinCodeSetup.name,
          params: {
            mode: SetupPINMode.SETUP,
            doneCallBackPath: RouteDef.UserSettings.path,
          },
        },
      );
    },
    onConfirmChangePIN() {
      this.pinCodePopupTitle = this.$t('message.passcode.oldpin_popup_title');
      this.nextRouteNameAfterPINFilled = RouteDef.PinCodeSetup.name;
      this.showPinCodeInput = true;
    },
    onPinCodeFilled(pinCode) {
      this.validatePIN(pinCode)
        .catch((err) => {
          this.$refs.pinCodeInputPopup.setInvalid();
          throw (err);
        })
        .then(() => {
          this.showPinCodeInput = false;


          if (this.nextRouteNameAfterPINFilled === RouteDef.PinCodeSetup.name) {
            this.$router.push(
              {
                name: RouteDef.PinCodeSetup.name,
                params: {
                  mode: SetupPINMode.CHANGE,
                  oldPIN: pinCode,
                },
              },
            );
          } else if (this.nextRouteNameAfterPINFilled === RouteDef.AddPhoneNumberInput.name) {
            this.$router.push({
              name: RouteDef.AddPhoneNumberInput.name,
              params: {
                pin: pinCode,
              },
            });
          } else {
            this.requestVerificationCode(
              {
                action: OTPActionType.VerifyPhoneNumberAction,
              },
            ).then(() => {
              this.$router.push(
                {
                  name: RouteDef.PhoneNumberVerify.name,
                  params: {
                    emailAddress: this.getSelectedSecurityUser.emailAddress,
                    nextPagePathName: RouteDef.ChangePhoneNumberInput.name,
                    payloadForNextPage: { pin: pinCode },
                    action: OTPActionType.VerifyPhoneNumberAction,
                  },
                },
              );
            });
          }
        });
    },
    onFotgotClicked() {
      this.$router.push({
        name: RouteDef.PinCodeForgot.name,
      });
    },
    onSetupPhoneNumberClicked() {
      if (!this.getSelectedSecurityUser.isPasscodeSet) {
        return;
      }
      // check if the Phone Number has already set and show popup
      if (this.getSelectedSecurityUser.isPhoneConfirmed) {
        this.showAlreadySetPhoneDialog = true;
        return;
      }

      this.nextRouteNameAfterPINFilled = RouteDef.AddPhoneNumberInput.name;
      this.showPinCodeInput = true;
    },
    onConfirmChangePhoneNumber() {
      this.pinCodePopupTitle = this.$t('message.passcode.pin_popup_title');
      this.showPinCodeInput = true;
    },
    onPasscodeForgotClicked() {
      if (!this.getSelectedSecurityUser.isPasscodeSet) {
        return;
      }

      this.$router.push(RouteDef.PinCodeForgot.path);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
