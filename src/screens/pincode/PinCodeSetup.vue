<template>
  <div>
    <UserInfo :user="selectedUser" :showMDT="false" />
    <div class="title"> {{ instructionTitle }} </div>
    <PinCodeField :length=6 :shouldAutoFocus=true @codefilled="isPinFilled = true" @focus="isPinFilled = false"></PinCodeField>
    <MDTPrimaryButton :disabled="!isPinFilled">{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BasePage from '@/screens/BasePage';
import PinCodeField from '@/components/common/PinCodeField';
import UserInfo from '@/components/common/UserInfo';
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
    UserInfo,
    MDTPrimaryButton,
  },
  props: {
    isConfirm: {
      default: false,
      type: Boolean,
    },
    emailAddress: {
      type: String,
    },
    instructionTitle: {
      type: String,
    },
  },
  data() {
    return {
      isPinFilled: false,
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
    }),
    selectedUser() {
      return this.getUser(this.emailAddress);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  margin: 16px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: $label-color;
  margin: 24px 0px;
}

.pin-code-field {
  margin-bottom: 24px;
}

</style>
