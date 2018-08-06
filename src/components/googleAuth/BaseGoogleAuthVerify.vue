<template>
  <div class="google-authenticator-verify">
    <BaseUserSettingPage>
      <template slot="content">
        <div class="title">{{ title || $t('message.twoFactorAuthentication.verifyTitle') }}</div> 
        <div class="container">
          <div class="google-authenticator-container">
            <md-avatar class="google-authenticator-screen">
              <img 
                src="/static/googleAuth/ga-code.svg" 
                alt="Google Authenticator"
              >
            </md-avatar>
            <div>
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
            </div>
          </div>
          <MDTPrimaryButton 
            :disabled="!verificationCodeFilled"
            :loading="doneButtonLoading"
            @click="onDoneClicked()"
          > {{ $t('message.common.done') }}</MDTPrimaryButton>
        </div>
      </template>
    </BaseUserSettingPage>
  </div>
</template>

<script>
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import GoogleAuthStep from '@/components/googleAuth/GoogleAuthSettingStep';

const VerificationCodeLength = 6;

export default {
  components: {
    MDTPrimaryButton,
    BaseUserSettingPage,
    GoogleAuthStep,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    doneButtonLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      verificationCodeFilled: false,
      verificationCode: '',
      VerificationCodeLength,
    };
  },
  methods: {
    onVerificationCodeInput(value) {
      if (value.length === VerificationCodeLength) {
        this.verificationCodeFilled = true;
      } else {
        this.verificationCodeFilled = false;
      }
    },
    async onDoneClicked() {
      this.$emit('md-confirm', this.verificationCode);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.google-authenticator-verify {
  font-size: 16px;
  .title {
    margin: 24px 0;
    font-weight: bold;
  }
  .remark {
    text-align: left;
  }
  .container {
    padding: 6px 8px;
    text-align: left;
    .google-authenticator-container {
      display: flex;
      margin-bottom: 20px;
      /deep/ .md-avatar {
        &.google-authenticator-screen {
          width: 112px;
          height: 112px;
        }
      }
    }
    /deep/ .md-button {
      width: 100%;
      &.btn-done {
        margin-top: 10px;
      }
    }
  }
}
</style>
