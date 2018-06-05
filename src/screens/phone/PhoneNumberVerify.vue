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

      </template>

      <template slot="buttons">
        <MDTPrimaryButton to="/" :label="$t('message.common.done')" :disabled="!verifyDone" />
        <div class="dail-countrycode">
          {{this.countryDailCode}}
        </div>
        <div class="phone-nbumber">
          {{this.phoneNumber}}
        </div>
        <md-button v-on:click="onEditClick()" :md-ripple="false" class="edit-btn">{{ $t('message.common.edit') }}</md-button>
      </template>
    </BasePhoneNumberPage>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RouteDef } from '@/constants';
import BasePhoneNumberPage from '@/screens/phone/BasePhoneNumberPage';
import MDTPrimaryButton from '@/components/common/MDTPrimaryButton';

export default {
  metaInfo() {
  },
  components: {
    BasePhoneNumberPage,
    MDTPrimaryButton,
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
    };
  },
  computed: {
    ...mapState({
      selectedAccount: state => state.home.selectedUser,
    }),
  },
  methods: {
    onEditClick() {
      console.log('onEditClick');
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
  },
};
</script>

<style lang="scss" scoped>
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

.edit-btn {
  height: 24px;
  min-width: 40px;
  float: left;
  margin-top: 0;
  color: $plainbtn-wordcolor;
}

.primary-btn {
  bottom: 24px;
}
</style>
