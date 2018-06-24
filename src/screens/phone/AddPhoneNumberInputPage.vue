<template>
    <BasePhoneNumberInputPage v-bind="$attrs" :title="$t('message.phone.add_phone_title')" :content="$t('message.phone.add_phone_content')"
    @nextClick="onNextClicked">
    </BasePhoneNumberInputPage>
</template>

<script>
import { mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import BasePhoneNumberInputPage from '@/screens/phone/BasePhoneNumberInputPage';
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.phoneNumber'),
    };
  },
  components: {
    BasePhoneNumberInputPage,
  },
  methods: {
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onNextClicked() {
      this.requestVerificationCode();
      this.$router.push(
        {
          name: RouteDef.AddPhoneNumberVerify.name,
        },
      );
    },
  },
};
</script>

<style>
</style>

