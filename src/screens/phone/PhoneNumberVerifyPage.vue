<template>
  <BasePhoneNumberVerifyPage :title="$t('message.phone.verify_phone_title')" @doneClick="onDoneClicked"
  :editable="false">
  </BasePhoneNumberVerifyPage>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { SET_COUNTRY_DIALCODE, SET_COUNTRY_CODE, SET_PHONENUMBER, VERIFY_VERIFICATION_CODE } from '@/store/modules/security';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.phoneNumber'),
    };
  },
  props: {
    emailAddress: {
      type: String,
    },
    nextPagePathName: {
      type: String,
    },
    payloadForNextPage: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
    }),
  },
  components: {
    BasePhoneNumberVerifyPage,
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
    onDoneClicked() {
      this.verifyVerificationCode().then(() => {
        this.$router.push(
          {
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
