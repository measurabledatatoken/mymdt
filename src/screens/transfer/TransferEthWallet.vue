<template>
  <div>
    <MDTInputField v-on:amountEntered="setTransferAmount"
                   v-on:amountInvalid="transferAmountInvalid"
                   :amount="transferAmount"
                   :max-amount="transferFromAccount.mdtBalance"></MDTInputField>
    <div class="transaction-fee">
      <div class="transaction-fee-lbl">{{ $t('message.transfer.transaction_fee') }}</div>
      <md-button class="transaction-fee-icon md-icon-button"
                 :md-ripple="false"
                 @click="showTutorial = true">
        <md-icon md-src="/static/icons/question-mark-home.svg"></md-icon>
      </md-button>
      <div class="transaction-fee-value"> {{ formatAmount(transactionFee) }} MDT</div>
    </div>

    <div class="final-amount">
      <div class="final-amount-lbl">{{ $t('message.transfer.final_amount') }}</div>
      <div class="final-amount-value"
           v-bind:class="{ 'negative': isFinalAmountSmallerThanZero }"> {{ finalAmountStr }} MDT</div>
    </div>

    <div class="extra-space"> </div>
    <AccountSelector v-on:accountSelected="setTransferFromAccount"
                     :label="$t('message.transfer.fromlbl')"
                     :accounts="fromUserAccounts"
                     :selectedAccount="transferFromAccount">
    </AccountSelector>
    <WalletAddressField :label="$t('message.transfer.tolbl')"
                        :initWalletAddress="transferToWalletAddress"
                        v-on:walletAddressEntered="walletAddressEntered"
                        v-on:walletAddressInvalid="walletAddressInvalid">
    </WalletAddressField>
    <NoteInputField v-on:infoEntered="setTransferNote"
                    :note="transferNote"></NoteInputField>
    <MDTPrimaryButton :to="RouteDef.TransferReview.path"
                      :disabled="disableNextBtn"
                      :bottom="true">{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>

    <md-dialog-alert :md-active.sync="showTutorial"
                     :md-title="$t('message.transfer.tutorial_title')"
                     :md-content="$t('message.transfer.tutorial_description')"
                     :md-confirm-text="$t('message.common.okay')">

    </md-dialog-alert>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import {
  SET_TRANSFER_AMOUNT,
  SET_TRANSFER_TYPE,
  SET_TRANSFER_FROM_ACCOUNT,
  SET_TRANSFER_TO_WALLETADDRESS,
  SET_TRANSFER_NOTE,
} from '@/store/modules/transfer';
import AccountSelector from '@/components/common/AccountSelector';
import MDTInputField from '@/components/common/MDTInputField';
import NoteInputField from '@/components/common/NoteInputField';
import WalletAddressField from '@/components/common/WalletAddressField';
import { RouteDef, TransferType } from '@/constants';
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import { formatAmount } from '@/utils';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.ethtitle'),
    };
  },
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
    WalletAddressField,
    MDTPrimaryButton,
  },
  data() {
    return {
      RouteDef,
      isWalletAddressValid: false,
      showTutorial: false,
    };
  },
  computed: {
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
      transferFromAccount: state => state.transfer.transferFromAccount,
      transferToWalletAddress: state => state.transfer.transferToWalletAddress,
      transferNote: state => state.transfer.transferNote,
      ethAddressScanned: state => state.qrcode.ethAddressScanned,
    }),
    ...mapGetters({
      fromUserAccounts: 'getAllUsers',
      transactionFee: 'transactionFee',
      finalAmount: 'finalAmount',
    }),
    disableNextBtn() {
      if (
        this.transferAmount > 0 &&
        this.transferToWalletAddress &&
        this.isWalletAddressValid &&
        this.finalAmount > 0 &&
        this.isWalletAmountValid
      ) {
        return false;
      }
      return true;
    },
    finalAmountStr() {
      return this.finalAmount <= 0 ? '--' : formatAmount(this.finalAmount);
    },
    isWalletAmountValid() {
      return this.transferAmount <= this.transferFromAccount.mdtBalance;
    },
    isFinalAmountSmallerThanZero() {
      if (this.finalAmount <= 0) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.setTransferType(TransferType.EthWallet);

    if (this.ethAddressScanned != null) {
      this.setTransferToWalletAddress(this.ethAddressScanned);
    }
  },
  methods: {
    ...mapMutations({
      setTransferAmount: SET_TRANSFER_AMOUNT,
      setTransferType: SET_TRANSFER_TYPE,
      setTransferNote: SET_TRANSFER_NOTE,
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
      setTransferToWalletAddress: SET_TRANSFER_TO_WALLETADDRESS,
    }),
    transferAmountInvalid() {
      this.setTransferAmount(0);
    },
    walletAddressEntered(value) {
      this.isWalletAddressValid = true;
      this.setTransferToWalletAddress(value);
    },
    walletAddressInvalid() {
      this.isWalletAddressValid = false;
    },
    formatAmount,
  },
};
</script>

<style lang='scss' scoped>
.transaction-fee,
.final-amount {
  margin-left: $defaultPageMargin;
  margin-right: $defaultPageMargin;
  min-height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.transaction-fee-lbl,
.final-amount-lbl {
  float: left;
  width: auto;
  text-align: left;
  font-weight: bold;
}

.transaction-fee-icon {
  float: left;
  width: 10%;
  min-width: 0px;
  height: 20px;
  margin: 0px;

  &:active:before,
  &:focus:before {
    background-color: white;
  }
}

.transaction-fee-value {
  float: right;
  width: 50%;
  text-align: right;
}

.final-amount-value {
  float: right;
  width: 60%;
  text-align: right;
}

.final-amount-value.negative {
  color: $theme-warning-color;
}

.extra-space {
  height: 10px;
}

.md-dialog {
  /deep/ .md-dialog-title {
    font-weight: bold;
  }

  /deep/ .md-dialog-actions {
    justify-content: center;
  }

  /deep/ .md-button-content {
    font-weight: bold;
    text-transform: none;
  }
}
</style>
