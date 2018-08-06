<template>
  <BasePhoneNumberVerifyPage 
    :title="$t('message.twoFactorAuthentication.verifyTitle')"
    v-bind="$attrs"
    @doneClick="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  VERIFY_VERIFICATION_CODE,
  DISABLE_2FA,
} from '@/store/modules/security';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import BasePage from '@/screens/BasePage';
import { BACK_TO_PATH } from '@/store/modules/common';
import OTPActionType from '@/enum/otpActionType';

export default {
  components: {
    BasePhoneNumberVerifyPage,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.twoFactorAuthentication.setupTitle'),
    };
  },
  computed: {
    ...mapState({
      doneCallBackPath: state => state.security.doneCallBackPath,
      pin: state => state.security.pin,
    }),
  },
  methods: {
    ...mapActions({
      verifyVerificationCode: VERIFY_VERIFICATION_CODE,
      disable2FA: DISABLE_2FA,
      backToPath: BACK_TO_PATH,
    }),
    async onDoneClicked(verificationCode) {
      this.setIsLoading(true);
      try {
        await this.verifyVerificationCode({
          action: OTPActionType.DisableTwoFAAction,
          verificationCode,
        });
      } catch (error) {
        console.log(`error in verifying 2FA otp: ${error.message}`);
        this.setIsLoading(false);
        return;
      }
      try {
        await this.disable2FA({
          pin: this.pin,
          verificationCode: verificationCode,
        });
        this.setIsLoading(false);
        this.backToPath(this.doneCallBackPath);
      } catch (error) {
        console.log(`error in disabling 2FA: ${error.message}`);
        this.setIsLoading(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
