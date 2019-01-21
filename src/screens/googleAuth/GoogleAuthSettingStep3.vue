<template>
  <div class="google-authenticator-setting-page-3">
    <BaseGoogleAuthVerify 
      :title="$t('message.googleAuth.step3Title')" 
      :done-button-loading="doneButtonLoading"
      @md-confirm="onDoneClicked"
    />
    <SuccessPopup 
      :title="$t('message.googleAuth.setupSuccess')"
      :md-active.sync="showGoogleAuthSetupSuccessPopup"
      :confirm-text="$t('message.common.done')"
      icon-src="/static/icons/guarded.svg"
      @md-confirm="onPopupDoneClicked"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { VERIFY_GOOGLE_AUTHENTICATOR_SECRET } from '@/store/modules/security';
import SuccessPopup from '@/components/popup/SuccessPopup';
import BaseGoogleAuthVerify from '@/components/googleAuth/BaseGoogleAuthVerify';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePage from '@/screens/BasePage';

export default {
  components: {
    SuccessPopup,
    BaseGoogleAuthVerify,
  },
  extends: BasePage,
  data() {
    return {
      doneButtonLoading: false,
      showGoogleAuthSetupSuccessPopup: false,
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
    }),
  },
  methods: {
    ...mapActions({
      verifySecret: VERIFY_GOOGLE_AUTHENTICATOR_SECRET,
      backToPath: BACK_TO_PATH,
    }),
    async onDoneClicked(verificationCode) {
      this.doneButtonLoading = true;
      try {
        await this.verifySecret({ verificationCode: verificationCode });
        this.doneButtonLoading = false;
        this.showGoogleAuthSetupSuccessPopup = true;
      } catch (error) {
        console.error(
          `error in verifying google auth secret: ${error.message}`,
        );
        this.doneButtonLoading = false;
      }
    },
    onPopupDoneClicked() {
      this.backToPath(this.doneCallBackPath);
    },
  },
};
</script>
