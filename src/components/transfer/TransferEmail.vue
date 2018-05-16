<template>
  <div>
    <MDTInputField v-on:amountEntered="transferAmountEntered"></MDTInputField>

    <AccountSelector v-on:accountSelected="selectedFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="accounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <AccountSelector v-on:accountSelected="selectedToAccount" :label="$t('message.transfer.tolbl')" :accounts="toAccounts"
    :selectedAccount="transferToAccount" :enableOther="true">
    </AccountSelector>

    <md-button :to="transferEthReviewUrl" class="next md-raised md-primary">
      {{ $t('message.transfer.nextbtn') }}
    </md-button>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters({
      transferFromAccount: 'transferFromAccount',
      transferToAccount: 'transferToAccount',
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
}
</style>
