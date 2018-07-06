<template>
  <BaseUserSettingPage v-bind="$attrs">
    <template slot="content">

      <div class="phone-title"> {{ $t('message.settings.phoneNumber') }}</div>
      <div class="phone-num" :class="{'none': !selectedSecurityUser.phoneNumber}">
        {{ selectedSecurityUser.phoneNumber ? this.maskedPhoneNumber : $t('message.common.none') }}
      </div>

      <MDSubtleButton @click="onSendVerificationCodePressed" class="resend" :disabled="!selectedSecurityUser.phoneNumber">
        {{ $t('message.phone.send') }}
      </MDSubtleButton>
      <MDSubtleButton :to="RouteDef.ReportProblem.path">
        {{ $t('message.settings.stillNeedHelp') }}
      </MDSubtleButton>
    </template>
  </BaseUserSettingPage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { maskFullPhoneNumber } from '@/helpers/phoneUtil';
import { REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import SetupPINMode from '@/enum/setupPINMode';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BasePage from '@/screens/BasePage';
import MDSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  metaInfo() {
    return {
      title: this.$t('message.passcode.forgot_pin'),
    };
  },
  extends: BasePage,
  components: {
    BaseUserSettingPage,
    BasePage,
    MDSubtleButton,
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapGetters(
      {
        selectedSecurityUser: 'getSelectedSecurityUser',
      },
    ),
    maskedPhoneNumber() {
      const fullPhone = `${this.selectedSecurityUser.countryDialCode} ${this.selectedSecurityUser.phoneNumber}`;
      return maskFullPhoneNumber(fullPhone);
    },
  },
  methods: {
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    onSendVerificationCodePressed() {
      this.requestVerificationCode().then(() => {
        this.$router.push(
          {
            name: RouteDef.PhoneNumberVerify.name,
            params: {
              emailAddress: this.selectedSecurityUser.emailAddress,
              nextPagePathName: RouteDef.PinCodeSetup.name,
              payloadForNextPage: {
                mode: SetupPINMode.RESET,
              },
            },
          },
        );
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
    color: $theme-placehoder-color;
  }
}

.md-button {
  float: left;
  margin-left: 0px;

  /deep/ .md-ripple {
    padding: 0;
    justify-content: left;
  }
}
</style>
