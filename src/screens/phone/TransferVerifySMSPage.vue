<template>
  <BasePhoneNumberVerifyPage 
    :title="$t('message.twoFactorAuthentication.verifyTitle')"
    v-bind="$attrs"
    @doneClick="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { VERIFY_VERIFICATION_CODE } from '@/store/modules/security';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import BasePage from '@/screens/BasePage';
import { RouteDef } from '@/constants';
import { SET_TRANSFER_TYPE, START_TRANSFER } from '@/store/modules/transfer';
import { SET_TRANSACTIONS } from '@/store/modules/ui/transferSuccess';
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
    ...mapMutations({
      setTransferSuccessTransferType: SET_TRANSFER_TYPE,
      setTransferSuccessTransaction: SET_TRANSACTIONS,
    }),
    async onDoneClicked(verificationCode) {
      try {
        await this.verifyVerificationCode({
          action: OTPActionType.TransferAction,
          verificationCode,
        });
      } catch (error) {
        console.log(`error in verifying 2FA otp: ${error.message}`);
        return;
      }
      try {
        const responseData = await this.startTransfer({
          pin: this.pin,
          verificationCode: verificationCode,
        });
        this.setTransferSuccessTransferType(this.transferType);
        this.setTransferSuccessTransaction(responseData);
        this.$router.push({
          name: RouteDef.TransferSuccess.name,
        });
      } catch (error) {
        console.log(`error in starting transfer: ${error.message}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
