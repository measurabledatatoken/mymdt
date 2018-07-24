<template>
  <div class="google-authenticator-setting-page-2">
    <BaseUserSettingPage/>
    <GoogleAuthStep
      :step-title="$t('message.googleAuth.step2Title')"
    >
      <template slot="content">
        <ul class="procedures">
          <li class="procedure">
            <div>
              <md-avatar class="md-avatar-icon md-small md-primary">1</md-avatar>
            </div>
            <div 
              class="procedure-content"
              v-html="$t('message.googleAuth.step2Procedure1')"
            />
          </li>
          <li class="procedure">
            <div>
              <md-avatar class="md-avatar-icon md-small md-primary">2</md-avatar>
            </div>
            <div 
              class="procedure-content"
              v-html="$t('message.googleAuth.step2Procedure2')"
            />
          </li>
          <li class="procedure">
            <div>
              <md-avatar class="md-avatar-icon md-small md-primary">3</md-avatar>
            </div>
            <div 
              class="procedure-content"
            >
              <div>{{ $t('message.googleAuth.step2Procedure3') }}</div>
              <div class="google-auth-secret">{{ googleAuthSecret }}</div>
              <MDTSecondaryButton 
                v-clipboard:copy="googleAuthSecret" 
                class="md-button-copy"
              >
                {{ $t('message.common.copy') }}
              </MDTSecondaryButton>
              <div class="remark">{{ $t('message.googleAuth.step2Procedure3Remark') }}</div>
            </div>
          </li>

          <li class="procedure">
            <div>
              <md-avatar class="md-avatar-icon md-small md-primary">4</md-avatar>
            </div>
            <div 
              class="procedure-content"
              v-html="$t('message.googleAuth.step2Procedure4')"
            />
          </li>
        </ul>
        <MDTPrimaryButton 
          :disabled="!googleAuthSecret"
          @click="goToNext()"
        >{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
      </template>
    </GoogleAuthStep>    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { RouteDef } from '@/constants';
import VueClipboard from 'vue-clipboard2';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import GoogleAuthStep from '@/components/googleAuth/GoogleAuthSettingStep';
import SetupGoogleAuthMode from '@/enum/setupGoogleAuthMode';
import { GENERATE_GOOGLE_AUTHENTICATOR_SECRET } from '@/store/modules/security';

export default {
  components: {
    VueClipboard,
    MDTPrimaryButton,
    BaseUserSettingPage,
    GoogleAuthStep,
    MDTSecondaryButton,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      googleAuthSecret: false,
    };
  },
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
    };
  },
  computed: {
    ...mapState({
      pinForGoogleAuthSetup: state => state.security.pinForGoogleAuthSetup,
    }),
  },
  created() {
    this.generateSecret({ pin: this.pin || this.pinForGoogleAuthSetup }).then(
      response => {
        this.googleAuthSecret = response.secret;
      },
    );
  },
  destroyed() {
    console.log('I am destroying');
  },
  methods: {
    ...mapActions({
      generateSecret: GENERATE_GOOGLE_AUTHENTICATOR_SECRET,
    }),
    goToNext() {
      this.$router.push({
        name: RouteDef.GoogleAuthVerify.name,
        params: {
          stepTitle: this.$t('message.googleAuth.step3Title'),
          mode: SetupGoogleAuthMode.SETUP,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.google-authenticator-setting-page-2 {
  /deep/ .google-authenticator-setting-step {
    .remark {
      text-align: left;
    }
  }
  ul.procedures {
    list-style: none;
    padding: 0;
    margin-top: 0;
    text-align: left;
    li.procedure {
      display: flex;
      margin-bottom: 16px;
      .md-avatar {
        font-size: 12px;
      }
      .procedure-content {
        padding-left: 14px;
        .google-auth-secret {
          color: $theme-color;
          font-weight: bold;
          font-size: 20px;
          margin: 20px 0;
        }
        .md-button-copy {
          margin: 0;
        }
        .remark {
          font-size: 14px;
          margin-top: 12px;
          color: $theme-placeholder-color;
        }
      }
    }
  }
}
</style>
