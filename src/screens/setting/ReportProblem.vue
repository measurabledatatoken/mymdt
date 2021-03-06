<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
  >
    <p class="description">{{ $t('message.reportProblem.description') }}</p>
    <PaddedContainer>
      <BaseField
        :label="$t('message.reportProblem.emailAddress')"
        :error="$v.email.$error && $t('message.reportProblem.pleaseInputValidEmailAddress')"
        md-clearable
      >
        <md-input
          :placeholder="$t('message.reportProblem.optional')"
          :value="$v.email.$model"
          data-cy="email"
          @input="handleEmailInput"
          @change="$v.email.$touch"
        />
      </BaseField>
      <BaseField
        :label="$t('message.reportProblem.comments')"
        :error="$v.comments.$error && $t('message.reportProblem.thisFieldIsMandatory')"
      >
        <md-textarea
          :placeholder="$t('message.reportProblem.upTo500Characters')"
          :md-counter="500"
          :maxlength="500"
          v-model="$v.comments.$model"
          data-cy="problem"
          md-autogrow
        />
      </BaseField>

      <MDTSmartCaptcha @callback="handleRecaptchaVerify" />
      <MDTPrimaryButton
        :disabled="!$v.isVerified.$dirty || !$v.comments.$dirty || $v.$anyError"
        type="submit"
      >{{ $t('message.reportProblem.submit') }}</MDTPrimaryButton>
    </PaddedContainer>

  </form>
</template>

<script>
import { required, email, helpers } from 'vuelidate/lib/validators';

import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import BaseField from '@/components/input/BaseField';
import Recaptcha from '@/components/input/Recaptcha';
import { REPORT_PROBLEM } from '@/store/modules/reportProblem';
import MDTSmartCaptcha from '@/components/input/MDTSmartCaptcha';
import { trackEvent } from '@/utils';
import PaddedContainer from '@/components/containers/PaddedContainer';

const checked = value => !helpers.req(value) || value === true;

export default {
  components: {
    BaseField,
    Recaptcha,
    MDTPrimaryButton,
    MDTSmartCaptcha,
    PaddedContainer,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.reportProblem.title'),
    };
  },
  data() {
    return {
      email: '',
      comments: '',
      isVerified: false,
    };
  },
  validations: {
    email: {
      email,
    },
    comments: {
      required,
    },
    isVerified: {
      checked,
    },
  },
  methods: {
    handleEmailInput(event) {
      this.$v.email.$reset();
      this.email = event;
    },
    handleRecaptchaVerify() {
      this.isVerified = true;
      this.$v.isVerified.$touch();

      // TODO: pass token, sig and sessionId with the form and do server side verification
    },
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        trackEvent('Submit a problem report');
        this.$store.dispatch(REPORT_PROBLEM, {
          email_address: this.email,
          comments: this.comments,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  padding-bottom: 1.5rem;

  .description {
    font-size: 1rem;
    background-color: #f4f6f8;
    margin: 0;
    padding: 1rem;
    text-align: left;
    white-space: pre-line;
    margin-bottom: 0.5rem;
  }
}
</style>
