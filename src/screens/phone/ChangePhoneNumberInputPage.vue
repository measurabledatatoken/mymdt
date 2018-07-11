<template>
  <BasePhoneNumberInputPage v-bind="$attrs"
                            :title="$t('message.phone.change_phone_title')"
                            :content="$t('message.phone.change_phone_content')"
                            @nextClick="onNextClicked">
  </BasePhoneNumberInputPage>
</template>

<script>
import { mapActions } from 'vuex';
import { REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import { RouteDef } from '@/constants';
import BasePhoneNumberInputPage from '@/screens/phone/BasePhoneNumberInputPage';
import BasePage from '@/screens/BasePage';
import OTPActionType from '@/enum/otpActionType';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.phone.title'),
    };
  },
  components: {
    BasePhoneNumberInputPage,
  },
  props: {
    pin: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
  },
  methods: {
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onNextClicked() {
      const action = OTPActionType.ChangePhoneNumberAction;
      this.requestVerificationCode({
        action,
      }).then(() => {
        this.$router.push({
          name: RouteDef.ChangePhoneNumberVerify.name,
          params: {
            pin: this.pin,
            verificationCode: this.verificationCode,
            action,
          },
        });
      });
    },
  },
};
</script>

<style>
</style>
