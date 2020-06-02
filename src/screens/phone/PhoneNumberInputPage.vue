<template>
  <div>
    <BasePhoneNumberInputPage 
      v-bind="$attrs"
      :title="$t('message.phone.add_phone_title')"
      :content="$t('message.phone.add_phone_content')"
      @nextClick="onNextClicked"
    />
    <PinCodePopup
      :md-active.sync="showPinCode"
      :pin-setup-content="$t('message.ethBinding.pinSetupPopupDescription')"
      @codefilled="onPinCodeFilled"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { RouteDef } from '@/constants';
import { REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import PinCodePopup from '@/components/popup/PinCodePopup';
import BasePhoneNumberInputPage from '@/screens/phone/BasePhoneNumberInputPage';
import BasePage from '@/screens/BasePage';

export default {
  components: {
    BasePhoneNumberInputPage,
    PinCodePopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.phoneNumber'),
    };
  },
  data() {
    return {
      showPinCode: false,
    };
  },
  computed: {
    ...mapState({
      pin: state => state.security.pin,
    }),
  },
  methods: {
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    async onNextClicked() {
      if (!this.pin) {
        this.showPinCode = true;
        return;
      }

      this.onPinCodeFilled();
    },
    async onPinCodeFilled() {
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
