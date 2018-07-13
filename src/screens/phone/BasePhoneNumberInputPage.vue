<template>
  <div>
    <BasePhoneNumberPage>
      <template slot="title">
        {{ title }}
      </template>

      <template slot="content">
        <p class="content_description">{{ content }}</p>
      </template>

      <template slot="action-area">
        <PhoneInputField 
          :initcountry-dial-code="countryDialCode" 
          :init-country-code="countryCode" 
          :init-phone-number="phoneNumber"
          @phoneNumberEntered="onPhoneNumberEntered" 
          @phoneNumberInvalid="onPhonenNumberInvalid"
          @countryCodeSelected="onCountryCodeSelcted"
        />
      </template>

      <template slot="buttons">
        <MDTPrimaryButton 
          :disabled="isPhoneInvalid" 
          :class="{ 'hasSkip': needSkip }" 
          class="next-button" 
          @click="onNextClicked"
        >
          {{ $t('message.common.nextbtn') }}
        </MDTPrimaryButton>
        <MDTSubtleButton 
          v-if="needSkip" 
          class="skip-btn" 
          @click="onSkipClicked"
        >
          {{ $t('message.common.skip') }}
        </MDTSubtleButton>
      </template>

    </BasePhoneNumberPage>

    <md-dialog-confirm 
      :md-active.sync="showWarningPrompt" 
      :md-title="$t('message.phone.skip_setup_title')"
      :md-content="$t('message.phone.skip_setup_content')" 
      :md-cancel-text="$t('message.common.cancel')"
      :md-confirm-text="$t('message.phone.yes_skip')" 
      @md-confirm="confirmSkip"
    />

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  SET_COUNTRY_DIALCODE,
  SET_COUNTRY_CODE,
  SET_PHONENUMBER,
} from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import PhoneInputField from '@/components/common/PhoneInputField';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import { trackEvent } from '@/utils';

export default {
  components: {
    BasePhoneNumberPage,
    PhoneInputField,
    MDTPrimaryButton,
    MDTSubtleButton,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    needSkip: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      showWarningPrompt: false,
      isPhoneInvalid: false,
    };
  },
  computed: {
    ...mapState({
      countryDialCode: state => state.security.countryDialCode,
      countryCode: state => state.security.countryCode,
      phoneNumber: state => state.security.phoneNumber,
      doneCallBackPath: state => state.security.doneCallBackPath,
    }),
  },
  methods: {
    ...mapMutations({
      setCountryDialCode: SET_COUNTRY_DIALCODE,
      setCountryCode: SET_COUNTRY_CODE,
      setPhoneNumber: SET_PHONENUMBER,
    }),
    ...mapActions({
      backToPath: BACK_TO_PATH,
    }),
    onNextClicked() {
      trackEvent('Click on Next button from Phone Input');
      this.$emit('nextClick');
    },
    onSkipClicked() {
      this.showWarningPrompt = true;
    },
    confirmSkip() {
      trackEvent('Skip adding phone number');
      this.backToPath(this.doneCallBackPath);
    },
    onPhoneNumberEntered({ countryDialCode, countryCode, phoneNumber }) {
      trackEvent('Enter phone number');
      this.setCountryDialCode(countryDialCode);
      this.setCountryCode(countryCode);
      this.setPhoneNumber(phoneNumber);
      this.isPhoneInvalid = false;
    },
    onPhonenNumberInvalid() {
      this.isPhoneInvalid = true;
    },
    onCountryCodeSelcted() {
      trackEvent('Switch country code');
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
  width: auto;
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
