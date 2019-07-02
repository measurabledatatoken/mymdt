<template>
  <div class="app-view">
    <div class="header">
      <div class="header-wrapper">
        <div class="header__background"/>
        <md-card>
          <form
            class="form"
            @submit.prevent="handleSubmit"
          >
            <div class="md-title">{{ $t('message.earnMDT.followWeChatFormTitle') }}</div>
            <BaseField md-clearable>
              <md-input
                v-model="$v.code.$model"
                data-cy="code"
              />
            </BaseField>
            <MDTMediumButton
              :disabled="submiting || !$v.code.$dirty || $v.$anyError"
              type="submit"
            >
              {{ $t('message.reportProblem.submit') }}
            </MDTMediumButton>
          </form>
        </md-card>
      </div>
    </div>
    <div class="steps">
      <h3 class="md-title">{{ $t('message.earnMDT.followWeChatSteps') }}</h3>
      <i18n 
        path="message.earnMDT.followInWeChatStep1" 
        tag="p"
        class="step-description"
      >
        <WebViewLink 
          to="https://www.google.com"
          external
        >
          {{ $t('message.earnMDT.MailTime') }}
        </WebViewLink>
        <WebViewLink 
          to="https://www.google.com"
          external
        >
          {{ $t('message.earnMDT.MDT') }}
        </WebViewLink>
        <WebViewLink 
          to="https://www.google.com"
          external
        >
          {{ $t('message.earnMDT.MAI') }}
        </WebViewLink>
      </i18n>
      <div class="step-picture">
        <img 
          src="/static/earnMDT/step-1.png" 
          srcset="/static/earnMDT/step-1@2x.png 2x, /static/earnMDT/step-1@3x.png 3x" 
          alt="Step 1"
        >
      </div>
      <p class="step-description">{{ $t('message.earnMDT.followInWeChatStep2') }}</p>
      <div class="step-picture">
        <img 
          src="/static/earnMDT/step-2.png" 
          srcset="/static/earnMDT/step-2@2x.png 2x, /static/earnMDT/step-2@3x.png 3x" 
          alt="Step 2"
        >
      </div>
      <p class="step-description">{{ $t('message.earnMDT.followInWeChatStep3') }}</p>
      <div class="step-picture">
        <img 
          src="/static/earnMDT/step-3.png" 
          srcset="/static/earnMDT/step-3@2x.png 2x, /static/earnMDT/step-3@3x.png 3x" 
          alt="Step 3"
        >
      </div>
      <p class="step-description">{{ $t('message.earnMDT.followInWeChatStep4') }}</p>
    </div>
    <BasePopup 
      :title="$t('message.earnMDT.success')"
      :description="$t('message.earnMDT.thankYouForFollowing')"
      :md-active.sync="showSuccessPopup"
      :confirm-text="$t('message.earnMDT.goBack')"
      @md-confirm="onSuccessPopupClick"
    />
    <BasePopup 
      :title="$t('message.earnMDT.incorrectRedeemCode')"
      :description="$t('message.earnMDT.pleaseFollowSteps')"
      :md-active.sync="showFailurePopup"
      :confirm-text="$t('message.earnMDT.confirm')"
    />
  </div>
</template>

<script>
import BasePage from '@/screens/BasePage';

import BaseField from '@/components/input/BaseField';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';
import BasePopup from '@/components/popup/BasePopup';

import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    BaseField,
    MDTMediumButton,
    WebViewLink,
    BasePopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.followWeChatTitle'),
    };
  },
  data() {
    return {
      code: '',
      submiting: false,
      showSuccessPopup: false,
      showFailurePopup: false,
    };
  },
  validations: {
    code: {
      required,
    },
  },
  methods: {
    onSuccessPopupClick() {
      this.$router.back();
    },
    handleSubmit() {
      this.submiting = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // do your submit logic here
        this.submiting = false;

        // if submit action succeeds,
        this.showSuccessPopup = true;
        // else
        // this.showFailurePopup = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$header-padding-top: 0.5rem;

.app-view {
  display: flex;
  flex-direction: column;

  /deep/ .transaction-list {
    flex: 1;
    &:after {
      content: '';
      display: block;
      height: 80px;
      width: 100%;
      flex-shrink: 0;
    }
  }
}

.header {
  .header-wrapper {
    padding-top: $header-padding-top;
    position: relative;
  }

  .header__background {
    background-color: $home-bgcolor;
    height: calc(8em + 0.5em + #{$header-padding-top});
    width: 100%;
    position: absolute;
    top: 0;
  }
}

.md-card {
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin: 0 0.5em 0.5em 0.5em;

  .form {
    padding: 1.5rem;
  }

  .base-field {
    margin: 0;

    /deep/ .md-input {
      text-align: center;
      padding: 0;
    }
  }
}

.md-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.steps {
  padding: 0 0.75rem;
  margin-top: 1.5rem;
  text-align: left;

  .step-description {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .step-picture {
    margin: 1rem 0;
    text-align: center;
  }
}
</style>
