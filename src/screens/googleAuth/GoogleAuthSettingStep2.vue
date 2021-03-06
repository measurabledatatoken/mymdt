<template>
  <div class="google-authenticator-setting-page-2">
    <BaseUserSettingPage>
      <template slot="unpaded-content">
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
            <div 
              class="container"
            >
              <MDTPrimaryButton 
                :disabled="!googleAuthSecret"
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
import { mapActions, mapState } from 'vuex';
import { RouteDef } from '@/constants';
import VueClipboard from 'vue-clipboard2';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import GoogleAuthStep from '@/components/googleAuth/GoogleAuthSettingStep';
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
  data() {
    return {
      googleAuthSecret: '',
    };
  },
  metaInfo() {
    return {
      title: this.$t('message.googleAuth.setupTitle'),
    };
  },
  computed: {
    ...mapState({
      pin: state => state.security.pin,
    }),
  },
  async created() {
    try {
      const response = await this.generateSecret({ pin: this.pin });
      this.googleAuthSecret = response.secret;
    } catch (error) {
      console.error(`error in generating google auth secret: ${error.message}`);
    }
  },
  methods: {
    ...mapActions({
      generateSecret: GENERATE_GOOGLE_AUTHENTICATOR_SECRET,
    }),
    goToNext() {
      this.$router.push({
        name: RouteDef.GoogleAuthSettingStep3.name,
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
          width: inherit;
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
