<template>
  <div class="google-authenticator-verify">
    <BaseUserSettingPage>
      <template slot="content">
        <div class="title">{{ title || $t('message.twoFactorAuthentication.verifyTitle') }}</div> 
        <md-list class="md-triple-line">
          <md-list-item>
            <md-avatar class="google-authenticator-screen">
              <img 
                src="/static/googleAuth/ga-code.svg" 
                alt="Google Authenticator"
              >
            </md-avatar>
            <div class="md-list-item-text">
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
          </md-list-item>
          <md-list-item>
            <MDTPrimaryButton 
              :disabled="!verificationCodeFilled"
              :loading="doneButtonLoading"
              @click="onDoneClicked()"
            > {{ $t('message.common.done') }}</MDTPrimaryButton>
          </md-list-item>
        </md-list> 
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
  // computed: {
  //   ...mapState({
  //     doneCallBackPath: state => state.security.doneCallBackPath,
  //     pinFor2FASetup: state => state.security.pinFor2FASetup,
  //   }),
  // },
  // metaInfo() {
  //   return {
  //     title: this.$t('message.googleAuth.setupTitle'),
  //   };
  // },
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
      // this.doneButtonLoading = true;
      // switch (this.mode) {
      //   case SetupGoogleAuthMode.SETUP:
      //     this.verifySecret({ verificationCode: this.verificationCode })
      //       .then(() => {
      //         this.doneButtonLoading = false;
      //         this.showGoogleAuthSetupSuccessPopup = true;
      //       })
      //       .catch(() => {
      //         this.doneButtonLoading = false;
      //       });
      //     break;
      //   case SetupGoogleAuthMode.DISABLE:
      //     this.disableGoogleAuth({
      //       pin: this.pinFor2FASetup,
      //       verificationCode: this.verificationCode,
      //     })
      //       .then(() => {
      //         this.doneButtonLoading = false;
      //         this.backToPath(this.doneCallBackPath);
      //       })
      //       .catch(() => {
      //         this.doneButtonLoading = false;
      //       });
      //     break;
      //   default:
      //     this.verifyOTP({ verificationCode: this.verificationCode })
      //       .then(() => {
      //         this.doneButtonLoading = false;
      //         this.payloadForCallback.verificationCode = this.verificationCode;
      //         this.successCallback(this.payloadForCallback);
      //       })
      //       .catch(() => {
      //         this.doneButtonLoading = false;
      //       });
      //     break;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.google-authenticator-verify {
  font-size: 16px;
  .title {
    margin: 24px 0;
    font-weight: bold;
  }
  .remark {
    text-align: left;
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
  /deep/ .md-avatar {
    &.google-authenticator-screen {
      width: 112px;
      height: 112px;
    }
  }
  /deep/ .md-progress-spinner {
    position: absolute;
    svg {
      .md-progress-spinner-circle {
        stroke: white;
      }
    }
    &.spinner-layer {
      opacity: 0.7;
    }
  }
  /deep/ .md-list {
    .md-list-item-content {
      padding: 6px 8px;
      .md-button {
        width: 100%;
        &.btn-done {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
