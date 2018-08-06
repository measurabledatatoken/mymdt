<template>
  <BaseGoogleAuthVerify 
    :done-button-loading="doneButtonLoading"
    @md-confirm="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { VERIFY_GOOGLE_AUTHENTICATOR_OTP } from '@/store/modules/security';
import BaseGoogleAuthVerify from '@/components/googleAuth/BaseGoogleAuthVerify';
import BasePage from '@/screens/BasePage';
import { START_TRANSFER } from '@/store/modules/transfer';
import { RouteDef } from '@/constants';

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
      transferType: state => state.transfer.transferType,
    }),
  },
  methods: {
    ...mapActions({
      verifyOTP: VERIFY_GOOGLE_AUTHENTICATOR_OTP,
      startTransfer: START_TRANSFER,
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
        await this.startTransfer({
          pin: this.pin,
          verificationCode: verificationCode,
        });
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
