<template>
  <div>
    <BasePhoneNumberPage>
      <template slot="title">
        {{ title }}
      </template>

      <template slot="content">
        {{ $t('message.phone.verify_phone_content') }}
      </template>

      <template slot="action-area">
        <div class="phone-number-cointainer">
          <div class="dail-countrycode">
            {{this.countryDialCode}}
          </div>
          <div class="phone-nbumber">
            {{this.maskedPhoneNumber}}
          </div>
          <md-button v-if="editable" :md-ripple="false" class="edit-btn" @click="$router.go(-1)" >{{ $t('message.common.edit') }}</md-button>
        </div>

        <md-field :md-counter="false">
          <label class="label">{{ $t('message.phone.verification_code') }}</label>
          <md-input :maxlength="VerificationCodeLength" :placeholder="$t('message.phone.verification_code_placeholder')"
            v-model="verificationCode" pattern="\d*" @input="onVerificationCodeInput" />
        </md-field>

        <CountDownUnlockButton v-on:click="onResendClicked()" :secondsToCount="60" countingTranslateKey="message.phone.resend_counting"
          countDoneTranslateKey="message.phone.resend" class="resend-btn" />
        <br style="clear:both" />

        <MDTSubtleButton :to="RouteDef.ReportProblem.path" class="cant-receive-btn">{{ $t('message.phone.cant_receive') }}</MDTSubtleButton>
      </template>

      <template slot="buttons">
        <MDTPrimaryButton :disabled="!verificationCodeFilled" class="done" :bottom="true" @click="$emit('doneClick', verificationCode)">
          {{ $t('message.common.done') }}
        </MDTPrimaryButton>
      </template>
    </BasePhoneNumberPage>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import { SET_COUNTRY_DIALCODE, SET_COUNTRY_CODE, SET_PHONENUMBER, REQUEST_VERIFICATION_CODE } from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import { maskPhoneNumber } from '@/helpers/phoneUtil';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import CountDownUnlockButton from '@/components/common/CountDownUnlockButton';

const VerificationCodeLength = 6;

export default {
  metaInfo() {
  },
  components: {
    BasePhoneNumberPage,
    MDTPrimaryButton,
    MDTSubtleButton,
    CountDownUnlockButton,
  },
  props: {
    title: {
      type: String,
    },
    editable: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      verificationCodeFilled: false,
      verificationCode: '',
      VerificationCodeLength,
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      countryDialCode: state => state.security.countryDialCode,
      countryCode: state => state.security.countryCode,
      phoneNumber: state => state.security.phoneNumber,
      doneCallBackPath: state => state.security.doneCallBackPath,
    }),
    maskedPhoneNumber() {
      if (!this.phoneNumber) {
        return '';
      }
      return maskPhoneNumber(this.phoneNumber);
    },
  },
  methods: {
    ...mapActions({
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
      backToPath: BACK_TO_PATH,
    }),
    ...mapMutations({
      setCountryDialCode: SET_COUNTRY_DIALCODE,
      setCountryCode: SET_COUNTRY_CODE,
      setPhoneNumber: SET_PHONENUMBER,
    }),
    onVerificationCodeInput(value) {
      if (value.length === VerificationCodeLength) {
        this.verificationCodeFilled = true;
        this.$emit('verificationCodeInput', value);
      } else {
        this.verificationCodeFilled = false;
      }
    },
    onResendClicked() {
      this.requestVerificationCode(
        {
          countryDialCode: this.countryDialCode,
          countryCode: this.countryCode,
          phoneNum: this.phoneNum,
        },
      );
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
