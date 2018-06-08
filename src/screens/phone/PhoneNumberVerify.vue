<template>
  <div>
    <BasePhoneNumberPage>
      <template slot="title">
        {{ $t('message.phone.verify_phone_title') }}
      </template>

      <template slot="content">
        {{ $t('message.phone.verify_phone_content') }}
      </template>

      <template slot="action-area">
        <div class="phone-number-cointainer">
          <div class="dail-countrycode">
            {{this.countryDailCode}}
          </div>
          <div class="phone-nbumber">
            {{this.phoneNumber}}
          </div>
          <md-button v-on:click="onEditClick()" :md-ripple="false" class="edit-btn">{{ $t('message.common.edit') }}</md-button>
        </div>

        <md-field>
          <label class="label">{{ $t('message.phone.verification_code') }}</label>
          <md-input :placeholder="$t('message.phone.verification_code_placeholder')" v-model="verificationCode"></md-input>
        </md-field>

        <CountDownUnlockButton v-on:click="onResendClick()" :secondsToCount="60" countingTranslateKey="message.phone.resend_counting"
          countDoneTranslateKey="message.phone.resend" class="resend-btn" />
        <br style="clear:both" />

        <MDTSubtleButton v-on:click="onResendClick()" class="cant-receive-btn">{{ $t('message.phone.cant_receive') }}</MDTSubtleButton>
      </template>

      <template slot="buttons">
        <MDTPrimaryButton to="/" :disabled="!verifyDone" class="done" :bottom="true"> {{ $t('message.common.done') }}</MDTPrimaryButton>
      </template>
    </BasePhoneNumberPage>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RouteDef } from '@/constants';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import CountDownUnlockButton from '@/components/common/CountDownUnlockButton';

export default {
  metaInfo() {
  },
  components: {
    BasePhoneNumberPage,
    MDTPrimaryButton,
    MDTSubtleButton,
    CountDownUnlockButton,
  },
  props: {
    countryDailCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    doneCallBackPath: {
      type: String,
    },
  },
  data() {
    return {
      verifyDone: false,
      verificationCode: '',
    };
  },
  computed: {
    ...mapState({
      selectedAccount: state => state.home.selectedUser,
    }),
    resendBtnText() {
      return this.$t('message.phone.resend', { num: 60 });
    },
  },
  methods: {
    onEditClick() {
      this.$router.push(
        {
          name: RouteDef.PhoneNumberAdd.name,
          params: {
            countryDailCode: this.countryDailCode,
            phoneNumber: this.phoneNumber,
            doneCallBackPath: this.doneCallBackPath,
          },
        },
      );
    },
    onResendClick() {

    },
    onCannotReceiveCodeClick() {

    },
  },
};
</script>

<style lang="scss" scoped>
.phone-number-cointainer {
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 20px;

  .dail-countrycode,
  .phone-nbumber {
    float: left;
    font-size: 20px;
  }

  .dail-countrycode {
    margin-left: $defaultPageMargin;
  }

  .phone-nbumber {
    margin: 0px 8px;
  }
}

.edit-btn {
  float: left;
  height: 24px;
  min-width: 40px;
  margin-top: 0;
  color: $plainbtn-wordcolor;
}

.md-button.md-raised {
  &.resend-btn,
  &.cant-receive-btn {
    width: auto;
    font-size: 16px;
    float: left;
    margin-left: $defaultPageMargin;

    /deep/ .md-ripple {
      padding-left: 0px;
    }
  }
}

.md-field {
  margin: 16px $defaultPageMargin 10px $defaultPageMargin;

  .label {
    color: $label-color;
    top: 0;
    opacity: 1;
    font-size: 14px;
    font-weight: bold;
  }

  .md-input {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
