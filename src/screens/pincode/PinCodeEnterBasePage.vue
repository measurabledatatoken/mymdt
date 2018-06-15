<template>
    <div>
        <BaseUserSettingPage>
            <template slot="content">
                <slot name="title"></slot>
                <PinCodeField ref="pinCodeField" :length=6 :shouldAutoFocus=true @codefilled="onCodeFilled" @focus="isPinFilled = false"
                    :invalidDescription="$t('message.passcode.not_match')">

                </PinCodeField>

                <MDTPrimaryButton slot="button" :disabled="!isPinFilled" @click="$emit('click', pincode)">
                    <slot name="button-text"></slot>
                </MDTPrimaryButton>
            </template>
        </BaseUserSettingPage>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  data() {
    return {
      isPinFilled: false,
      pincode: '',
    };
  },
  computed: {
    ...mapGetters(
      {
        getSelectedSecurityUser: 'getSelectedSecurityUser',
      },
    ),
  },
  methods: {
    setInvalid() {
      this.$refs.pinCodeField.setInvalid();
      this.isPinFilled = false;
    },
    onCodeFilled(pincode) {
      this.isPinFilled = true;
      this.pincode = pincode;
      this.$emit('codefilled', pincode);
    },
  },
};
</script>

<style lang="scss" scoped>
.pin-code-field {
  margin-bottom: 24px;
}
</style>
