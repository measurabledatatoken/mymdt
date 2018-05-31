<template>
  <div>
    <MDTInputField v-on:amountEntered="setTransferAmount" v-on:amountInvalid="transferAmountInvalid"
      :amount="transferAmount" :max-amount="transferFromAccount.mdtBalance"></MDTInputField>
    <div class="transaction-fee">
      <div class="transaction-fee-lbl">{{ $t('message.transfer.transaction_fee') }}</div>
      <div class="transaction-fee-value"> {{ transactionFee }} MDT</div>
    </div>

    <div class="final-amount">
      <div class="final-amount-lbl">{{ $t('message.transfer.final_amount') }}</div>
      <div class="final-amount-value" v-bind:class="{ 'negative': isFinalAmountSmallerThanZero }"> {{ finalAmountStr }} MDT</div>
    </div>

    <div class="extra-space"> </div>
    <AccountSelector v-on:accountSelected="setTransferFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="fromUserAccounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <WalletAddressField v-on:walletAddressEntered="walletAddressEntered" v-on:walletAddressInvalid="walletAddressInvalid"
      :label="$t('message.transfer.tolbl')" :walletAddress="transferToWalletAddress">
    </WalletAddressField>
    <NoteInputField v-on:infoEntered="setTransferNote" :note="transferNote"></NoteInputField>

    <md-button :to="RouteDef.TransferEthWalletReview" class="next md-raised md-primary" :disabled="disableNextBtn">
      {{ $t('message.transfer.nextbtn') }}
    </md-button>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
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

export default {
  name: 'TransferEthWallet',
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
  },
  data() {
    return {
      RouteDef,
      isWalletAddressValid: false,
    };
  },
  computed: {
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
      transferFromAccount: state => state.transfer.transferFromAccount,
      transferToWalletAddress: state => state.transfer.transferToWalletAddress,
      transferNote: state => state.transfer.transferNote,
      fromUserAccounts: state => state.home.userAccounts,
      ethAddressScanned: state => state.qrcode.ethAddressScanned,
    }),
    disableNextBtn() {
      if (this.transferAmount > 0 && this.transferToWalletAddress && this.isWalletAddressValid && this.finalAmount > 0 && this.isWalletAmountValid) {
        return false;
      }
      return true;
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
      return this.finalAmount <= 0 ? '--' : this.finalAmount;
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
    this.setTransferType(TransferType.EthWallet);
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);

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
  width: 40%;
  text-align: left;
}

.transaction-fee-value,
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

.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
