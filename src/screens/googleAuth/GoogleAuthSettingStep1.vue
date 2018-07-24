<template>
  <div class="google-authenticator-setting-page-1">
    <BaseUserSettingPage/>
    <GoogleAuthStep
      :step-title="$t('message.googleAuth.step1Title')"
    >
      <template slot="content">
        <div>
          <img 
            src="/static/googleAuth/google-auth.png" 
            srcset="/static/googleAuth/google-auth@2x.png 2x, /static/googleAuth/google-auth@3x.png 3x" 
            alt="Google Authenticator"
          >
        </div>
        <div class="store-icons">
          <a 
            target="_blank" 
            href="https://itunes.apple.com/app/id914281815"
          >
            <img 
              v-if="isIOS"
              src="/static/googleAuth/app-store-en.svg" 
          ></a>
          <a 
            target="_blank" 
            href="http://mailti.me/android"
          >
            <img 
              v-if="isAndroid"
              src="/static/googleAuth/google-play-en.png" 
              srcset="/static/googleAuth/google-play-en@2x.png 2x, /static/googleAuth/google-play-en@3x.png 3x" 
              alt="Google Authenticator"
          ></a>
        </div>
        <div 
          class="container"
        >
          <p class="remark">
            {{ $t('message.googleAuth.step1Remark') }}
          </p>
          <MDTPrimaryButton 
            @click="goToNext()"
          >{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
        </div>
      </template>
    </GoogleAuthStep>    
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import { SET_PIN_FOR_2FA_SETUP } from '@/store/modules/security';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import GoogleAuthStep from '@/components/googleAuth/GoogleAuthSettingStep';

const userAgent = navigator.userAgent || navigator.vendor || window.opera;

export default {
  components: {
    MDTPrimaryButton,
    BaseUserSettingPage,
    GoogleAuthStep,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState({
      pinFor2FASetup: state => state.security.pinFor2FASetup,
    }),
    isIOS() {
      return (
        /ipad|iphone|ipod/.test(userAgent.toLowerCase()) && !window.MSStream
      );
    },
    isAndroid() {
      return /android/.test(userAgent.toLowerCase()) && !window.MSStream;
    },
  },
  created() {
    if (this.pin) {
      this.setPinFor2FASetup(this.pin);
    }
  },
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
    };
  },
  methods: {
    ...mapMutations({
      setPinFor2FASetup: SET_PIN_FOR_2FA_SETUP,
    }),
    goToNext() {
      this.$router.push({
        name: RouteDef.GoogleAuthSettingStep2.name,
        params: {
          pin: this.pin || this.pinForGoogleAuthSetup,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.google-authenticator-setting-page-1 {
  /deep/ .google-authenticator-setting-step {
    .remark {
      text-align: left;
    }
  }
  .store-icons {
    margin-top: 24px;
    img {
      display: block;
      margin: 0 auto;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  .remark {
    margin-top: 76px;
  }
}
</style>
