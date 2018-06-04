<template>
  <div>
    <UserInfo :user="selectedAccount" :showMDT="false" />
    <div class="title">{{ $t('message.phone.add_phone_title') }}</div>
    <div class="content" v-html="$t('message.phone.add_phone_content')"></div>
    <PhoneInputField v-on:phoneNumberEntered="onPhoneNumberEntered" v-on:phoneNumberInvalid="onPhonenNumberInvalid"/>

    <MDTPrimaryButton :to="RouteDef.PhoneNumberVerify.path" :label="$t('message.common.next')" :disabled="phoneNumber == null"/>
    <button v-on:click="skipClicked()" class="skip-btn">{{ $t('message.common.skip') }}</button>

    <md-dialog-confirm :md-active.sync="showWarningPrompt" :md-title="$t('message.phone.skip_setup_title')"
      :md-content="$t('message.phone.skip_setup_content')" :md-cancel-text="$t('message.common.cancel')"
      :md-confirm-text="$t('message.phone.yes_skip')" @md-confirm="confirmSkip"/>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import UserInfo from '@/components/common/UserInfo';
import PhoneInputField from '@/components/common/PhoneInputField';
import MDTPrimaryButton from '@/components/common/MDTPrimaryButton';

export default {
  extends: BasePage,
  data() {
    return {
      showWarningPrompt: false,
      phoneNumber: null,
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      selectedAccount: state => state.home.selectedUser,
    }),
  },
  metaInfo() {
    return {
      title: this.$t('message.phone.title'),
    };
  },
  components: {
    UserInfo,
    PhoneInputField,
    MDTPrimaryButton,
  },
  methods: {
    skipClicked() {
      this.showWarningPrompt = true;
    },
    confirmSkip() {
      // TODO: skip the setting

    },
    onPhoneNumberEntered(phoneNumber) {
      this.phoneNumber = phoneNumber;
    },
    onPhonenNumberInvalid() {
      this.phoneNumber = null;
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
.content {
  font-size: 16px;
  text-align: left;
  color: $label-color;
  margin: 0px $defaultPageMargin 40px;
}

.primary-btn {
  bottom: 100px;
}

.skip-btn {
  @include center_horizontal;
  @include secondaryButtonSyle;
  bottom: 28px;
}

.md-dialog {
  /deep/ .md-dialog-actions {
    justify-content: space-between;

    .md-button .md-ripple{
      justify-content: left;
      padding-left: 0;
    }
  }


}
</style>
