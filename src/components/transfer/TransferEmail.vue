<template>
  <div>
    <MDTInputField v-on:amountEntered="transferAmountEntered" v-on:amountInvalid="transferAmountInvalid"
      :amount="transferAmount" :max-amount="transferFromAccount.mdtBalance"></MDTInputField>

    <AccountSelector v-on:accountSelected="selectedFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="accounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <AccountSelector v-on:accountSelected="selectedToAccount" :label="$t('message.transfer.tolbl')" :enableOther="true"
      :accounts="toAccounts" :selectedAccount="transferToAccount">
    </AccountSelector>

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
import { RouteDef, TransferType } from '@/constants';
import { isValidEmailAddress } from '@/utils';

export default {
  name: 'TransferEmail',
  metaInfo() {
    return {
      title: this.$t('message.transfer.emailtitle'),
    };
  },
  data() {
    return {
      transferEthReviewUrl: RouteDef.TransferEthWalletReview,
    };
  },
  computed: {
    ...mapGetters({
      transferAmount: 'transferAmount',
      transferFromAccount: 'transferFromAccount',
      transferToAccount: 'transferToAccount',
      transferNote: 'transferNote',
      accounts: 'userAccounts',
    }),
    toAccounts() {
      return this.accounts.filter(
        account => account.emailAddress !== this.transferFromAccount.emailAddress,
      );
    },
    isValidEmailAddress() {
      return isValidEmailAddress(this.transferToAccount.emailAddress);
    },
    disableNextBtn() {
      if (this.transferAmount > 0 && this.transferToAccount && this.isWalletAmountValid && this.isValidEmailAddress) {
        return false;
      }
      return true;
    },
    isWalletAmountValid() {
      return this.transferAmount < this.transferFromAccount.mdtBalance;
    },
  },
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
    this.$store.commit('setTransferType', TransferType.Email);
  },
  methods: {
    transferAmountEntered(value) {
      this.$store.commit('setTransferAmount', value);
    },
    transferAmountInvalid() {
      this.$store.commit('setTransferAmount', 0);
    },
    noteInfoEntered(value) {
      this.$store.commit('setTransferNote', value);
    },
    selectedFromAccount(account) {
      this.$store.commit('setTransferFromAccount', account);
    },
    selectedToAccount(account) {
      this.$store.commit('setTransferToAccount', account);
    },
  },
};
</script>

<style lang="scss" scoped>
.account-selector {
  height: 80px;
  margin: 16px 0px;
}

.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
