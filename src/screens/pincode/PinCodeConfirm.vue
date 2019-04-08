<template>
  <div>
    <PinCodeEnterBasePage
      ref="pinCodeBasePage"
      :title="$t('message.passcode.reenter_pin_title')"
      :button-text="$t('message.common.nextbtn')"
      :correct-pin-code="setupedPin"
      @click="onDoneClicked"
    />

    <SuccessPopup 
      :title="$t('message.passcode.pin_setup_successfully')" 
      :md-active.sync="showPinSetupSuccessPopup"
      :confirm-text="$t('message.common.done')" 
      icon-src="/static/icons/guarded.svg" 
      @md-confirm="onPopupDoneClicked"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import {
  SETUP_PIN,
  CHANGE_PIN,
  RESET_PIN,
  SET_PIN_FOR_SECURITY,
} from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePage from '@/screens/BasePage';
import SetupPINMode from '@/enum/setupPINMode';
import OTPActionType from '@/enum/otpActionType';
import PinCodeEnterBasePage from '@/screens/pincode/PinCodeEnterBasePage';
import SuccessPopup from '@/components/popup/SuccessPopup';
import { trackEvent } from '@/utils';

export default {
  components: {
    PinCodeEnterBasePage,
    SuccessPopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: 'PIN',
    };
  },
  props: {
    // pin enter in the setup pin page
    mode: {
      type: String,
      required: true,
      validator(value) {
        return (
          [SetupPINMode.SETUP, SetupPINMode.RESET, SetupPINMode.CHANGE].indexOf(
            value,
          ) !== -1
        );
      },
    },
    setupedPin: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showPinSetupSuccessPopup: false,
    };
  },
  computed: {
    ...mapState({
      doneCallBackPath: state => state.security.doneCallBackPath,
      verificationCode: state => state.security.verificationCode,
      oldPin: state => state.security.pin,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
    }),
  },
  methods: {
    ...mapMutations({
      setPinForSecuirty: SET_PIN_FOR_SECURITY,
    }),
    ...mapActions({
      setupPIN: SETUP_PIN,
      changePIN: CHANGE_PIN,
      resetPIN: RESET_PIN,
      backToPath: BACK_TO_PATH,
    }),
    async onDoneClicked(pincode) {
      trackEvent('Enter PIN for the second time');
      switch (this.mode) {
        case SetupPINMode.RESET:
          await this.resetPIN({
            pin: this.setupedPin,
            confirmedPIN: pincode,
            verificationCode: this.verificationCode,
          });
          trackEvent('PIN successfully reset');
          this.showPinSetupSuccessPopup = true;
          break;
        case SetupPINMode.CHANGE:
          await this.changePIN({
            oldPIN: this.oldPin,
            newPIN: this.setupedPin,
            confirmedPIN: pincode,
          });
          trackEvent('PIN successfully change');
          this.showPinSetupSuccessPopup = true;
          break;
        default:
          await this.setupPIN({
            pin: this.setupedPin,
            confirmedPIN: pincode,
          });
          this.setPinForSecuirty(pincode);
          trackEvent('PIN successfully set');
          this.showPinSetupSuccessPopup = true;
          break;
      }
    },
    onPopupDoneClicked() {
      if (!this.selectedUser.isPhoneConfirmed) {
        this.$router.push({
          name: RouteDef.PhoneNumberInput.name,
          params: {
            action: OTPActionType.SetupPhoneNumberAction,
            needSkip: true,
          },
        });
      } else {
        this.backToPath(this.doneCallBackPath);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  color: $label-color;
  margin: 24px 0px;
}
</style>
