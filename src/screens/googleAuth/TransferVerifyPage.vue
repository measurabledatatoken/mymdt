<template>
  <BaseGoogleAuthVerify 
    :done-button-loading="doneButtonLoading"
    @md-confirm="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  VERIFY_GOOGLE_AUTHENTICATOR_OTP,
  DISABLE_2FA,
} from '@/store/modules/security';
import BaseGoogleAuthVerify from '@/components/googleAuth/BaseGoogleAuthVerify';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePage from '@/screens/BasePage';
import { START_TRANSFER, SET_TRANSFER_TYPE } from '@/store/modules/transfer';
import { RouteDef } from '@/constants';
import { SET_TRANSACTIONS } from '@/store/modules/ui/transferSuccess';

export default {
  components: {
    BaseGoogleAuthVerify,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      required: true,
    },
  },
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
      pinFor2FASetup: state => state.security.pinFor2FASetup,
      transferType: state => state.transfer.transferType,
    }),
  },
  methods: {
    ...mapActions({
      verifyOTP: VERIFY_GOOGLE_AUTHENTICATOR_OTP,
      backToPath: BACK_TO_PATH,
      disable2FA: DISABLE_2FA,
      startTransfer: START_TRANSFER,
    }),
    ...mapMutations({
      setTransferSuccessTransferType: SET_TRANSFER_TYPE,
      setTransferSuccessTransaction: SET_TRANSACTIONS,
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
