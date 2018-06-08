<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="description">{{ $t('message.reportProblem.description')}}</p>
    <BaseField :label="$t('message.reportProblem.emailAddress')" :error="$v.email.$error && $t('message.reportProblem.pleaseInputValidEmailAddress')">
      <md-input :placeholder="$t('message.reportProblem.optional')" v-model="$v.email.$model"></md-input>
    </BaseField>
    <BaseField :label="$t('message.reportProblem.comments')" :error="$v.comments.$error && $t('message.reportProblem.thisFieldIsMandatory')">
      <md-textarea
        md-autogrow
        :placeholder="$t('message.reportProblem.upTo500Characters')"
        :md-counter="500"
        :maxlength="500"
        v-model="$v.comments.$model"
      >
      </md-textarea>
    </BaseField>
    <Recaptcha
      :error="$v.isVerified.$error && $t('message.reportProblem.recaptchaFailed')"
      @verify="handleRecaptchaVerify"
      @expired="handleRecaptchaExpired"
    />
    <MDTPrimaryButton type="submit" >{{ $t('message.reportProblem.submit') }}</MDTPrimaryButton>
  </form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { required, email, helpers } from 'vuelidate/lib/validators';

import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import BaseField from '@/components/input/BaseField';
import Recaptcha from '@/components/input/Recaptcha';
import { REPORT_PROBLEM } from '@/store/modules/reportProblem';

const checked = value => !helpers.req(value) || value === true;

export default {
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
  components: {
    BaseField,
    VueRecaptcha,
    Recaptcha,
    MDTPrimaryButton,
  },
  methods: {
    handleRecaptchaVerify() {
      this.isVerified = true;
      this.$v.isVerified.$touch();
    },
    handleRecaptchaExpired() {
      this.isVerified = false;
      this.$v.isVerified.$touch();
    },
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch(REPORT_PROBLEM, {
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
