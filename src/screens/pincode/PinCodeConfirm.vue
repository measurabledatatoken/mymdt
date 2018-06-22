<template>
  <div>
    <PinCodeEnterBasePage
      ref="pinCodeBasePage"
      :title="$t('message.passcode.reenter_pin_title')"
      :buttonText="$t('message.common.nextbtn')"
      :correctPinCode="setupedPin"
      @click="onDoneClicked"
    />

    <SuccessPopup :title="$t('message.passcode.pin_setup_successfully')" :md-active.sync="showPinSetupSuccessPopup" iconSrc="/static/icons/guarded.svg"
      :confirmText="$t('message.common.done')" @md-confirm="onPopupDoneClicked">
    </SuccessPopup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { SETUP_PIN } from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePage from '@/screens/BasePage';
import PinCodeEnterBasePage from '@/screens/pincode/PinCodeEnterBasePage';
import SuccessPopup from '@/components/popup/SuccessPopup';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: 'PIN',
    };
  },
  components: {
    PinCodeEnterBasePage,
    SuccessPopup,
  },
  props: {
    // pin enter in the setup pin page
    setupedPin: {
      type: String,
    },
    doneCallBackPath: {
      default: RouteDef.UserSettings.path,
      type: String,
    },
  },
  data() {
    return {
      showPinSetupSuccessPopup: false,
    };
  },
  computed: {
    ...mapGetters({
      getSelectedSecurityUser: 'getSelectedSecurityUser',
    }),
  },
  methods: {
    ...mapActions({
      setupPIN: SETUP_PIN,
      backToPath: BACK_TO_PATH,
    }),
    onDoneClicked(pincode) {
      this.setupPIN({ pin: this.setupedPin, confirmedPIN: pincode })
        .then(
          () => {
            this.showPinSetupSuccessPopup = true;
          },
        );
    },
    onPopupDoneClicked() {
      if (!this.getSelectedSecurityUser.isPhoneConfirmed) {
        this.$router.push({
          name: RouteDef.PhoneNumberSetup.name,
          params: { needSkip: true },
          doneCallBackPath: this.doneCallBackPath,
        });
      } else {
        this.backToPath(this.doneCallBackPath);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  color: $label-color;
  margin: 24px 0px;
}
</style>
