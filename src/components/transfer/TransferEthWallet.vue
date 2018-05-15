<template>
  <div>
    <MDTInputField v-on:amountEntered="transferAmountEntered"></MDTInputField>

    <AccountSelector v-on:accountSelected="selectedFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="accounts" :selectedAccount="transferFormAccount" >
    </AccountSelector>
    <AccountSelector :label="$t('message.transfer.tolbl')" :accounts="toAccounts">
    </AccountSelector>

    <md-button :to="transferEthReviewUrl" class="next md-raised md-primary">
      {{ $t('message.transfer.nextbtn') }}
    </md-button>
  </div>

</template>

<script>
import AccountSelector from '@/components/common/AccountSelector';
import MDTInputField from '@/components/common/MDTInputField';
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
    transferFormAccount() {
      return this.$store.state.transfer.transferFromAccount;
    },
    accounts() {
      return this.$store.state.home.userAccounts;
    },
    toAccounts() {
      return this.accounts.filter(
        account => account.emailAddress !== this.transferFormAccount.emailAddress,
      );
    },
  },
  components: {
    AccountSelector,
    MDTInputField,
  },
  created() {
    this.$store.commit('setTransferFromAccount', this.$store.state.home.selectedUser);
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
  methods: {
    transferAmountEntered(value) {
      this.$store.commit('setTransferAmount', value);
    },
    selectedFromAccount(account) {
      this.$store.commit('setTransferFromAccount', account);
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
