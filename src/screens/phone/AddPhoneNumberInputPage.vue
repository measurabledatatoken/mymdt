<template>
  <BasePhoneNumberInputPage 
    v-bind="$attrs"
    :title="$t('message.phone.add_phone_title')"
    :content="$t('message.phone.add_phone_content')"
    @nextClick="onNextClicked"
  />
</template>

<script>
import { mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import BasePhoneNumberInputPage from '@/screens/phone/BasePhoneNumberInputPage';
import BasePage from '@/screens/BasePage';
import OTPActionType from '@/enum/otpActionType';

export default {
  components: {
    BasePhoneNumberInputPage,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.phoneNumber'),
    };
  },
  methods: {
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onNextClicked() {
      const action = OTPActionType.SetupPhoneNumberAction;
      this.requestVerificationCode({
        action,
      }).then(() => {
        this.$router.push({
          name: RouteDef.AddPhoneNumberVerify.name,
          params: {
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
