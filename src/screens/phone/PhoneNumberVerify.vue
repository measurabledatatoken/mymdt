<template>
  <div>
    <BasePhoneNumberPage>
      <template slot="title">
        {{ $t('message.phone.verify_phone_title') }}
      </template>

      <template slot="content">
        {{ $t('message.phone.verify_phone_content') }}
      </template>

      <template slot="action-area">
        <div class="phone-number-cointainer">
          <div class="dail-countrycode">
            {{this.countryDailCode}}
          </div>
          <div class="phone-nbumber">
            {{this.maskedPhoneNumber}}
          </div>
          <md-button v-on:click="onEditClicked()" :md-ripple="false" class="edit-btn">{{ $t('message.common.edit') }}</md-button>
        </div>

        <md-field :md-counter="false">
          <label class="label">{{ $t('message.phone.verification_code') }}</label>
          <md-input :maxlength="VerificationCodeLength" :placeholder="$t('message.phone.verification_code_placeholder')"
            v-model="verificationCode" @input="onVerificationCodeInput" />
        </md-field>

        <CountDownUnlockButton v-on:click="onResendClicked()" :secondsToCount="60" countingTranslateKey="message.phone.resend_counting"
          countDoneTranslateKey="message.phone.resend" class="resend-btn" />
        <br style="clear:both" />

        <MDTSubtleButton v-on:click="onResendClicked()" class="cant-receive-btn">{{ $t('message.phone.cant_receive') }}</MDTSubtleButton>
      </template>

      <template slot="buttons">
        <MDTPrimaryButton :disabled="!verificationCodeFilled" class="done" :bottom="true" @click="onDoneClicked">
          {{ $t('message.common.done') }}
        </MDTPrimaryButton>
      </template>
    </BasePhoneNumberPage>

    <SuccessPopup :title="$t('message.phone.phone_setup_success')" :md-active.sync="showPhoneSetupSuccessPopup"
        iconSrc="/static/icons/guarded.svg" :confirmText="$t('message.common.done')" @md-confirm="onPopupDoneClicked">
      </SuccessPopup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import { VERIFY_VERIFICATION_CODE } from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import CountDownUnlockButton from '@/components/common/CountDownUnlockButton';
import SuccessPopup from '@/components/popup/SuccessPopup';

const VerificationCodeLength = 6;

export default {
  metaInfo() {
  },
  components: {
    BasePhoneNumberPage,
    MDTPrimaryButton,
    MDTSubtleButton,
    CountDownUnlockButton,
    SuccessPopup,
  },
  props: {
    countryDailCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    doneCallBackPath: {
      type: String,
      default: RouteDef.UserSettings.path,
    },
  },
  data() {
    return {
      verificationCodeFilled: false,
      showPhoneSetupSuccessPopup: false,
      verificationCode: '',
      VerificationCodeLength,
    };
  },
  computed: {
    maskedPhoneNumber() {
      const firstSliceEndIndex = this.phoneNumber.length / 3;
      const secondSliceEndIndex = 2 * (this.phoneNumber.length / 3);

      let maskedPhoneNumber = this.phoneNumber.slice(0, firstSliceEndIndex);
      for (let i = firstSliceEndIndex; i < secondSliceEndIndex; i += 1) {
        maskedPhoneNumber = maskedPhoneNumber.concat('*');
      }
      maskedPhoneNumber = maskedPhoneNumber.concat(this.phoneNumber.slice(secondSliceEndIndex, this.phoneNumber.length));

      return maskedPhoneNumber;
    },
  },
  methods: {
    ...mapActions({
      verifyVerificationCode: VERIFY_VERIFICATION_CODE,
      backToPath: BACK_TO_PATH,
    }),
    onEditClicked() {
      this.$router.push(
        {
          name: RouteDef.PhoneNumberSetup.name,
          params: {
            countryDailCode: this.countryDailCode,
            phoneNumber: this.phoneNumber,
            doneCallBackPath: this.doneCallBackPath,
          },
        },
      );
    },
    onVerificationCodeInput(value) {
      if (value.length === VerificationCodeLength) {
        this.verificationCodeFilled = true;
      } else {
        this.verificationCodeFilled = false;
      }
    },
    onDoneClicked() {
      this.verifyVerificationCode(
        {
          countryCode: this.countryDailCode,
          phoneNum: this.phoneNumber,
          verificationCode: this.verificationCode,
        },
      ).then(() => {
        this.showPhoneSetupSuccessPopup = true;
      });
    },
    onPopupDoneClicked() {
      this.backToPath(this.doneCallBackPath);
    },
    onResendClicked() {

    },
    onCannotReceiveCodeClicked() {

    },
  },
};
</script>

<style lang="scss" scoped>
.phone-number-cointainer {
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 20px;

  .dail-countrycode,
  .phone-nbumber {
    float: left;
    font-size: 20px;
  }

  .dail-countrycode {
    margin-left: $defaultPageMargin;
  }

  .phone-nbumber {
    margin: 0px 8px;
  }
}

.edit-btn {
  float: left;
  height: 24px;
  min-width: 40px;
  margin-top: 0;
  color: $plainbtn-wordcolor;
}

.md-button.md-raised {
  &.resend-btn,
  &.cant-receive-btn {
    width: auto;
    font-size: 16px;
    float: left;
    margin-left: $defaultPageMargin;

    /deep/ .md-ripple {
      padding-left: 0px;
    }
  }
}

.md-field {
  margin: 16px $defaultPageMargin 10px $defaultPageMargin;
  width: calc(100% - 2 * #{$defaultPageMargin});

  .label {
    color: $label-color;
    top: 0;
    opacity: 1;
    font-size: 14px;
    font-weight: bold;
  }

  .md-input {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
