<template>
  <div>
    <MDTInputField v-on:amountEntered="transferAmountEntered"></MDTInputField>

    <AccountSelector v-on:accountSelected="selectedFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="accounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <WalletAddressField v-on:walletAddressEntered="walletAddressEntered" :label="$t('message.transfer.tolbl')"
      :walletAddress="transferToWalletAddress">
    </WalletAddressField>
    <NoteInputField v-on:infoEntered="noteInfoEntered" :note="transferNote"></NoteInputField>

    <md-button :to="transferEthReviewUrl" class="next md-raised md-primary">
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
import { RouteDef } from '@/constants';

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
  },
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
    WalletAddressField,
  },
  created() {
    this.$store.commit('setTransferFromAccount', this.$store.state.home.selectedUser);
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
    walletAddressEntered(address) {
      this.$store.commit('setTransferToWalletAddress', address);
    },
  },
};
</script>

<style lang='scss' scoped>
.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
