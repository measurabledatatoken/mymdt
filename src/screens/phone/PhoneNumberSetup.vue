<template>
  <div>
    <BasePhoneNumberPage>
      <template slot="title">
        {{ $t('message.phone.add_phone_title') }}
      </template>

      <template slot="content">
        <p class="content_description">{{ $t('message.phone.add_phone_content') }}</p>
      </template>

      <template slot="action-area">
        <keep-alive>
          <PhoneInputField :initCountryDailCode="countryDailCode" :initPhoneNumber="phoneNumber" v-on:phoneNumberEntered="onPhoneNumberEntered"
            v-on:phoneNumberInvalid="onPhonenNumberInvalid" />
        </keep-alive>
      </template>

      <template slot="buttons">
        <MDTPrimaryButton v-on:click="nextClicked()" :disabled="phoneNumberObj == null" class="next-button" :class="{ 'hasSkip': needSkip }">{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
        <MDTSubtleButton v-on:click="skipClicked()" class="skip-btn" v-if="needSkip">{{ $t('message.common.skip') }}</MDTSubtleButton>
      </template>

      <md-dialog-confirm :md-active.sync="showWarningPrompt" :md-title="$t('message.phone.skip_setup_title')"
        :md-content="$t('message.phone.skip_setup_content')" :md-cancel-text="$t('message.common.cancel')"
        :md-confirm-text="$t('message.phone.yes_skip')" @md-confirm="confirmSkip" />

    </BasePhoneNumberPage>

  </div>
</template>

<script>
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import PhoneInputField from '@/components/common/PhoneInputField';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.phone.title'),
    };
  },
  components: {
    BasePhoneNumberPage,
    PhoneInputField,
    MDTPrimaryButton,
    MDTSubtleButton,
  },
  props: {
    countryDailCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    fullPhoneNumber: {
      type: String,
    },
    doneCallBackPath: {
      type: String,
    },
    needSkip: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      showWarningPrompt: false,
      phoneNumberObj: null,
    };
  },
  methods: {
    skipClicked() {
      this.showWarningPrompt = true;
    },
    nextClicked() {
      this.$router.push(
        {
          name: RouteDef.PhoneNumberVerify.name,
          params: {
            countryDailCode: this.phoneNumberObj.countryDailCode,
            phoneNumber: this.phoneNumberObj.phoneNumber,
            doneCallBackPath: this.doneCallBackPath,
          },
        },
      );
    },
    confirmSkip() {
      // TODO: skip the setting
    },
    onPhoneNumberEntered(phoneNumberObj) {
      this.phoneNumberObj = phoneNumberObj;
    },
    onPhonenNumberInvalid() {
      this.phoneNumberObj = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-button {
  position: absolute;
  bottom: 28px;

  &.hasSkip {
    bottom: 72px;
  }
}

.skip-btn {
  position: absolute;
  bottom: 12px;
}

.next-button,
.skip-btn {
  @include center_horizontal();
}

.md-dialog {
  /deep/ .md-dialog-actions {
    justify-content: space-between;

    .md-button .md-ripple {
      justify-content: left;
      padding-left: 0;
    }
  }
}

.content_description {
  white-space: pre-line;
}
</style>
