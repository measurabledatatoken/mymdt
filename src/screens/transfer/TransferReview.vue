<template>
  <PaddedContainer class="transfer-review">
    <div class="review-content">
      <div class="from-lbl">{{ $t('message.transfer.fromlbl') }}</div>
      <div class="from-value">{{ selectedUser.emailAddress }}</div>
      <div class="to-lbl">{{ $t('message.transfer.tolbl') }}</div>
      <div class="to-value">{{ transferToStr }}</div>
      <div
        v-if="transferNote" 
        class="note-lbl"
      >
        {{ $t('message.transfer.notelbl') }}
      </div>
      <div
        v-if="transferNote"
        class="note-value"
      >
        {{ transferNote }}
      </div>

      <div 
        v-if="transferType === TransferType.Email" 
        class="amount-container-email"
      >
        <md-divider/>
        <div class="amount-container">
          <div class="amount-lbl">{{ $t('message.transfer.amountlbl') }}</div>
          <div class="amount-unit">MDT</div>
          <div class="amount-value">{{ formatAmount(transferAmount) }}</div>
        </div>
      </div>

      <div 
        v-if="transferType === TransferType.EthWallet" 
        class="amount-container-eth"
      >
        <div class="amount-container">
          <div class="amount-lbl">{{ $t('message.transfer.amountlbl') }}</div>
          <div class="amount-unit">MDT</div>
          <div class="amount-value">{{ formatAmount(transferAmount) }}</div>
        </div>

        <div class="transaction-fee-container">
          <div class="transaction-fee-lbl">{{ $t('message.transfer.transaction_fee') }}</div>
          <div class="amount-unit">MDT</div>
          <div class="transaction-fee-value"> {{ formatAmount(transactionFee) }}</div>
        </div>

        <md-divider/>
        <div class="final-amount-container">
          <div class="final-amount-lbl">{{ $t('message.transfer.final_amount') }}</div>
          <div class="amount-unit">MDT</div>
          <div 
            :class="{ 'negative': isFinalAmountSmallerThanZero }" 
            class="final-amount-value"
          > {{ finalAmountStr }}</div>
        </div>

      </div>
    </div>
    <MDTSmartCaptcha @callback="handleRecaptchaVerify" />
    <MDTPrimaryButton 
      :bottom="true" 
      :disabled="!isCaptchaPassed"
      @click="transferMDT"
    >
      {{ $t('message.common.transferbtn') }}
    </MDTPrimaryButton>

    <PinCodeInputPopup 
      ref="pinCodeInputPopup" 
      :md-active.sync="showPinCodeInput" 
      :title="$t('message.passcode.pin_popup_title')"
      @codefilled="onPinCodeFilled" 
      @close-click="showPinCodeInput = false"
    />

    <MDTConfirmPopup 
      :md-active.sync="showSetupPinDialog"
      :md-title="$t('message.passcode.pin_setup_remind_title')" 
      :md-content="$t('message.passcode.pin_setup_remind_content')"
      :md-confirm-text="$t('message.common.setup')" 
      :md-cancel-text="$t('message.common.cancel')"
      data-cy="setup-pin-dialog" 
      @md-confirm="onConfirmSetupPinDialogClick"
    />

    <MDTConfirmPopup 
      :md-active.sync="showSetupPhoneDialog"
      :md-title="$t('message.phone.add_phone_title')" 
      :md-content="$t('message.phone.add_phone_content')"
      :md-confirm-text="$t('message.common.setup')" 
      :md-cancel-text="$t('message.common.cancel')"
      data-cy="setup-phone-dialog" 
      @md-confirm="onConfirmSetupPhoneDialogClick"
    />

  </PaddedContainer>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { formatAmount, trackEvent } from '@/utils';
import TransferType from '@/enum/transferType';
import { RouteDef } from '@/constants';

import { START_TRANSFER } from '@/store/modules/transfer';
import {
  SET_DONE_CALLBACK_PATH,
  SET_COUNTRY_DIALCODE,
  SET_PHONENUMBER,
  VALIDATE_PIN,
  REQUEST_VERIFICATION_CODE,
  SET_PIN_FOR_SECURITY,
} from '@/store/modules/security';

