<template>
  <div>
    <PinCodeEnterBasePage ref="pinCodeBasePage" v-bind="$attrs" @click="onDoneClicked" @codefilled="onCodeFilled">
      <div class="title" slot="title"> {{ $t('message.passcode.reenter_pin_title') }} </div>
      <template slot="button-text">{{ $t('message.common.nextbtn') }} </template>
    </PinCodeEnterBasePage>

    <SuccessPopup :title="$t('message.passcode.pin_setup_successfully')" :active.aync="showPinSetupSuccessPopup" iconSrc="/static/icons/guarded.svg"
      :confirmText="$t('message.common.done')" @click="onPopupDoneClicked">
    </SuccessPopup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { SETUP_PIN } from '@/store/modules/security';
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
  },
  data() {
    return {
      showPinSetupSuccessPopup: false,
    };
  },
  methods: {
    ...mapActions({
      setupPIN: SETUP_PIN,
    }),
    onCodeFilled(pincode) {
      if (this.setupedPin !== pincode) {
        this.$refs.pinCodeBasePage.setInvalid();
      }
    },
    onDoneClicked(pincode) {
      this.setupPIN({ pin: this.setupedPin, confirmedPIN: pincode })
        .then(
          () => {
            this.showPinSetupSuccessPopup = true;
          },
        );
    },
    onPopupDoneClicked() {
      this.$router.go(-2);
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
