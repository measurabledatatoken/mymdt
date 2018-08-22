<template>
  <BaseGoogleAuthVerify 
    :done-button-loading="doneButtonLoading"
    @md-confirm="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  VERIFY_GOOGLE_AUTHENTICATOR_OTP,
  DISABLE_2FA,
} from '@/store/modules/security';
import BaseGoogleAuthVerify from '@/components/googleAuth/BaseGoogleAuthVerify';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePage from '@/screens/BasePage';

export default {
  components: {
    BaseGoogleAuthVerify,
  },
  extends: BasePage,
  data() {
    return {
      doneButtonLoading: false,
    };
  },
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
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
      verifyOTP: VERIFY_GOOGLE_AUTHENTICATOR_OTP,
      backToPath: BACK_TO_PATH,
      disable2FA: DISABLE_2FA,
    }),
    async onDoneClicked(verificationCode) {
      try {
        this.doneButtonLoading = true;
        await this.verifyOTP({
          verificationCode: verificationCode,
        });
      } catch (error) {
        console.log(`error in verify google auth otp: ${error.message}`);
        this.doneButtonLoading = false;
        return;
      }

      try {
        await this.disable2FA({
          pin: this.pin,
          verificationCode: verificationCode,
        });
        this.doneButtonLoading = false;
        console.log(this.doneCallBackPath);
        this.backToPath(this.doneCallBackPath);
      } catch (error) {
        console.log(`error in disabling 2FA: ${error.message}`);
        this.doneButtonLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
