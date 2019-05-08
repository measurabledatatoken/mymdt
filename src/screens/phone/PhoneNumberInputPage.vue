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
    async onNextClicked() {
      const action = this.$route.params.action;
      await this.requestVerificationCode({
        action,
      });
      this.$router.push({
        name: RouteDef.PhoneNumberVerify.name,
        params: {
          action,
          editable: true,
        },
      });
    },
  },
};
</script>

<style>
</style>
