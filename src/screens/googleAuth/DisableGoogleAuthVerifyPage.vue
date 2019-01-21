<template>
  <BaseGoogleAuthVerify 
    :done-button-loading="doneButtonLoading" 
    @md-confirm="onDoneClicked"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { DISABLE_GOOGLE_AUTHENTICATOR } from '@/store/modules/security';
import BaseGoogleAuthVerify from '@/components/googleAuth/BaseGoogleAuthVerify';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePage from '@/screens/BasePage';

export default {
  components: {
    BaseGoogleAuthVerify,
  },
  extends: BasePage,
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
      doneCallBackPath: state => state.security.doneCallBackPath,
      pin: state => state.security.pin,
    }),
  },
  methods: {
    ...mapActions({
      disableGoogleAuth: DISABLE_GOOGLE_AUTHENTICATOR,
      backToPath: BACK_TO_PATH,
    }),
    async onDoneClicked(verificationCode) {
      try {
        this.doneButtonLoading = true;
        await this.disableGoogleAuth({
          pin: this.pin,
          verificationCode: verificationCode,
        });
        this.doneButtonLoading = false;
        this.backToPath(this.doneCallBackPath);
      } catch (error) {
        console.error(`error in disabling google auth: ${error.message}`);
        this.doneButtonLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
