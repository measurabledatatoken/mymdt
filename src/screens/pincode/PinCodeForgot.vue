<template>
  <BaseUserSettingPage v-bind="$attrs">
    <template slot="content">

      <div class="phone-title"> {{ $t('message.settings.phoneNumber') }}</div>
      <div 
        :class="{'none': !selectedUser.phoneNumber}"
        class="phone-num"
      >
        {{ selectedUser.phoneNumber ? maskedPhoneNumber : $t('message.common.none') }}
      </div>

      <MDSubtleButton 
        :disabled="!selectedUser.phoneNumber"
        class="resend"
        data-cy="resend"
        @click="onSendVerificationCodePressed"
      >
        {{ $t('message.phone.send') }}
      </MDSubtleButton>
      <MDSubtleButton :to="RouteDef.ReportProblem.path">
        {{ $t('message.settings.stillNeedHelp') }}
      </MDSubtleButton>
    </template>
  </BaseUserSettingPage>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import { maskFullPhoneNumber } from '@/helpers/phoneUtil';
import {
  REQUEST_VERIFICATION_CODE,
  SET_SECURITY_USER_PHONE_INFO,
} from '@/store/modules/security';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BasePage from '@/screens/BasePage';
import MDSubtleButton from '@/components/button/MDTSubtleButton';
import OTPActionType from '@/enum/otpActionType';

export default {
  metaInfo() {
    return {
      title: this.$t('message.passcode.forgot_pin'),
    };
  },
  components: {
    BaseUserSettingPage,
    BasePage,
    MDSubtleButton,
  },
  extends: BasePage,
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
    }),
    maskedPhoneNumber() {
      const fullPhone = `${this.selectedUser.countryDialCode} ${
        this.selectedUser.phoneNumber
      }`;
      return maskFullPhoneNumber(fullPhone);
    },
  },
  created() {
    this.setSecurityUserInfo(this.selectedUser);
  },
  methods: {
    ...mapMutations({
      setSecurityUserInfo: SET_SECURITY_USER_PHONE_INFO,
    }),
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onSendVerificationCodePressed() {
      this.requestVerificationCode({
        action: OTPActionType.ResetPasscodeAction,
      }).then(() => {
        this.$router.push({
          name: RouteDef.PhoneNumberVerify.name,
          params: {
            action: OTPActionType.ResetPasscodeAction,
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.phone-title {
  color: $label-color;
  font-weight: bold;
  text-align: left;
  margin: 8px 0px;
}

.phone-num {
  color: $label-color;
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;

  &.none {
    color: $theme-placeholder-color;
  }
}

.md-button {
  float: left;
  margin-left: 0px;
  width: 100%;

  /deep/ .md-ripple {
    padding: 0;
    justify-content: left;
  }
}
</style>
