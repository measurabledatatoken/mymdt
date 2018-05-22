<template>
  <div>
    <MDTInputField v-on:amountEntered="transferAmountEntered" :amount="transferAmount"></MDTInputField>
    <div class="transaction-fee">
      <div class="transaction-fee-lbl">{{ $t('message.transfer.transaction_fee') }}</div>
      <div class="transaction-fee-value"> {{ transactionFee }} MDT</div>
    </div>

    <div class="final-amount">
      <div class="final-amount-lbl">{{ $t('message.transfer.final_amount') }}</div>
      <div class="final-amount-value" v-bind:class="{ 'negative': isFinalAmountSmallerThanZero }"> {{ finalAmountStr }} MDT</div>
    </div>
    <div class="extra-space"> </div>
    <AccountSelector v-on:accountSelected="selectedFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="accounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <WalletAddressField v-on:walletAddressEntered="walletAddressEntered" v-on:walletAddressInvalid="walletAddressInvalid"
      :label="$t('message.transfer.tolbl')" :walletAddress="transferToWalletAddress">
    </WalletAddressField>
    <NoteInputField v-on:infoEntered="noteInfoEntered" :note="transferNote"></NoteInputField>

    <md-button :to="transferEthReviewUrl" class="next md-raised md-primary" :disabled="disableNextBtn">
      {{ $t('message.transfer.nextbtn') }}
    </md-button>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
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
  data() {
    return {
      transferEthReviewUrl: RouteDef.TransferEthWalletReview,
      isWalletAddressValid: false,
    };
  },
  computed: {
    ...mapGetters({
      transferAmount: 'transferAmount',
      transferFromAccount: 'transferFromAccount',
      transferToWalletAddress: 'transferToWalletAddress',
      transferNote: 'transferNote',
      accounts: 'userAccounts',
    }),
    toAccounts() {
      return this.accounts.filter(
        account => account.emailAddress !== this.transferFromAccount.emailAddress,
      );
    },
    disableNextBtn() {
      if (this.transferAmount > 0 && this.transferToWalletAddress && this.isWalletAddressValid && this.finalAmount > 0) {
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
    isFinalAmountSmallerThanZero() {
      console.log(`this.finalAmount${this.finalAmount}`);
      if (this.finalAmount <= 0) {
        return true;
      }
      return false;
    },
  },
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
    WalletAddressField,
  },
  created() {
    this.$store.commit('setTransferFromAccount', this.$store.state.home.selectedUser);
    this.$store.commit('setTransferType', TransferType.EthWallet);
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
    if (this.$store.state.qrcode.ethAddressScanned != null) {
      this.$store.commit('setTransferToWalletAddress', this.$store.state.qrcode.ethAddressScanned);
    }
  },
  methods: {
    transferAmountEntered(value) {
      this.$store.commit('setTransferAmount', value);
    },
    noteInfoEntered(value) {
      this.$store.commit('setTransferNote', value);
    },
    selectedFromAccount(account) {
      this.$store.commit('setTransferFromAccount', account);
    },
    walletAddressEntered(address) {
      this.isWalletAddressValid = true;
      this.$store.commit('setTransferToWalletAddress', address);
    },
    walletAddressInvalid() {
      this.isWalletAddressValid = false;
    },
  },
};
</script>

<style lang='scss' scoped>

.transaction-fee, .final-amount {
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
  color: red;
}

.extra-space {
  height: 10px;
}

.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
