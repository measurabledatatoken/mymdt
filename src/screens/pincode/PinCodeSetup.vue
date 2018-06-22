<template>
  <PinCodeEnterBasePage
    :title="$t('message.passcode.create_pin_title')"
    :buttonText="$t('message.common.nextbtn')"
    @click="onNextClicked"
  />
</template>

<script>
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import PinCodeEnterBasePage from '@/screens/pincode/PinCodeEnterBasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: 'PIN',
    };
  },
  components: {
    PinCodeEnterBasePage,
  },
  props: {
    oldPIN: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
    doneCallBackPath: {
      default: RouteDef.UserSettings.path,
      type: String,
    },
    mode: {
      type: String,
      validator(value) {
        return ['setup', 'reset', 'change'].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    onNextClicked(pincode) {
      this.$router.push(
        {
          name: RouteDef.PinCodeConfirm.name,
          params: {
            setupedPin: pincode,
            oldPIN: this.oldPIN,
            doneCallBackPath: this.doneCallBackPath,
            mode: this.mode,
          },
        },
      );
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
