<template>
  <div class="app-view">
    <CardInExtendedHeader :title="$t('message.earnMDT.follow.formTitle')">
      <form
        class="form"
        @submit.prevent="handleSubmit"
      >
        <BaseField md-clearable>
          <md-input
            v-model="$v.code.$model"
            data-cy="code"
          />
        </BaseField>
        <MDTMediumButton
          :disabled="submiting || !$v.code.$dirty || $v.$anyError"
          type="submit"
        >
          {{ $t('message.reportProblem.submit') }}
        </MDTMediumButton>
      </form>
    </CardInExtendedHeader>
    <div class="steps">
      <h3 class="md-title">{{ stepTitle }}</h3>
      <div
        v-for="(step, index) in steps" 
        :key="`step-${index}`"
        :data-key="`step-${index}`"
        class="step"
      >
        <component
          v-if="step.component"
          :is="step.component"
          class="step-description"
        />
        <p v-else-if="step.description">
          {{ step.description }}
        </p>
        <div
          v-if="step.pictureComponent || step.src"
          class="step-picture"
        >
          <component
            v-if="step.pictureComponent"
            :is="step.pictureComponent"
            class="step-picture"
          />
          <img
            v-else
            :src="step.src"
            :srcset="step.srcset"
            :alt="step.alt"
          >
        </div>
      </div>
    </div>
    <BasePopup 
      :title="$t('message.earnMDT.follow.success')"
      :description="successDescription"
      :md-active.sync="showSuccessPopup"
      :confirm-text="$t('message.earnMDT.follow.goBack')"
      @md-confirm="onSuccessPopupClick"
    />
    <BasePopup 
      :title="$t('message.earnMDT.follow.incorrectRedeemCode')"
      :description="failureDescription"
      :md-active.sync="showFailurePopup"
      :confirm-text="$t('message.earnMDT.follow.confirm')"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import BasePage from '@/screens/BasePage';
import CardInExtendedHeader from '@/components/common/CardInExtendedHeader';
import BaseField from '@/components/input/BaseField';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import BasePopup from '@/components/popup/BasePopup';
import QRCode from '@/components/earnMDT/QRCode';
import FollowWeiboStep1Instruction from '@/components/earnMDT/FollowWeiboStep1Instruction';
import FollowTelegramStep1Instruction from '@/components/earnMDT/FollowTelegramStep1Instruction';
import FollowTelegramStep2Instruction from '@/components/earnMDT/FollowTelegramStep2Instruction';

import { REDEEM_SNS_CODE } from '@/store/modules/entities/users';

