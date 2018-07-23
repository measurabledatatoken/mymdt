<template>
  <div class="google-authenticator-setting-page-1">
    <BaseUserSettingPage/>
    <GoogleAuthStep
      :step-title="$t('message.googleAuth.step1Title')"
    >
      <template slot="content">
        <div>
          <img 
            src="/static/googleAuth/google-auth.jpg" 
            srcset="/static/googleAuth/google-auth@2x.jpg 2x, /static/googleAuth/google-auth@3x.jpg 3x" 
            alt="Google Authenticator"
          >
        </div>
        <div>
          <img 
            src="/static/googleAuth/google-auth.jpg" 
            srcset="/static/googleAuth/google-auth@2x.jpg 2x, /static/googleAuth/google-auth@3x.jpg 3x" 
            alt="Google Authenticator"
          >
        </div>
        <p class="remark">
          {{ $t('message.googleAuth.step1Remark') }}
        </p>
        <MDTPrimaryButton 
          @click="goToNext()"
        >{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
      </template>
    </GoogleAuthStep>    
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import { SET_BACK_PATH } from '@/store/modules/security';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import GoogleAuthStep from '@/components/googleAuth/GoogleAuthSettingStep';
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
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
    };
  },
  created() {
    this.setBackPath(RouteDef.UserSettings.path);
  },
  methods: {
    ...mapMutations({
      setBackPath: SET_BACK_PATH,
    }),
    goToNext() {
      this.$router.push({
        name: RouteDef.GoogleAuthSettingStep2.name,
        params: {
          pin: this.pin,
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
}
</style>
