<template>
  <form 
    class="beta-testing-form" 
    @submit.prevent="handleSubmit"
  >
    <div :class="['beta-testing-form__wrapper', { 'beta-testing-form__wrapper--active': showScreen }]">
      <div class="beta-testing-form__header">
        <h1>{{ $t('message.betaTesting.betaEndTitle') }}</h1>
      </div>
      <div class="beta-testing-form__content">
        <p v-html="$t('message.betaTesting.betaEndDescription')"/>
      </div>
      <div class="beta-testing-form__footer">
        <p v-html="$t('message.betaTesting.contactus')"/>
      </div>
    </div>
    <NDA :active.sync="showNDA" />
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { trackEvent } from '@/utils';
import { required, helpers } from 'vuelidate/lib/validators';

import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import Checkbox from '@/components/input/Checkbox';
import BaseField from '@/components/input/BaseField';
import NDA from '@/components/betaTesting/NDA';

import {
  GET_BETA_TESTING_SESSION,
  REQUEST_BETA_TESTING_SESSION,
} from '@/store/modules/betaTesting';
import { OPEN_ERROR_PROMPT } from '@/store/modules/common';

import { RouteDef } from '@/constants';

const checked = value => !helpers.req(value) || value === true;

export default {
  components: {
    MDTPrimaryButton,
    Checkbox,
    BaseField,
    NDA,
  },
  data() {
    return {
      accessCode: '',
      agree: false,
      showScreen: false,
      failed: false,
      showNDA: false,
    };
  },
  validations: {
    accessCode: {
      required,
    },
    agree: {
      checked,
    },
  },
  computed: {
    ...mapState({
      savedDeviceId: state => state.betaTesting.deviceId,
    }),
    accessCodeError() {
      if (this.failed) {
        return this.$t('message.betaTesting.accessCodeIsNotValid');
      }

      if (this.$v.accessCode.$error) {
        return this.$t('message.betaTesting.pleaseEnterAccessCode');
      }
      return '';
    },
    deviceId() {
      return this.$route.query.deviceid || this.savedDeviceId;
    },
  },
  created() {
    if (!this.deviceId) {
      this.openErrorPrompt({
        message: {
          messageId: 'message.common.unknow_error',
        },
        title: {
          messageId: 'message.common.error_title',
        },
      });
    } else {
      this.showScreen = true;
      // this.getBetaTestingSession(this.deviceId).then(sessionExists => {
      //   if (!sessionExists) {
      //     this.showScreen = true;
      //   } else {
      //     this.goToHome();
      //   }
      // });
    }
    trackEvent('Open Beta Testing url ');
  },
  methods: {
    ...mapActions({
      getBetaTestingSession: GET_BETA_TESTING_SESSION,
      requestBetaTestingSession: REQUEST_BETA_TESTING_SESSION,
      openErrorPrompt: OPEN_ERROR_PROMPT,
    }),
    goToHome() {
      this.$router.replace({
        ...RouteDef.Home,
        query: this.$route.query,
      });
    },
    handleInput(value) {
      this.failed = false;
      this.$v.accessCode.$model = value;
    },
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        trackEvent('Enter access code');
        this.requestBetaTestingSession({
          deviceId: this.deviceId,
          accessCode: this.accessCode,
        }).then(requestSuccess => {
          if (requestSuccess) {
            this.goToHome();
          } else {
            this.failed = true;
          }
        });
      }
    },
    handleClickNDA() {
      this.showNDA = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.beta-testing-form {
  background-color: $home-bgcolor;
  padding: 1.5rem;
  display: flex;

  .beta-testing-form__wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    opacity: 0;
    transition: opacity 300ms;

    &.beta-testing-form__wrapper--active {
      opacity: 1;
    }
  }
  .beta-testing-form__header {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .beta-testing-form__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 2;
    p {
      font-size: 1rem;
      color: #ffffff;
      text-align: left;
    }
  }
  .beta-testing-form__footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 2;
    p {
      font-size: 0.875rem;
      color: #ffffff;
      text-align: left;
    }
  }
}
</style>
