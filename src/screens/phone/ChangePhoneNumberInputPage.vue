<template>
    <BasePhoneNumberInputPage v-bind="$attrs" :title="$t('message.phone.change_phone_title')" :content="$t('message.phone.change_phone_content')"
    @nextClick="onNextClicked">
    </BasePhoneNumberInputPage>
</template>

<script>
import { RouteDef } from '@/constants';
import BasePhoneNumberInputPage from '@/screens/phone/BasePhoneNumberInputPage';
import BasePage from '@/screens/BasePage';

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
  },
  methods: {
    onNextClicked() {
      this.$router.push(
        {
          name: RouteDef.ChangePhoneNumberVerify.name,
          params: {
            pin: this.pin,
          },
        },
      );
    },
  },
};
</script>

<style>
</style>
