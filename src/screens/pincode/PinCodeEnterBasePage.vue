<template>
  <div>
    <BaseUserSettingPage>
      <template slot="content">
        <h3 class="pincode-base-page__title">{{ title }}</h3>
        <PinCodeField
          ref="pinCodeField"
          :length="6"
          :should-auto-focus="true"
          :invalid-description="$t('message.passcode.not_match')"
          :correct-pin-code="correctPinCode"
          @filled="onFilled"
          @unfilled="onUnfilled"
        />
        <MDTPrimaryButton
          slot="button"
          :disabled="!isPinFilled"
          class="pincode-base-page__button"
          @click="$emit('click', pincode)"
        >
          {{ buttonText }}
        </MDTPrimaryButton>
      </template>
    </BaseUserSettingPage>
  </div>
</template>

<script>
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import PinCodeField from '@/components/common/PinCodeField';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

export default {
  extend: BasePage,
  metaInfo() {
    return {
      title: 'PIN',
    };
  },
  components: {
    PinCodeField,
    MDTPrimaryButton,
    BaseUserSettingPage,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      default: null,
    },
    correctPinCode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isPinFilled: false,
      pincode: '',
    };
  },
  methods: {
    onFilled(pincode) {
      this.isPinFilled = true;
      this.pincode = pincode;
    },
    onUnfilled() {
      this.isPinFilled = false;
      this.pincode = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.pin-code-field {
  margin-bottom: 24px;
}

.pincode-base-page__title {
  @include no-flick;
  font-size: 1rem;
  font-weight: bold;
  color: $label-color;
  margin: 1.5rem 0px;
}

.pincode-base-page__button {
  @include no-flick;
}
</style>
