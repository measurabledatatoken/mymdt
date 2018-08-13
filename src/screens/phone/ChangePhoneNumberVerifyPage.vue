<template>
  <div>
    <BasePhoneNumberVerifyPage 
      :title="$t('message.phone.verify_newphone_title')"
      v-bind="$attrs"
      @editClick="onEditClicked"
      @doneClick="onDoneClicked"
    />

    <SuccessPopup 
      :title="$t('message.phone.phone_update_success')"
      :md-active.sync="showPhoneSetupSuccessPopup"
      :confirm-text="$t('message.common.done')"
      icon-src="/static/icons/guarded.svg"
      @md-confirm="onPopupDoneClicked"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { CHANGE_PHONE_NUMBER } from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import SuccessPopup from '@/components/popup/SuccessPopup';
import { trackEvent } from '@/utils';

export default {
  metaInfo() {},
  components: {
    BasePhoneNumberVerifyPage,
    SuccessPopup,
  },
  props: {
    verificationCode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showPhoneSetupSuccessPopup: false,
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
      changePhoneNumber: CHANGE_PHONE_NUMBER,
      backToPath: BACK_TO_PATH,
    }),
    onEditClicked() {
      this.$router.push({
        name: RouteDef.ChangePhoneNumberInput.name,
        params: {
          pin: this.pin,
          verificationCode: this.verificationCode,
        },
      });
    },
    onDoneClicked(verificationCode) {
      this.changePhoneNumber({
        oldVerificationCode: this.verificationCode,
        verificationCode,
        pin: this.pin,
      }).then(() => {
        trackEvent('Phone number successfully change');
        this.showPhoneSetupSuccessPopup = true;
      });
    },
    onPopupDoneClicked() {
      this.backToPath(this.doneCallBackPath);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
