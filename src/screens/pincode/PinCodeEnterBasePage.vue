<template>
  <div>
    <UserInfo :user="getSelectedSecurityUser" :showMDT="false" />
    <slot name="title"></slot>
    <PinCodeField ref="pinCodeField" :length=6 :shouldAutoFocus=true @codefilled="onCodeFilled" @focus="isPinFilled = false"></PinCodeField>

    <MDTPrimaryButton slot="button" :disabled="!isPinFilled" @click="$emit('click', pincode)">
        <slot name="button-text" ></slot>
    </MDTPrimaryButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BasePage from '@/screens/BasePage';
import UserInfo from '@/components/common/UserInfo';
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
    UserInfo,
    PinCodeField,
    MDTPrimaryButton,
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
.user-info {
  margin: 16px;
}


.pin-code-field {
  margin-bottom: 24px;
}

</style>
