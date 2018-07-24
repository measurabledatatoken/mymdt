<template>
  <div class="google-authenticator-verify">
    <BaseUserSettingPage/>
    <GoogleAuthStep
      :step-title="stepTitle || $t('message.googleAuth.verifyTitle')"
    >
      <template slot="content">
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
    </GoogleAuthStep>    
    <SuccessPopup 
      :title="$t('message.googleAuth.setupSuccess')"
      :md-active.sync="showGoogleAuthSetupSuccessPopup"
      :confirm-text="$t('message.common.done')"
      icon-src="/static/icons/guarded.svg"
      @md-confirm="onPopupDoneClicked"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  VERIFY_GOOGLE_AUTHENTICATOR_SECRET,
  DISABLE_GOOGLE_AUTHENTICATOR,
} from '@/store/modules/security';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import GoogleAuthStep from '@/components/googleAuth/GoogleAuthSettingStep';
import SetupGoogleAuthMode from '@/enum/setupGoogleAuthMode';
import SuccessPopup from '@/components/popup/SuccessPopup';
import { BACK_TO_PATH } from '@/store/modules/common';

const VerificationCodeLength = 6;

export default {
  components: {
    MDTPrimaryButton,
    BaseUserSettingPage,
    GoogleAuthStep,
    SuccessPopup,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      default: null,
    },
    stepTitle: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      verificationCodeFilled: false,
      verificationCode: '',
      VerificationCodeLength,
      doneButtonLoading: false,
      showGoogleAuthSetupSuccessPopup: false,
    };
  },
  computed: {
    ...mapState({
      doneCallBackPath: state => state.security.doneCallBackPath,
    }),
  },
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
    };
  },
  methods: {
    ...mapActions({
      verifySecret: VERIFY_GOOGLE_AUTHENTICATOR_SECRET,
      disableGoogleAuth: DISABLE_GOOGLE_AUTHENTICATOR,
      backToPath: BACK_TO_PATH,
    }),
    onVerificationCodeInput(value) {
      if (value.length === VerificationCodeLength) {
        this.verificationCodeFilled = true;
      } else {
        this.verificationCodeFilled = false;
      }
    },
    onDoneClicked() {
      this.doneButtonLoading = true;
      switch (this.mode) {
        case SetupGoogleAuthMode.SETUP:
          this.verifySecret({ verificationCode: this.verificationCode })
            .then(() => {
              this.doneButtonLoading = false;
              this.showGoogleAuthSetupSuccessPopup = true;
            })
            .catch(() => {
              this.doneButtonLoading = false;
            });
          break;
        case SetupGoogleAuthMode.DISABLE:
          this.disableGoogleAuth({
            pin: this.pin,
            verificationCode: this.verificationCode,
          })
            .then(() => {
              this.doneButtonLoading = false;
              this.backToPath(this.doneCallBackPath);
            })
            .catch(() => {
              this.doneButtonLoading = false;
            });
          break;
        default:
          // for verification
          console.log('default');
          break;
      }
    },
    onPopupDoneClicked() {
      this.backToPath(this.doneCallBackPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.google-authenticator-verify {
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
