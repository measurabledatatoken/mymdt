<template>
  <PinCodeEnterBasePage
    :title="$t('message.passcode.create_pin_title')"
    :button-text="$t('message.common.nextbtn')"
    @click="onNextClicked"
  />
</template>

<script>
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import PinCodeEnterBasePage from '@/screens/pincode/PinCodeEnterBasePage';
import { trackEvent } from '@/utils';

export default {
  components: {
    PinCodeEnterBasePage,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: 'PIN',
    };
  },
  props: {
    oldPIN: {
      type: String,
      default: null,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
      default: null,
    },
  },
  methods: {
    onNextClicked(pincode) {
      trackEvent('Enter PIN for the first time');
      this.$router.push({
        name: RouteDef.PinCodeConfirm.name,
        params: {
          setupedPin: pincode,
          oldPIN: this.oldPIN,
          mode: this.mode,
          verificationCode: this.verificationCode,
        },
      });
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
