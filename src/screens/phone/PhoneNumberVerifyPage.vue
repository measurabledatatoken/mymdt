<template>
  <BasePhoneNumberVerifyPage 
    :title="$t('message.phone.verify_phone_title')"
    v-bind="$attrs"
    :action="action"
    :editable="false"
    @doneClick="onDoneClicked"
  />
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import {
  SET_COUNTRY_DIALCODE,
  SET_COUNTRY_CODE,
  SET_PHONENUMBER,
  VERIFY_VERIFICATION_CODE,
} from '@/store/modules/security';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import BasePage from '@/screens/BasePage';

export default {
  components: {
    BasePhoneNumberVerifyPage,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.phoneNumber'),
    };
  },
  props: {
    emailAddress: {
      type: String,
      default: null,
    },
    nextPagePathName: {
      type: String,
      default: null,
    },
    payloadForNextPage: {
      type: Object,
      default: null,
    },
    action: {
      type: String,
      default: null,
    },
  },
  computed: {
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
    }),
    onDoneClicked(verificationCode) {
      this.payloadForNextPage.verificationCode = verificationCode;
      this.verifyVerificationCode({
        action: this.action,
        verificationCode,
      }).then(() => {
        this.$router.push({
          name: this.nextPagePathName,
          params: this.payloadForNextPage,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
