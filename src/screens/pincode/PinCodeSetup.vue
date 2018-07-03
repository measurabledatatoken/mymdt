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
    doneCallBackPath: {
      default: RouteDef.UserSettings.path,
      type: String,
    },
  },
  methods: {
    onNextClicked(pincode) {
      this.$router.push(
        {
          name: RouteDef.PinCodeConfirm.name,
          params: {
            setupedPin: pincode,
            doneCallBackPath: this.doneCallBackPath,
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