import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';
import PaddedContainer from '@/components/containers/PaddedContainer';
import MDTSmartCaptcha from '@/components/input/MDTSmartCaptcha';
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';

import OTPActionType from '@/enum/otpActionType';
import TwoFactorOption from '@/enum/twoFactorOption';
import SetupPINMode from '@/enum/setupPINMode';

export default {
  components: {
    MDTPrimaryButton,
    PinCodeInputPopup,
    PaddedContainer,
    MDTSmartCaptcha,
    MDTConfirmPopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.reviewtitle'),
    };
  },
  data() {
    return {
      TransferType,
      showPinCodeInput: false,
      isVerified: false,
      showSetupPinDialog: false,
      showSetupPhoneDialog: false,
    };
  },
  computed: {
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
      transferType: state => state.transfer.transferType,
      transferToAccount: state => state.transfer.transferToAccount,
      transferNote: state => state.transfer.transferNote,
      transferToWalletAddress: state => state.transfer.transferToWalletAddress,
    }),
    ...mapGetters({
      transactionFee: 'transactionFee',
      finalAmount: 'finalAmount',
      selectedUser: 'getSelectedUser',
    }),
    transferToStr() {
      if (this.transferType === TransferType.EthWallet) {
        return this.transferToWalletAddress;
      }
      return this.transferToAccount.emailAddress;
    },
    finalAmountStr() {
      return this.finalAmount <= 0 ? '--' : formatAmount(this.finalAmount);
    },
    isWalletAmountValid() {
      return this.transferAmount < this.selectedUser.mdtBalance;
    },
    isFinalAmountSmallerThanZero() {
      if (this.finalAmount <= 0) {
        return true;
      }
      return false;
    },
    isCaptchaPassed() {
      return process.env.NODE_ENV === 'development' || this.isVerified;
    },
  },
  created() {
    trackEvent('View "Transfer review" Page', {
      'Transfer Mode': this.transferType,
    });
  },
  methods: {
    ...mapMutations({
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setCountryDialCode: SET_COUNTRY_DIALCODE,
      setPhoneNumber: SET_PHONENUMBER,
      setPinForSecuirty: SET_PIN_FOR_SECURITY,
    }),
    ...mapActions({
      startTransfer: START_TRANSFER,
      validatePIN: VALIDATE_PIN,
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    handleRecaptchaVerify() {
      this.isVerified = true;
      // TODO: pass token, sig and sessionId with the form and do server side verification
    },
    onConfirmSetupPinDialogClick() {
      trackEvent('Start Setting up PIN from the popup on transfer review page');
      this.setDoneCallbackPath(this.$router.currentRoute.path);
      this.$router.push({
        name: RouteDef.PinCodeSetup.name,
        params: {
          mode: SetupPINMode.SETUP,
        },
      });
    },
    onConfirmSetupPhoneDialogClick() {
      trackEvent(
        'Start Setting up Phone from the popup on transfer review page',
      );
      this.setDoneCallbackPath(this.$router.currentRoute.path);
      this.$router.push({
        name: RouteDef.AddPhoneNumberInput.name,
      });
    },
    async goToSMSVerify() {
      this.setCountryDialCode(this.selectedUser.countryDialCode);
      this.setPhoneNumber(this.selectedUser.phoneNumber);
      try {
        await this.requestVerificationCode({
          action: OTPActionType.TransferAction,
        });
        this.$router.push({
          name: RouteDef.PhoneNumberVerify.name,
          params: {
            action: OTPActionType.TransferAction,
          },
        });
      } catch (error) {
        console.error(
          `error in requesting verification code: ${error.message}`,
        );
      }
    },
    start2FAVerify(pinCode) {
      if (this.selectedUser.twofaMethod === TwoFactorOption.METHOD.SMS) {
        this.goToSMSVerify(pinCode);
      } else if (
        this.selectedUser.twofaMethod === TwoFactorOption.METHOD.GOOGLE
      ) {
        this.$router.push({
          name: RouteDef.TransferVerifyGoogleAuthPage.name,
          params: {
            pin: pinCode,
          },
        });
      }
    },
    async requestToStartTransfer(payload) {
      try {
        await this.startTransfer(payload);
        this.$router.push({
          name: RouteDef.TransferSuccess.name,
        });
      } catch (error) {
        console.error(
          `error in requesting verification code: ${error.message}`,
        );
      }
    },
    transferMDT() {
      if (this.isCaptchaPassed) {
        trackEvent('Click on Transfer button', {
          'Transfer Mode': this.TransferType,
        });
        if (!this.selectedUser.isPasscodeSet) {
          this.showSetupPinDialog = true;
        } else if (!this.selectedUser.isPhoneConfirmed) {
          this.showSetupPhoneDialog = true;
        } else {
          this.showPinCodeInput = true;
        }
      }
    },
    async onPinCodeFilled(pinCode) {
      try {
        await this.validatePIN(pinCode);
        this.setPinForSecuirty(pinCode);
        this.showPinCodeInput = false;
      } catch (error) {
        this.$refs.pinCodeInputPopup.setInvalid();
        return;
      }

      try {
        if (
          this.selectedUser.isTwofaEnabled &&
          [
            TwoFactorOption.USAGE.TRANSACTION,
            TwoFactorOption.USAGE.TRANSACTION_AND_LOGIN,
          ].includes(this.selectedUser.twofaUsage)
        ) {
          this.start2FAVerify(pinCode);
        } else {
          this.requestToStartTransfer({ pin: pinCode });
        }
      } catch (error) {
        console.error(`error in onPinCodeFilled: ${error.message}`);
        trackEvent('Transfer Failure', {
          'Transfer Mode': this.TransferType,
        });
      }
    },
    formatAmount,
  },
};
</script>

<style lang="scss" scoped>
.transfer-review {
  text-align: left;
}

.from-lbl,
.to-lbl,
.note-lbl {
  margin-top: $defaultPageMargin;
  font-weight: bold;
}

.from-value,
.to-value,
.note-value {
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 16px;
  word-wrap: break-word;
}

.md-divider {
  height: 0px;
  border: solid 1px #e2e5ec;
  margin-top: 8px;
}

$amountMinHeight: 20px;
.amount-container-email {
  .amount-container {
    margin-top: $defaultPageMargin;
    min-height: $amountMinHeight;

    &::after {
      content: '';
      clear: both;
      display: table;
    }

    .amount-lbl {
      float: left;
      width: 30%;
    }

    .amount-value {
      float: right;
      font-size: 28px;
      width: calc(55% - 16px);
      text-align: right;
      line-height: 40px;
    }

    .amount-unit {
      float: right;
      font-size: 16px;
      width: 15%;
      margin-left: 16px;
      padding-top: 4px;
      line-height: 40px;
    }
  }
}

.amount-container-eth {
  @mixin default-amount-unit() {
    float: right;
    font-size: 16px;
    width: 15%;
    padding-left: 16px;
  }

  .amount-container {
    margin-top: $defaultPageMargin;
    min-height: $amountMinHeight;

    .amount-lbl {
      float: left;
      width: 30%;
      font-weight: bold;
    }

    .amount-value {
      float: right;
      font-size: 16px;
      width: 55%;
      text-align: right;
    }

    .amount-unit {
      @include default-amount-unit;
    }
  }

  .transaction-fee-container {
    min-height: $amountMinHeight;
    margin-top: 10px;

    .transaction-fee-lbl {
      float: left;
      width: 30%;
    }

    .transaction-fee-value {
      float: right;
      width: 50%;
      text-align: right;
    }
    .amount-unit {
      @include default-amount-unit;
    }
  }
  .md-divider {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .final-amount-container {
    min-height: $amountMinHeight;
    margin-top: 10px;

    .final-amount-lbl {
      float: left;
      width: 30%;
    }

    .final-amount-value {
      float: right;
      font-size: 26px;
      width: 50%;
      text-align: right;
    }

    .amount-unit {
      @include default-amount-unit;
      padding-top: 5px;
    }
  }
}
</style>
