<template>
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
          {{ countryDialCode }}
        </div>
        <div class="phone-nbumber">
          {{ maskedPhoneNumber }}
        </div>
        <md-button 
          v-if="editable"
          :md-ripple="false"
          class="edit-btn"
          @click="$router.go(-1)"
        >{{ $t('message.common.edit') }}</md-button>
      </div>

      <md-field :md-counter="false">
        <label class="label">{{ $t('message.phone.verification_code') }}</label>
        <md-input 
          :maxlength="VerificationCodeLength"
          :placeholder="$t('message.phone.verification_code_placeholder')"
          v-model="verificationCode"
          pattern="\d*"
          @input="onVerificationCodeInput"
        />
      </md-field>

      <CountDownUnlockButton 
        :seconds-to-count="60"
        counting-translate-key="message.phone.resend_counting"
        count-done-translate-key="message.phone.resend"
        class="resend-btn"
        @click="onResendClicked()"
      />

      <MDTSubtleButton 
        :to="RouteDef.ReportProblem.path"
        class="cant-receive-btn"
      >{{ $t('message.phone.cant_receive') }}</MDTSubtleButton>
    </template>

    <template slot="buttons">
      <MDTPrimaryButton 
        :disabled="!verificationCodeFilled"
        class="done"
        @click="$emit('doneClick', verificationCode)"
      >
        {{ $t('message.common.done') }}
      </MDTPrimaryButton>
    </template>
  </BasePhoneNumberPage>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import {
  SET_COUNTRY_DIALCODE,
  SET_COUNTRY_CODE,
  SET_PHONENUMBER,
  REQUEST_VERIFICATION_CODE,
} from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import { maskPhoneNumber } from '@/helpers/phoneUtil';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import CountDownUnlockButton from '@/components/common/CountDownUnlockButton';
import { trackEvent } from '@/utils';

const VerificationCodeLength = 6;

export default {
  metaInfo() {},
  components: {
    BasePhoneNumberPage,
    MDTPrimaryButton,
    MDTSubtleButton,
    CountDownUnlockButton,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    action: {
      type: String,
      default: null,
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
  created() {
    trackEvent('Enter validate verification code Page');
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
      trackEvent('Enter Verification Code');
      if (value.length === VerificationCodeLength) {
        this.verificationCodeFilled = true;
        this.$emit('verificationCodeInput', value);
      } else {
        this.verificationCodeFilled = false;
      }
    },
    onResendClicked() {
      trackEvent('Resend verification code');
      this.requestVerificationCode({
        action: this.action,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.base-usersettingpage {
  height: 100%;

  /deep/ .padded-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
}
.content,
.phone-number-cointainer {
  width: 100%;
}

.phone-number-cointainer {
  min-height: 20px;

  .dail-countrycode,
  .phone-nbumber {
    float: left;
    font-size: 20px;
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

.md-button {
  margin-left: 0px;

  &.resend-btn,
  &.cant-receive-btn {
    width: 100%;
    text-align: left;
    font-size: 16px;

    /deep/ .md-ripple {
      padding-left: 0px;
    }

    /deep/ .md-button-content {
      width: 100%;
    }
  }

  /deep/ &.resend-btn .md-button-content {
    width: 100%;
  }
}

.md-field {
  width: 100%;
  margin-bottom: 0.5rem;

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

.md-button.md-raised.primary {
  margin-top: auto;
  margin-bottom: 30px;
}
</style>
