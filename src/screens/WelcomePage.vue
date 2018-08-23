<template>
  <form 
    class="welcome-form" 
    @submit.prevent="handleSubmit"
  >
    <div :class="['welcome-form__wrapper', { 'welcome-form__wrapper--active': showScreen }]">
      <div class="welcome-form__header">
        <h1>{{ $t('message.welcome.title') }}</h1>
      </div>
      <div class="welcome-form__content">
        <p 
          v-if="inMaintenance"
          data-cy="maintenance-message" 
          v-html="$t('message.maintenance.description')"
        />
        <p 
          v-else-if="isOSSupported" 
          v-html="$t('message.welcome.description')"
        />
        <p 
          v-else
          v-html="$t('message.welcome.OSNotSupported')"
        />
      </div>
      <div 
        v-if="isAvailable" 
        class="welcome-form__footer"
      >
        <Checkbox 
          v-model="$v.agree.$model" 
          data-cy="agree-nda"
        >
          <template
            slot="title"
          >
            <i18n path="message.welcome.agreementCheckbox1">
              <a @click.prevent.stop="handleClickNDA">{{ $t('message.welcome.agreementCheckbox2') }}</a>
            </i18n>
          </template>
        </Checkbox>
        <p>{{ $t('message.welcome.agreementDetail') }}</p>
        <MDTPrimaryButton
          :disabled="!$v.$dirty || $v.$anyError"
          data-cy="import-account"
          type="submit"
        >
          {{ $t('message.welcome.importAccounts') }}
        </MDTPrimaryButton>
      </div>
    </div>
    <NDA :active.sync="showNDA" />
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { trackEvent } from '@/utils';
import { helpers } from 'vuelidate/lib/validators';

import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import Checkbox from '@/components/input/Checkbox';
import BaseField from '@/components/input/BaseField';
import NDA from '@/components/betaTesting/NDA';

import { OPEN_ERROR_PROMPT } from '@/store/modules/common';

import { RouteDef } from '@/constants';
import { SET_NDA_AGREEMENT, REQUEST_APP_CONFIG } from '@/store/modules/home';

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
      agree: false,
      showScreen: false,
      showNDA: false,
      inMaintenance: false,
    };
  },
  validations: {
    agree: {
      checked,
    },
  },
  computed: {
    ...mapState({
      ndaAgreement: state => state.home.ndaAgreement,
      appConfig: state => state.home.appConfig,
    }),
    isAvailable() {
      return this.isAdmin || (this.isOSSupported && !this.inMaintenance);
    },
    isOSSupported() {
      // return false;
      var ua = navigator.userAgent;
      if (ua.indexOf('Android') >= 0) {
        var androidversion = parseFloat(ua.slice(ua.indexOf('Android') + 8));
        return androidversion >= 4.4;
      } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        return !(
          /OS [2-8]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent) || // ios 2 - 8
          /CPU like Mac OS X/i.test(navigator.userAgent)
        );
      } else {
        return true;
      }
    },
    isAdmin() {
      return this.$route.query.isadmin;
    },
  },
  async created() {
    await this.requestAppConfig();
    this.inMaintenance = this.appConfig.server_status !== 'active';
    if ((this.isAvailable && this.ndaAgreement) || this.isAdmin) {
      this.goToHome();
    } else {
      this.showScreen = true;
    }
    trackEvent('Open Beta Testing url ');
  },
  methods: {
    ...mapMutations({
      setNDAAgreement: SET_NDA_AGREEMENT,
    }),
    ...mapActions({
      openErrorPrompt: OPEN_ERROR_PROMPT,
      requestAppConfig: REQUEST_APP_CONFIG,
    }),
    goToHome() {
      this.$router.replace({
        ...RouteDef.Home,
        query: this.$route.query,
      });
    },
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        trackEvent('Enter access code');
        this.setNDAAgreement(true);
        this.goToHome();
      }
    },
    handleClickNDA() {
      this.showNDA = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome-form {
  background-color: $home-bgcolor;
  padding: 1.5rem;
  display: flex;

  .welcome-form__wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    opacity: 0;
    transition: opacity 300ms;

    &.welcome-form__wrapper--active {
      opacity: 1;
    }
  }
  .welcome-form__header {
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
  .welcome-form__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 3;
    p {
      font-size: 1rem;
      color: #ffffff;
      text-align: left;
    }
  }
  .welcome-form__footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: left;
    flex-grow: 2;
    p {
      font-size: 0.875rem;
      color: #ffffff;
      text-align: left;
    }
    .md-button {
      width: 100%;
    }
  }
}
</style>
