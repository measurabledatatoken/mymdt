<template>
  <PaddedContainer class="transfer-review">
    <div class="review-content">
      <div class="from-lbl">{{ $t('message.transfer.fromlbl') }}</div>
      <div class="from-value">{{ transferFromAccount.emailAddress }}</div>
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

    <MDTPrimaryButton 
      :bottom="true" 
      @click="transferMDT"
    >
      {{ $t('message.common.transferbtn') }}
    </MDTPrimaryButton>

    <PinCodeInputPopup 
      ref="pinCodeInputPopup" 
      :md-active.sync="showPinCodeInput" 
      :title="$t('message.passcode.pin_popup_title')"
      :email-address="transferFromAccount.emailAddress" 
      @codefilled="onPinCodeFilled" 
      @close-click="showPinCodeInput = false"
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
  VALIDATE_PIN_FOR_TRANSFER,
  REQUEST_VERIFICATION_CODE,
} from '@/store/modules/security';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import BasePage from '@/screens/BasePage';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';
import PaddedContainer from '@/components/containers/PaddedContainer';
import OTPActionType from '@/enum/otpActionType';
import TwoFactorOption from '@/enum/twoFactorOption';

export default {
  components: {
    MDTPrimaryButton,
    PinCodeInputPopup,
    PaddedContainer,
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
      transferFromAccount: 'transferFromAccount',
      selectedSecurityUser: 'getSelectedSecurityUser',
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
      return this.transferAmount < this.transferFromAccount.mdtBalance;
    },
    isFinalAmountSmallerThanZero() {
      if (this.finalAmount <= 0) {
        return true;
      }
      return false;
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
    }),
    ...mapActions({
      startTransfer: START_TRANSFER,
      validatePIN: VALIDATE_PIN_FOR_TRANSFER,
      requestVerificationCode: REQUEST_VERIFICATION_CODE,
    }),
    async goToSMSVerify(pinCode) {
      this.setCountryDialCode(this.selectedSecurityUser.countryDialCode);
      this.setPhoneNumber(this.selectedSecurityUser.phoneNumber);
      try {
        await this.requestVerificationCode({
          action: OTPActionType.TransferAction,
        });
        this.$router.push({
          name: RouteDef.TransferVerifySMSPage.name,
          params: {
            pin: pinCode,
          },
        });
      } catch (error) {
        console.log(`error in requesting verification code: ${error.message}`);
      }
    },
    start2FAVerify(pinCode) {
      if (
        this.selectedSecurityUser.twofaMethod === TwoFactorOption.METHOD.SMS
      ) {
        this.goToSMSVerify(pinCode);
      } else if (
        this.selectedSecurityUser.twofaMethod === TwoFactorOption.METHOD.GOOGLE
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
        console.log(`error in requesting verification code: ${error.message}`);
      }
    },
    transferMDT() {
      trackEvent('Click on Transfer button', {
        'Transfer Mode': this.TransferType,
      });
      this.showPinCodeInput = true;
    },
    async onPinCodeFilled(pinCode) {
      try {
        await this.validatePIN(pinCode);
        this.showPinCodeInput = false;
      } catch (error) {
        this.$refs.pinCodeInputPopup.setInvalid();
        return;
      }

      try {
        if (
          this.transferFromAccount.isTwofaEnabled &&
          [
            TwoFactorOption.USAGE.TRANSACTION,
            TwoFactorOption.USAGE.TRANSACTION_AND_LOGIN,
          ].includes(this.transferFromAccount.twofaUsage)
        ) {
          this.start2FAVerify(pinCode);
        } else {
          this.requestToStartTransfer({ pin: pinCode });
        }
      } catch (error) {
        console.log(`error in onPinCodeFilled: ${error.message}`);
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
