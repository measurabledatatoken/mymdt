<template>
  <BasePhoneNumberVerifyPage 
    :title="$t('message.twoFactorAuthentication.verifyTitle')"
    v-bind="$attrs"
    :action="action"
    :editable="false"
    @doneClick="onDoneClicked"
  />
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import {
  SET_COUNTRY_DIALCODE,
  SET_COUNTRY_CODE,
  SET_PHONENUMBER,
  VERIFY_VERIFICATION_CODE,
} from '@/store/modules/security';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import BasePage from '@/screens/BasePage';
import { BACK_TO_PATH } from '@/store/modules/common';

export default {
  components: {
    BasePhoneNumberVerifyPage,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.twoFactorAuthentication.setupTitle'),
    };
  },
  props: {
    emailAddress: {
      type: String,
      default: null,
    },
    successCallback: {
      type: Function,
      default: payload => {
        return payload;
      },
    },
    payloadForCallback: {
      type: Object,
      default() {
        return {};
      },
    },
    action: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState({
      doneCallBackPath: state => state.security.doneCallBackPath,
    }),
    ...mapGetters({
      getUser: 'getUser',
    }),
  },
  created() {
    const user = this.getUser(this.emailAddress);
    this.setCountryDialCode(user.countryDialCode);
    this.setCountryCode(user.countryCode);
    this.setPhoneNumber(user.phoneNumber);
  },
  methods: {
    ...mapMutations({
      setCountryDialCode: SET_COUNTRY_DIALCODE,
      setCountryCode: SET_COUNTRY_CODE,
      setPhoneNumber: SET_PHONENUMBER,
    }),
    ...mapActions({
      verifyVerificationCode: VERIFY_VERIFICATION_CODE,
      backToPath: BACK_TO_PATH,
    }),
    onDoneClicked(verificationCode) {
      this.payloadForCallback.verificationCode = verificationCode;
      console.log(this.payloadForCallback);
      this.successCallback(this.payloadForCallback);
      this.backToPath(this.doneCallBackPath);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
