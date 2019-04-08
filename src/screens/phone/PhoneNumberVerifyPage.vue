<template>
  <div>
    <BasePhoneNumberVerifyPage 
      v-bind="$attrs"
      :title="$t('message.phone.verify_phone_title')"
      @editClick="onEditClicked"
      @doneClick="onDoneClicked"
    />

    <SuccessPopup 
      :title="$t('message.phone.phone_setup_success')"
      :md-active.sync="showPhoneSetupSuccessPopup"
      :confirm-text="$t('message.common.done')"
      icon-src="/static/icons/guarded.svg"
      @md-confirm="onPopupDoneClicked"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  ADD_PHONE_NUMBER,
  CHANGE_PHONE_NUMBER,
  VERIFY_VERIFICATION_CODE,
  SET_VERIFICATION_CODE_FOR_SECURITY,
} from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import SuccessPopup from '@/components/popup/SuccessPopup';
import { trackEvent } from '@/utils';
import OTPActionType from '@/enum/otpActionType';
import { RouteDef } from '@/constants';
import SetupPINMode from '@/enum/setupPINMode';

export default {
  metaInfo() {},
  components: {
    BasePhoneNumberVerifyPage,
    SuccessPopup,
  },
  data() {
    return {
      showPhoneSetupSuccessPopup: false,
    };
  },
  computed: {
    ...mapState({
      doneCallBackPath: state => state.security.doneCallBackPath,
      pin: state => state.security.pin,
      verificationCode: state => state.security.verificationCode,
    }),
  },
  methods: {
    ...mapMutations({
      setVerificationCodeForSecurity: SET_VERIFICATION_CODE_FOR_SECURITY,
    }),
    ...mapActions({
      addPhoneNumber: ADD_PHONE_NUMBER,
      changePhoneNumber: CHANGE_PHONE_NUMBER,
      verifyVerificationCode: VERIFY_VERIFICATION_CODE,
      backToPath: BACK_TO_PATH,
    }),
    onEditClicked() {
      this.$router.back();
    },
    async onDoneClicked(verificationCode) {
      const action = this.$route.params.action;
      switch (action) {
        case OTPActionType.SetupPhoneNumberAction:
          await this.addPhoneNumber({ pin: this.pin, verificationCode });
          trackEvent('Phone number successfully set');
          this.showPhoneSetupSuccessPopup = true;
          break;
        case OTPActionType.ChangePhoneNumberAction:
          await this.changePhoneNumber({
            verificationCode,
            oldVerificationCode: this.verificationCodeForChangePhone,
            pin: this.pin,
          });
          trackEvent('Phone number successfully change');
          this.showPhoneSetupSuccessPopup = true;
          break;
        case OTPActionType.VerifyPhoneNumberAction:
          await this.verifyVerificationCode({
            verificationCode,
            action,
          });
          this.setVerificationCodeForSecurity(verificationCode);
          this.$router.push({
            name: RouteDef.PhoneNumberInput.name,
            params: { action: OTPActionType.ChangePhoneNumberAction },
          });
          trackEvent('Phone number successfully verify for changing phone');
          break;
        case OTPActionType.ResetPasscodeAction:
          await this.verifyVerificationCode({
            verificationCode,
            action,
          });
          console.log(verificationCode);
          this.setVerificationCodeForSecurity(verificationCode);
          this.$router.push({
            name: RouteDef.PinCodeSetup.name,
            params: {
              mode: SetupPINMode.RESET,
            },
          });
          trackEvent('Phone number successfully verify for forgot PIN');
          break;
        default:
          break;
      }
    },
    onPopupDoneClicked() {
      this.backToPath(this.doneCallBackPath);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
