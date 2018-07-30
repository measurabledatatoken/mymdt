<template>
  <div class="two-factor-authentication-setting-page">
    <BaseUserSettingPage/>
    <p class="description">{{ $t('message.twoFactorAuthentication.setupDescription') }}</p>
    <div class="content">
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">{{ $t('message.twoFactorAuthentication.turnOn2FA') }}</span>
          
          <md-switch 
            v-model="enabled" 
            class="md-primary"
          />
        </md-list-item>
        <md-divider />
        <template v-if="enabled">
          <setting-list-section-header>{{ $t('message.twoFactorAuthentication.setupMethodTitle') }}</setting-list-section-header>
          <md-divider />
          <price-unit-list-item 
            :selected="method === TwoFactorOption.METHOD.SMS" 
            :title="$t('message.twoFactorAuthentication.methods.sms')" 
            :disabled="!selectedSecurityUser.isPhoneConfirmed"
            @click="set2FAMethod(TwoFactorOption.METHOD.SMS)"
          />
          <md-divider />
          <price-unit-list-item 
            :selected="method === TwoFactorOption.METHOD.GOOGLE" 
            :title="$t('message.twoFactorAuthentication.methods.google')" 
            :disabled="!selectedSecurityUser.isGoogleAuthEnabled"
            @click="set2FAMethod(TwoFactorOption.METHOD.GOOGLE)"
          />
          <md-divider />
          <setting-list-section-header>{{ $t('message.twoFactorAuthentication.setupUsageTitle') }}</setting-list-section-header>
          <md-divider />
          <price-unit-list-item 
            :selected="usage === TwoFactorOption.USAGE.TRANSACTION" 
            :title="$t('message.twoFactorAuthentication.usage.transaction')" 
            @click="set2FAUsage(TwoFactorOption.USAGE.TRANSACTION)"
          />
          <md-divider />
          <price-unit-list-item 
            :selected="usage === TwoFactorOption.USAGE.LOGIN" 
            :title="$t('message.twoFactorAuthentication.usage.login')" 
            @click="set2FAUsage(TwoFactorOption.USAGE.LOGIN)"
          />
          <md-divider />
          <price-unit-list-item 
            :selected="usage === TwoFactorOption.USAGE.TRANSACTION_AND_LOGIN" 
            :title="$t('message.twoFactorAuthentication.usage.transactionAndLogin')" 
            @click="set2FAUsage(TwoFactorOption.USAGE.TRANSACTION_AND_LOGIN)"
          />
          <md-divider />
        </template>
      </md-list>
    </div>

    <PinCodeInputPopup 
      ref="pinCodeInputPopup"
      :md-active.sync="showPinCodeInput"
      :title="$t('message.passcode.pin_popup_title')"
      :email-address="selectedSecurityUser.emailAddress"
      @codefilled="onPinCodeFilled"
      @close-click="showPinCodeInput = false"
      @fotgot-click="onFotgotClicked"
    />

    <!-- confirm to turn off 2fa popup -->
    <MDTConfirmPopup 
      :md-active.sync="showDisable2FAPopup"
      :md-title="$t('message.twoFactorAuthentication.disable2FAPopupTitle')"
      :md-content="$t('message.twoFactorAuthentication.disable2FAPopupDescription')"
      :md-confirm-text="$t('message.twoFactorAuthentication.turnOff2FA')"
      :md-cancel-text="$t('message.common.cancel')"
      @md-confirm="onDisable2FAButtonClicked"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import {
  DISABLE_2FA,
  ENABLE_2FA,
  REQUEST_VERIFICATION_CODE,
  SET_2FA_OPTION,
  SET_DONE_CALLBACK_PATH,
  SET_PIN_FOR_2FA_SETUP,
  VALIDATE_PIN_FOR_SECURITY,
} from '@/store/modules/security';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import PriceUnitListItem from '@/components/setting/PriceUnitListItem';
import OTPActionType from '@/enum/otpActionType';
import TwoFactorOption from '@/enum/twoFactorOption';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import { BACK_TO_PATH } from '@/store/modules/common';

