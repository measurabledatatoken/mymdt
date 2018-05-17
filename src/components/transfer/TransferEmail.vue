<template>
  <div>
    <MDTInputField v-on:amountEntered="transferAmountEntered" :amount="transferAmount"></MDTInputField>

    <AccountSelector v-on:accountSelected="selectedFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="accounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <AccountSelector v-on:accountSelected="selectedToAccount" :label="$t('message.transfer.tolbl')" :enableOther="true" :accounts="toAccounts"
      :selectedAccount="transferToAccount">
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
import { RouteDef } from '@/constants';

export default {
  metaInfo() {
    return {
      title: this.$t('message.transfer.ethtitle'),
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
    disableNextBtn() {
      if (this.transferAmount > 0 && this.transferToAccount) {
        return false;
      }
      return true;
    },
  },
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
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
    selectedToAccount(account) {
      this.$store.commit('setTransferToAccount', account);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;

  &[disabled] {
    background-color: $bluebtn-backgroundcolor-disabled;
    color: $bluebtn-wordcolor-disabled;
  }
}
</style>
