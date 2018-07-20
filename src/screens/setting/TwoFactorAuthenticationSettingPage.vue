<template>
  <div class="two-factor-authentication-setting-page">
    <BaseUserSettingPage/>
    <p class="description">{{ $t('message.twoFactorAuthentication.setupDescription') }}</p>
    <div class="content">
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">{{ $t('message.twoFactorAuthentication.turnOn2FA') }}</span>
          
          <md-switch 
            v-model="enabled" 
            class="md-primary"
          />
        </md-list-item>
        <md-divider />
        <div v-if="enabled">
          <md-list-item>
            <div 
              class="md-list-item-text" 
              disabled
            >
              {{ $t('message.twoFactorAuthentication.setupMethodTitle') }}
            </div>
          </md-list-item>
          <md-divider />
          <price-unit-list-item 
            :selected="method === TwoFactorOption.METHOD.SMS" 
            :title="$t('message.twoFactorAuthentication.methods.sms')" 
            @click="set2FAMethod(TwoFactorOption.METHOD.SMS)"
          />
          <md-divider />
          <price-unit-list-item 
            :selected="method === TwoFactorOption.METHOD.GOOGLE" 
            :title="$t('message.twoFactorAuthentication.methods.google')" 
            @click="set2FAMethod(TwoFactorOption.METHOD.GOOGLE)"
          />
          <md-divider /><md-list-item>
            <div 
              class="md-list-item-text" 
              disabled
            >
              {{ $t('message.twoFactorAuthentication.setupApplianceTitle') }}
            </div>
          </md-list-item>
          <md-divider />
          <price-unit-list-item 
            :selected="usage === TwoFactorOption.USAGE.TRANSACTION" 
            :title="$t('message.twoFactorAuthentication.appliances.transaction')" 
            @click="set2FAUsage(TwoFactorOption.USAGE.TRANSACTION)"
          />
          <md-divider />
          <price-unit-list-item 
            :selected="usage === TwoFactorOption.USAGE.LOGIN" 
            :title="$t('message.twoFactorAuthentication.appliances.login')" 
            @click="set2FAUsage(TwoFactorOption.USAGE.LOGIN)"
          />
          <md-divider />
          <price-unit-list-item 
            :selected="usage === TwoFactorOption.USAGE.TRANSACTION_AND_LOGIN" 
            :title="$t('message.twoFactorAuthentication.appliances.transactionAndLogin')" 
            @click="set2FAUsage(TwoFactorOption.USAGE.TRANSACTION_AND_LOGIN)"
          />
          <md-divider />
        </div>
      </md-list>
    </div>

    <PinCodeInputPopup 
      ref="pinCodeInputPopup"
      :md-active.sync="showPinCodeInput"
      :email-address="selectedSecurityUser.emailAddress"
      @codefilled="onPinCodeFilled"
      @close-click="showPinCodeInput = false"
      @fotgot-click="onFotgotClicked"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { RouteDef } from '@/constants';
import {
  GET_2FA_STATUS,
  ENABLE_2FA,
  REQUEST_VERIFICATION_CODE,
  SET_2FA_OPTION,
} from '@/store/modules/security';
import BasePage from '@/screens/BasePage';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import PriceUnitListItem from '@/components/setting/PriceUnitListItem';
import OTPActionType from '@/enum/otpActionType';
import TwoFactorOption from '@/enum/twoFactorOption';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';

export default {
  components: {
    MDTPrimaryButton,
    BaseUserSettingPage,
    BaseSettingListItem,
    PriceUnitListItem,
    PinCodeInputPopup,
  },
  extends: BasePage,
  props: {
    pin: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    showPinCodeInput: false,
    TwoFactorOption,
    method: null,
    usage: null,
    status: false,
  }),
  metaInfo() {
    return {
      title: this.$t('message.twoFactorAuthentication.setupTitle'),
    };
  },
  computed: {
    ...mapGetters({
      selectedSecurityUser: 'getSelectedSecurityUser',
    }),
    enabled: {
      get() {
        return this.status;
      },
      set() {
        if (!this.status) {
          this.enable2FA({ pin: this.pin }).then(() => {
            this.status = true;
          });
        } else {
          this.disable2FA();
        }
      },
    },
  },
  created() {
    this.get2FAStatus().then(response => {
      this.status = response['is_2fa_enabled'];
      this.method = response['2fa_method'];
      this.usage = response['2fa_usage'];
    });
  },
  methods: {
    ...mapActions({
      get2FAStatus: GET_2FA_STATUS,
      enable2FA: ENABLE_2FA,
      set2FAOption: SET_2FA_OPTION,
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    set2FAMethod(method) {
      this.method = method;
    },
    set2FAUsage(usage) {
      this.set2FAOption({ usage }).then(() => {
        this.usage = usage;
      });
    },
    onFotgotClicked() {
      this.$router.push({
        name: RouteDef.PinCodeForgot.name,
      });
    },
    onPinCodeFilled(pinCode) {
      console.log(pinCode);
    },
    disable2FA() {
      this.showPinCodeInput = true;
      const action = OTPActionType.DisableTwofaAction;
      console.log(action);
      // this.requestVerificationCode({
      //   action,
      // }).then(() => {
      //   this.status = 0;
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.two-factor-authentication-setting-page {
  .description {
    font-size: 1rem;
    background-color: $theme-listing-bgcolor;
    margin: 0;
    padding: 1rem;
    text-align: left;
    white-space: pre-line;
  }
  /deep/ .basepage {
    .md-divider {
      height: 0;
    }
  }
  .content {
    .md-list {
      .list-item--selected {
        /deep/ .md-list-item-text {
          color: inherit;
        }
      }
      /deep/ .md-icon {
        svg {
          fill: $theme-color;
        }
      }
      /deep/ .md-switch {
        &.md-theme-default {
          .md-switch-container {
            background: $theme-disable-color-font;
            width: 52px;
            min-width: 52px;
            height: 24px;
          }
          .md-switch-thumb {
            background-color: white;
            width: 16px;
            height: 16px;
            transform: translateX(30%);
          }
          &.md-checked {
            .md-switch-container {
              background: $bluebtn-backgroundcolor;
            }
            &.md-primary {
              .md-switch-thumb {
                transform: translateX(190%);
              }
            }
          }
        }
      }
    }
  }
}
</style>
