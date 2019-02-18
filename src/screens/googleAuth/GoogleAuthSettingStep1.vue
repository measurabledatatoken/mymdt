<template>
  <div class="google-authenticator-setting-page-1">
    <BaseUserSettingPage>
      <template slot="unpaded-content">
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
                v-if="isIOS"
                target="_blank" 
                href="http://appstore.com/googleauthenticator"
              >
                <img 
                  src="/static/googleAuth/app-store-en.svg" 
                >
              </a>
              <a 
                v-if="isAndroid"
                target="_blank" 
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
              >
                <img 
                  src="/static/googleAuth/google-play-en.png" 
                  srcset="/static/googleAuth/google-play-en@2x.png 2x, /static/googleAuth/google-play-en@3x.png 3x" 
                  alt="Google Authenticator"
                >
              </a>
            </div>
            <div>
              <p class="remark">
                {{ $t('message.googleAuth.step1Remark') }}
              </p>
              <MDTPrimaryButton 
                data-cy="next"
                @click="goToNext()"
              >{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
            </div>
          </template>
        </GoogleAuthStep> 
      </template>
    </BaseUserSettingPage>
  </div>
</template>

<script>
import { RouteDef } from '@/constants';
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
  computed: {
    isIOS() {
      return (
        /ipad|iphone|ipod/.test(userAgent.toLowerCase()) && !window.MSStream
      );
    },
    isAndroid() {
      return /android/.test(userAgent.toLowerCase()) && !window.MSStream;
    },
  },
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
    };
  },
  methods: {
    goToNext() {
      this.$router.push({
        name: RouteDef.GoogleAuthSettingStep2.name,
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