export default {
  components: {
    MDTPrimaryButton,
    MDTConfirmPopup,
    BaseUserSettingPage,
    BaseSettingListItem,
    PriceUnitListItem,
    PinCodeInputPopup,
    SettingListSectionHeader,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    showPinCodeInput: false,
    TwoFactorOption,
    showDisable2FAPopup: false,
  }),
  metaInfo() {
    return {
      title: this.$t('message.twoFactorAuthentication.setupTitle'),
    };
  },
  computed: {
    ...mapState({
      pinFor2FASetup: state => state.security.pinFor2FASetup,
      doneCallBackPath: state => state.security.doneCallBackPath,
      matt: state => state.security.matt,
    }),
    ...mapGetters({
      selectedSecurityUser: 'getSelectedSecurityUser',
      backToPath: BACK_TO_PATH,
    }),
    method() {
      return this.selectedSecurityUser.twofaMethod;
    },
    usage() {
      return this.selectedSecurityUser.twofaUsage;
    },
    enabled: {
      get() {
        return this.selectedSecurityUser.isTwofaEnabled;
      },
      set(value) {
        if (value) {
          this.switchOn();
        } else {
          this.showDisable2FAPopup = true;
        }
      },
    },
  },
  created() {
    if (this.pin) {
      this.setPinFor2FASetup(this.pin);
    }
  },
  methods: {
    ...mapActions({
      enable2FA: ENABLE_2FA,
      set2FAOption: SET_2FA_OPTION,
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
      validatePIN: VALIDATE_PIN_FOR_SECURITY,
      disable2FA: DISABLE_2FA,
    }),
    ...mapMutations({
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setPinFor2FASetup: SET_PIN_FOR_2FA_SETUP,
    }),
    isSelectedSMS(method) {
      return (
        method === TwoFactorOption.METHOD.SMS &&
        this.selectedSecurityUser.isPhoneConfirmed
      );
    },
    isSelectedGoogleAuth(method) {
      return (
        method === TwoFactorOption.METHOD.GOOGLE &&
        this.selectedSecurityUser.isGoogleAuthEnabled
      );
    },
    set2FAMethod(method) {
      if (
        method !== this.method &&
        ((method === TwoFactorOption.METHOD.GOOGLE &&
          this.selectedSecurityUser.isGoogleAuthEnabled) ||
          (method === TwoFactorOption.METHOD.SMS &&
            this.selectedSecurityUser.isPhoneConfirmed))
      ) {
        this.set2FAOption({ method: method, usage: this.usage });
      }
    },
    set2FAUsage(usage) {
      if (usage !== this.usage) {
        this.set2FAOption({ method: this.method, usage: usage });
      }
    },
    onFotgotClicked() {
      this.$router.push({
        name: RouteDef.PinCodeForgot.name,
      });
    },
    onPinCodeFilled(pinCode) {
      this.validatePIN(pinCode)
        .catch(err => {
          this.$refs.pinCodeInputPopup.setInvalid();
          throw err;
        })
        .then(() => {
          this.setPinFor2FASetup(pinCode);
          this.setDoneCallbackPath(
            RouteDef.TwoFactorAuthenticationSetting.path,
          );
          if (this.method === TwoFactorOption.METHOD.GOOGLE) {
            this.goToGoogleAuthVerify();
          } else {
            this.goToSMSVerify();
          }
        });
    },
    goToSMSVerify() {
      this.requestVerificationCode({
        action: OTPActionType.DisableTwoFAAction,
      }).then(() => {
        this.$router.push({
          name: RouteDef.TwoFactorAuthenticationSMSVerify.name,
          params: {
            emailAddress: this.selectedSecurityUser.emailAddress,
            payloadForCallback: { pin: this.pinFor2FASetup },
            successCallback: this.switchOff,
            action: OTPActionType.DisableTwoFAAction,
          },
        });
      });
    },
    goToGoogleAuthVerify() {
      this.$router.push({
        name: RouteDef.GoogleAuthVerify.name,
        params: {
          showUserInfo: true,
          payloadForCallback: { pin: this.pinFor2FASetup },
          successCallback: this.switchOff,
        },
      });
    },
    switchOn() {
      this.enable2FA({ pin: this.pin || this.pinFor2FASetup });
    },
    switchOff({ pin, verificationCode }) {
      this.backToPath(RouteDef.TwoFactorAuthenticationSetting.path);
      this.disable2FA({ pin, verificationCode });
    },
    onDisable2FAButtonClicked() {
      this.showPinCodeInput = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.two-factor-authentication-setting-page {
  .description {
    font-size: 1rem;
    background-color: $theme-listing-bgcolor;
    margin: 0;
    padding: 1rem;
    text-align: left;
    white-space: pre-line;
  }
  /deep/ .basepage {
    .md-divider {
      height: 0;
    }
  }
  .content {
    .md-list {
      .list-item--selected {
        /deep/ .md-list-item-text {
          color: inherit;
        }
      }
      /deep/ .md-icon {
        svg {
          fill: $theme-color;
        }
      }
      /deep/ .md-switch {
        &.md-theme-default {
          .md-switch-container {
            background: $theme-disable-color-font;
            width: 52px;
            min-width: 52px;
            height: 24px;
          }
          .md-switch-thumb {
            background-color: white;
            width: 16px;
            height: 16px;
            transform: translateX(30%);
          }
          &.md-checked {
            .md-switch-container {
              background: $bluebtn-backgroundcolor;
            }
            &.md-primary {
              .md-switch-thumb {
                transform: translateX(190%);
              }
            }
          }
        }
      }
      /deep/ .header {
        padding-top: 8px;
      }
    }
  }
}
</style>
