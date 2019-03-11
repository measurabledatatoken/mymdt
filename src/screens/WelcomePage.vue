<template>
  <form 
    :class="['welcome-form', { 'welcome-form-invalid' : !isAvailable } ]" 
    @submit.prevent="handleSubmit"
  >
    <div :class="['welcome-form__wrapper', { 'welcome-form__wrapper--active': showScreen }]">
      <div v-if="isAvailable"> 
        <swiper
          :options="swiperOption"
        >
          <!-- slides -->
          <swiper-slide> 
            <TutorialItem 
              :title="$t('message.tutorial.slide_1_title')"
              :description="$t('message.tutorial.slide_1_description')"
              img-src="/static/icons/tutorial-1.svg"
            />
            <p class="md-caption powered-by-mdt">Powered by MyMDT</p>
          </swiper-slide>
          <swiper-slide>
            <TutorialItem 
              :title="$t('message.tutorial.slide_2_title')"
              :description="$t('message.tutorial.slide_2_description')"
              img-src="/static/icons/tutorial-2.svg"
            />
            <p class="md-caption powered-by-mdt">Powered by MyMDT</p>
          </swiper-slide>
          <swiper-slide>
            <TutorialItem 
              :title="$t('message.tutorial.slide_3_title')"
              :description="$t('message.tutorial.slide_3_description')"
              img-src="/static/icons/tutorial-3.svg"
            >
              <template slot="action">
                <div 
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
              </template>
            </TutorialItem> 
            <p class="md-caption powered-by-mdt">Powered by MyMDT</p>
          </swiper-slide>
          <div 
            slot="pagination"
            class="swiper-pagination"
          />
        </swiper> 
      </div>
      <div v-else>
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
            v-else
            v-html="$t('message.welcome.OSNotSupported')"
          />
        </div>
      </div>
    </div> 
  </form>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { mapState, mapActions, mapMutations } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { trackEvent } from '@/utils';
import { helpers } from 'vuelidate/lib/validators';

import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import Checkbox from '@/components/input/Checkbox';
import TutorialItem from '@/components/tutorial/TutorialItem';

import { RouteDef } from '@/constants';
import {
  SET_NDA_AGREEMENT,
  REQUEST_APP_CONFIG,
  SET_HEADER_BACKGROUND_COLOR,
} from '@/store/modules/home';

const checked = value => !helpers.req(value) || value === true;

export default {
  components: {
    TutorialItem,
    MDTPrimaryButton,
    Checkbox,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      agree: false,
      showScreen: false,
      showNDA: false,
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
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
      return this.isOSSupported && !this.inMaintenance;
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
    inMaintenance() {
      return !this.appConfig || this.appConfig.server_status !== 'active';
    },
  },
  async created() {
    await this.requestAppConfig();
    this.setHeaderBackgroundColor(this.isAvailable && 'white');
    if ((this.isAvailable && this.ndaAgreement) || this.isAdmin) {
      this.setHeaderBackgroundColor(null);
      this.goToHome();
    } else {
      this.showScreen = true;
    }
    trackEvent('Open Welcome Page');
  },
  methods: {
    ...mapMutations({
      setNDAAgreement: SET_NDA_AGREEMENT,
      setHeaderBackgroundColor: SET_HEADER_BACKGROUND_COLOR,
    }),
    ...mapActions({
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
      trackEvent('Click on Terms and Condition');
      this.$router.push(RouteDef.LegalAndPrivacy.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  padding-bottom: 8%;
  padding-top: 4%;
}

.swiper-slide {
  width: 100%;
  height: auto;
}

.swiper-pagination {
  top: 0;
  /deep/ .swiper-pagination-bullet {
    margin: 0 10px;
  }
}

.tutorial-item {
  /deep/ {
    padding: 0;
    width: 100%;
    height: 100%;
    .tutorial-item__title {
      margin-top: 20px;
    }
    .tutorial-item__img-container {
      .icon {
        margin-top: 2%;
      }
    }
  }
}
.powered-by-mdt {
  margin-top: -10px;
}
.welcome-form {
  padding: 0 1.5rem;
  width: 100%;
  height: 100%;
  &.welcome-form-invalid {
    background-color: $home-bgcolor;
  }

  .welcome-form__wrapper {
    opacity: 0;
    transition: opacity 300ms;
    width: 100%;
    &.welcome-form__wrapper--active {
      opacity: 1;
    }
  }
  .welcome-form__header {
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .welcome-form__content {
    margin-top: 30px;
    p {
      font-size: 1rem;
      color: #ffffff;
      text-align: left;
    }
  }
  .welcome-form__footer {
    padding-top: 50px;
    /deep/ .mdt-checkbox__checkmark {
      border-color: var(
        --md-theme-default-text-accent-on-background-variant,
        rgba(0, 0, 0, 0.54)
      );
    }
    /deep/ .mdt-checkbox__title {
      color: var(
        --md-theme-default-text-accent-on-background-variant,
        rgba(0, 0, 0, 0.54)
      );
    }
    p {
      font-size: 0.875rem;
      color: var(
        --md-theme-default-text-accent-on-background-variant,
        rgba(0, 0, 0, 0.54)
      );
      text-align: left;
    }
    .md-button {
      width: 100%;
    }
  }
}
</style>
