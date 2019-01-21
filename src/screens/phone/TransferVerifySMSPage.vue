<template>
  <BasePhoneNumberVerifyPage 
    :title="$t('message.twoFactorAuthentication.verifyTitle')"
    v-bind="$attrs"
    @doneClick="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { VERIFY_VERIFICATION_CODE } from '@/store/modules/security';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import BasePage from '@/screens/BasePage';
import { RouteDef } from '@/constants';
import { START_TRANSFER } from '@/store/modules/transfer';
import OTPActionType from '@/enum/otpActionType';

export default {
  components: {
    BasePhoneNumberVerifyPage,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      required: true,
    },
  },
  metaInfo() {
    return {
      title: this.$t('message.twoFactorAuthentication.setupTitle'),
    };
  },
  computed: {
    ...mapState({
      doneCallBackPath: state => state.security.doneCallBackPath,
    }),
  },
  methods: {
    ...mapActions({
      verifyVerificationCode: VERIFY_VERIFICATION_CODE,
      startTransfer: START_TRANSFER,
    }),
    async onDoneClicked(verificationCode) {
      try {
        await this.verifyVerificationCode({
          action: OTPActionType.TransferAction,
          verificationCode,
        });
      } catch (error) {
        console.error(`error in verifying 2FA otp: ${error.message}`);
        return;
      }
      try {
        await this.startTransfer({
          pin: this.pin,
          verificationCode: verificationCode,
        });
        this.$router.push({
          name: RouteDef.TransferSuccess.name,
        });
      } catch (error) {
        console.error(`error in starting transfer: ${error.message}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
