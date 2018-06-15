<template>
  <div>
    <PinCodeEnterBasePage v-bind="$attrs" @click="onNextClicked">
      <div class="title" slot="title"> {{ $t('message.passcode.create_pin_title') }} </div>
      <template slot="button-text">{{ $t('message.common.nextbtn') }} </template>
    </PinCodeEnterBasePage>
  </div>
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
  methods: {
    onNextClicked(pincode) {
      this.$router.push(
        {
          name: RouteDef.PinCodeConfirm.name,
          params: {
            setupedPin: pincode,
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
