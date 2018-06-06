<template>
  <div class="transfer-review">
    <div class="review-content">
      <div class='from-lbl'>{{ $t('message.transfer.fromlbl') }}</div>
      <div class='from-value'>{{ transferFromAccount.emailAddress }}</div>
      <div class='to-lbl'>{{ $t('message.transfer.tolbl') }}</div>
      <div class='to-value'>{{ transferToStr }}</div>
      <div class='note-lbl'>{{ $t('message.transfer.notelbl') }}</div>
      <div class='note-value'>{{ transferNote }}</div>

      <div v-if="transferType === TransferType.Email" class='amount-container-email'>
        <md-divider></md-divider>
        <div class="amount-container">
          <div class='amount-lbl'>{{ $t('message.transfer.amountlbl') }}</div>
          <div class='amount-unit'>MDT</div>
          <div class='amount-value'>{{ transferAmount.toFixed(4) }}</div>
        </div>
      </div>

      <div v-if="transferType === TransferType.EthWallet" class='amount-container-eth'>
        <div class="amount-container">
          <div class='amount-lbl'>{{ $t('message.transfer.amountlbl') }}</div>
          <div class='amount-unit'>MDT</div>
          <div class='amount-value'>{{ transferAmount.toFixed(4) }}</div>
        </div>

        <div class="transaction-fee-container">
          <div class="transaction-fee-lbl">{{ $t('message.transfer.transaction_fee') }}</div>
          <div class='amount-unit'>MDT</div>
          <div class="transaction-fee-value"> {{ transactionFee }}</div>
        </div>

        <md-divider></md-divider>
        <div class="final-amount-container">
          <div class="final-amount-lbl">{{ $t('message.transfer.final_amount') }}</div>
          <div class='amount-unit'>MDT</div>
          <div class="final-amount-value" v-bind:class="{ 'negative': isFinalAmountSmallerThanZero }"> {{ finalAmountStr }}</div>
        </div>
      </div>
    </div>

    <vue-recaptcha class="recaptcha" v-on:verify="onRecaptchaVerified" sitekey="6LcyaVoUAAAAAO4bHCKeCJTsdJDbgq04n-3OUOSF"></vue-recaptcha>
    <MDTPrimaryButton v-on:click="transferMDT" class="transfer">{{ $t('message.transfer.transfer') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';
import {
  START_TRANSFER,
} from '@/store/modules/transfer';
import { TransferType, RouteDef } from '@/constants';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.reviewtitle'),
    };
  },
  data() {
    return {
      disableTransferBtn: true,
      TransferType,
    };
  },
  components: {
    VueRecaptcha,
    MDTPrimaryButton,
  },
  computed: {
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
      transferType: state => state.transfer.transferType,
      transferFromAccount: state => state.transfer.transferFromAccount,
      transferToAccount: state => state.transfer.transferToAccount,
      transferNote: state => state.transfer.transferNote,
      transferToWalletAddress: state => state.transfer.transferToWalletAddress,
    }),
    transferToStr() {
      if (this.transferType === TransferType.EthWallet) {
        return this.transferToWalletAddress;
      }
      return this.transferToAccount.emailAddress;
    },
    transactionFee() {
      const feePercentage = this.$store.state.home.appConfig.mdt_transaction_fee / 100.0;
      const minFee = parseFloat(this.$store.state.home.appConfig.mdt_min_transaction_fee);
      const minFeeByPercentage = this.transferAmount * parseFloat(feePercentage, 10);
      const finalFee = minFeeByPercentage < minFee ? minFee : minFeeByPercentage;
      return finalFee.toFixed(4);
    },
    finalAmount() {
      const finalAmount = this.transferAmount - this.transactionFee;
      return finalAmount;
    },
    finalAmountStr() {
      return this.finalAmount <= 0 ? '--' : this.finalAmount.toFixed(4);
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
  methods: {
    ...mapActions({
      startTransfer: START_TRANSFER,
    }),
    onRecaptchaVerified() {
      this.disableTransferBtn = false;
    },
    transferMDT() {
      this.startTransfer().then(() => {
        this.$router.push(RouteDef.TransferSuccess.path);
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer-review {
  margin-left: $defaultPageMargin;
  margin-right: $defaultPageMargin;
  width: calc(100% - 2 * #{$defaultPageMargin});
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

    .amount-lbl {
      float: left;
      width: 30%;
    }

    .amount-value {
      float: right;
      font-size: 28px;
      width: 55%;
      text-align: right;
      line-height: 40px;
    }

    .amount-unit {
      float: right;
      font-size: 16px;
      width: 15%;
      padding-left: 16px;
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

.recaptcha {
  position: absolute;
  bottom: 7em;
  @include center_horizontal;
}

.md-button.transfer {
  position: absolute;
  bottom: 24px;
}
</style>
