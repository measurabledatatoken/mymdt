<template>
  <div>
    <BasePhoneNumberVerifyPage v-bind="$attrs"
                               :title="$t('message.phone.verify_phone_title')"
                               @editClick="onEditClicked"
                               @doneClick="onDoneClicked">
    </BasePhoneNumberVerifyPage>

    <SuccessPopup :title="$t('message.phone.phone_setup_success')"
                  :md-active.sync="showPhoneSetupSuccessPopup"
                  iconSrc="/static/icons/guarded.svg"
                  :confirmText="$t('message.common.done')"
                  @md-confirm="onPopupDoneClicked">
    </SuccessPopup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { ADD_PHONE_NUMBER } from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePhoneNumberVerifyPage from '@/screens/phone/BasePhoneNumberVerifyPage';
import SuccessPopup from '@/components/popup/SuccessPopup';

export default {
  metaInfo() {},
  components: {
    BasePhoneNumberVerifyPage,
    SuccessPopup,
  },
  props: {
    pin: {
      type: String,
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
    }),
  },
  methods: {
    ...mapActions({
      addPhoneNumber: ADD_PHONE_NUMBER,
      backToPath: BACK_TO_PATH,
    }),
    onEditClicked() {
      this.$router.push({
        name: RouteDef.AddPhoneNumberInput.name,
      });
    },
    onDoneClicked(verificationCode) {
      this.addPhoneNumber({ pin: this.pin, verificationCode }).then(() => {
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