export default {
  components: {
    BaseField,
    MDTMediumButton,
    BasePopup,
    CardInExtendedHeader,
  },
  extends: BasePage,
  metaInfo() {
    switch (this.$route.params.source) {
      case 'weibo': {
        return {
          title: this.$t('message.earnMDT.follow.weibo.screenTitle'),
        };
      }
      case 'telegram': {
        return {
          title: this.$t('message.earnMDT.follow.telegram.screenTitle'),
        };
      }
      case 'wechat':
      default: {
        return {
          title: this.$t('message.earnMDT.follow.wechat.screenTitle'),
        };
      }
    }
  },
  data() {
    let data = null;
    switch (this.$route.params.source) {
      case 'weibo': {
        const pictureComponent = {
          components: {
            FollowWeiboStep1Instruction,
          },
          template: `
            <FollowWeiboStep1Instruction url="${this.$route.query.url}" />
          `,
        };

        data = {
          stepTitle: this.$t('message.earnMDT.follow.weibo.stepTitle'),
          steps: [
            {
              description: this.$t('message.earnMDT.follow.weibo.step1'),
              pictureComponent: pictureComponent,
            },
            {
              description: this.$t('message.earnMDT.follow.weibo.step2'),
              src: this.$t('message.earnMDT.follow.weibo.step2Src'),
              srcset: this.$t('message.earnMDT.follow.weibo.step2Srcset'),
              alt: 'Step 2',
            },
            {
              description: this.$t('message.earnMDT.follow.weibo.step3'),
              src: this.$t('message.earnMDT.follow.weibo.step3Src'),
              srcset: this.$t('message.earnMDT.follow.weibo.step3Srcset'),
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.weibo.step4'),
            },
          ],
          successDescription: this.$t(
            'message.earnMDT.follow.weibo.successDescription',
          ),
          failureDescription: this.$t(
            'message.earnMDT.follow.weibo.failureDescription',
          ),
        };
        break;
      }
      case 'telegram': {
        const pictureComponent = {
          components: {
            FollowTelegramStep1Instruction,
          },
          template: `
            <FollowTelegramStep1Instruction url="${this.$route.query.url}" />
          `,
        };

        data = {
          stepTitle: this.$t('message.earnMDT.follow.telegram.stepTitle'),
          steps: [
            {
              description: this.$t('message.earnMDT.follow.telegram.step1'),
              pictureComponent: pictureComponent,
            },
            {
              description: this.$t('message.earnMDT.follow.telegram.step2'),
              pictureComponent: FollowTelegramStep2Instruction,
            },
            {
              description: this.$t('message.earnMDT.follow.telegram.step3'),
              src: this.$t('message.earnMDT.follow.telegram.step3Src'),
              srcset: this.$t('message.earnMDT.follow.telegram.step3Srcset'),
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.telegram.step4'),
              src: this.$t('message.earnMDT.follow.telegram.step4Src'),
              srcset: this.$t('message.earnMDT.follow.telegram.step4Srcset'),
              alt: 'Step 4',
            },
            {
              description: this.$t('message.earnMDT.follow.telegram.step5'),
            },
          ],
          successDescription: this.$t(
            'message.earnMDT.follow.telegram.successDescription',
          ),
          failureDescription: this.$t(
            'message.earnMDT.follow.telegram.failureDescription',
          ),
        };
        break;
      }
      case 'wechat':
      default: {
        const QR =
          typeof this.$route.query.url === 'string'
            ? {
                components: {
                  QRCode,
                },
                template: `
                  <QRCode value="${this.$route.query.url}" />
                `,
              }
            : null;

        data = {
          stepTitle: this.$t('message.earnMDT.follow.wechat.stepTitle'),
          steps: [
            {
              description: this.$t('message.earnMDT.follow.wechat.step1'),
              pictureComponent: QR,
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step2'),
              src: this.$t('message.earnMDT.follow.wechat.step2Src'),
              srcset: this.$t('message.earnMDT.follow.wechat.step2Srcset'),
              alt: 'Step 2',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step3'),
              src: this.$t('message.earnMDT.follow.wechat.step3Src'),
              srcset: this.$t('message.earnMDT.follow.wechat.step3Srcset'),
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step4'),
              src: this.$t('message.earnMDT.follow.wechat.step4Src'),
              srcset: this.$t('message.earnMDT.follow.wechat.step4Srcset'),
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step5'),
              src: '/static/earnMDT/wechat/step-5.png',
              srcset:
                '/static/earnMDT/wechat/step-5@2x.png 2x, /static/earnMDT/wechat/step-5@3x.png 3x',
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step6'),
              src: '/static/earnMDT/wechat/step-6.png',
              srcset:
                '/static/earnMDT/wechat/step-6@2x.png 2x, /static/earnMDT/wechat/step-6@3x.png 3x',
              alt: 'Step 3',
            },
            {
              description: this.$t('message.earnMDT.follow.wechat.step7'),
            },
          ],
          successDescription: this.$t(
            'message.earnMDT.follow.wechat.successDescription',
          ),
          failureDescription: this.$t(
            'message.earnMDT.follow.wechat.failureDescription',
          ),
        };
      }
    }

    return {
      code: '',
      submiting: false,
      showSuccessPopup: false,
      showFailurePopup: false,
      ...data,
    };
  },
  validations: {
    code: {
      required,
    },
  },
  methods: {
    ...mapActions({
      redeemSNSCode: REDEEM_SNS_CODE,
    }),
    onSuccessPopupClick() {
      this.$router.back();
    },
    async handleSubmit() {
      this.submiting = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await this.redeemSNSCode({
            code: this.code,
            userId: this.$route.params.account_id,
          });

          this.showSuccessPopup = true;
        } catch (error) {
          this.showFailurePopup = true;
        }

        this.submiting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-view {
  display: flex;
  flex-direction: column;

  /deep/ .transaction-list {
    flex: 1;
    &:after {
      content: '';
      display: block;
      height: 80px;
      width: 100%;
      flex-shrink: 0;
    }
  }
}

.md-card {
  .md-card-header {
    padding-bottom: 0;
  }

  .form {
    margin-top: -1rem;
    padding: 0 0.5rem;
  }

  .base-field {
    margin: 0;

    /deep/ .md-input {
      text-align: center;
      padding: 0;
    }
  }
}

.md-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.steps {
  padding: 0 0.75rem;
  margin-top: 1.5rem;
  text-align: left;

  .step {
    margin-bottom: 1rem;

    .step-description {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .step-picture {
      text-align: center;
    }
  }
}
</style>
