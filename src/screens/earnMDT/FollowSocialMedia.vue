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
            <div class="md-title">{{ $t('message.earnMDT.follow.formTitle') }}</div>
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
      <h3 class="md-title">{{ stepTitle }}</h3>
      <div
        v-for="(step, index) in steps" 
        :key="`step-${index}`"
        :data-key="`step-${index}`"
        class="step"
      >
        <component
          v-if="step.component"
          :is="step.component"
          class="step-description"
        />
        <p v-else-if="step.description">
          {{ step.description }}
        </p>
        <div class="step-picture">
          <img
            v-if="step.src"
            :src="step.src"
            :srcset="step.srcset"
            :alt="step.alt"
          >
        </div>
      </div>
    </div>
    <BasePopup 
      :title="$t('message.earnMDT.follow.success')"
      :description="successDescription"
      :md-active.sync="showSuccessPopup"
      :confirm-text="$t('message.earnMDT.follow.goBack')"
      @md-confirm="onSuccessPopupClick"
    />
    <BasePopup 
      :title="$t('message.earnMDT.follow.incorrectRedeemCode')"
      :description="failureDescription"
      :md-active.sync="showFailurePopup"
      :confirm-text="$t('message.earnMDT.follow.confirm')"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import BasePage from '@/screens/BasePage';

import BaseField from '@/components/input/BaseField';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';
import BasePopup from '@/components/popup/BasePopup';

import { REDEEM_SNS_CODE } from '@/store/modules/entities/users';

const Step1Description = {
  components: {
    WebViewLink,
  },
  template: `
    <i18n 
      path="message.earnMDT.follow.wechat.step1" 
      tag="p"
    >
      <WebViewLink 
        to="https://www.google.com"
        external
      >
        {{ $t('message.earnMDT.follow.MailTime') }}
      </WebViewLink>
      <WebViewLink 
        to="https://www.google.com"
        external
      >
        {{ $t('message.earnMDT.follow.MDT') }}
      </WebViewLink>
      <WebViewLink 
        to="https://www.google.com"
        external
      >
        {{ $t('message.earnMDT.follow.MAI') }}
      </WebViewLink>
    </i18n>
  `,
};

export default {
  components: {
    BaseField,
    MDTMediumButton,
    WebViewLink,
    BasePopup,
  },
  extends: BasePage,
  metaInfo() {
    switch (this.$route.params.source) {
      case 'wechat':
      default: {
        return {
          title: this.$t('message.earnMDT.follow.wechat.screenTitle'),
        };
      }
    }
  },
  data() {
    let data = null;
    switch (this.$route.params.source) {
      case 'wechat':
      default: {
        data = {
          stepTitle: this.$t('message.earnMDT.follow.wechat.stepTitle'),
          steps: [
            {
              component: Step1Description,
              src: '/static/earnMDT/step-1.png',
              srcset:
                '/static/earnMDT/step-1@2x.png 2x, /static/earnMDT/step-1@3x.png 3x',
              alt: 'Step 1',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step2'),
              src: '/static/earnMDT/step-2.png',
              srcset:
                '/static/earnMDT/step-2@2x.png 2x, /static/earnMDT/step-2@3x.png 3x',
              alt: 'Step 2',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step3'),
              src: '/static/earnMDT/step-3.png',
              srcset:
                '/static/earnMDT/step-3@2x.png 2x, /static/earnMDT/step-3@3x.png 3x',
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step4'),
            },
          ],
          successDescription: this.$t(
            'message.earnMDT.follow.wechat.successDescription',
          ),
          failureDescription: this.$t(
            'message.earnMDT.follow.wechat.failureDescription',
          ),
        };
      }
    }

    return {
      code: '',
      submiting: false,
      showSuccessPopup: false,
      showFailurePopup: false,
      ...data,
    };
  },
  validations: {
    code: {
      required,
    },
  },
  methods: {
    ...mapActions({
      redeemSNSCode: REDEEM_SNS_CODE,
    }),
    onSuccessPopupClick() {
      this.$router.back();
    },
    async handleSubmit() {
      this.submiting = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await this.redeemSNSCode({
            code: this.code,
            userId: this.$route.params.account_id,
          });

          this.showSuccessPopup = true;
        } catch (error) {
          this.showFailurePopup = true;
        }

        this.submiting = false;
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

  .step {
    margin-bottom: 1rem;

    .step-description {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .step-picture {
      text-align: center;
    }
  }
}
</style>
