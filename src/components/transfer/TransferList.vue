<template>
  <div>
      <AccountSelector :accounts="accounts" :selectedAccount="transferFromAccount"> </AccountSelector>


      <router-link :to="RouteDef.TransferEmail"> Transfer to Email</router-link>
      <router-link :to="RouteDef.TransferEthWallet"> Transfer to Ethereum Wallet </router-link>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import AccountSelector from '@/components/common/AccountSelector';

export default {
  name: 'TransferListing',
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapGetters({
      transferFromAccount: 'transferFromAccount',
      accounts: 'userAccounts',
    }),
  },
  metaInfo() {
    return {
      title: this.$t('message.transfer.title'),
    };
  },
  components: {
    AccountSelector,
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
    this.$store.commit('setTransferFromAccount', this.$store.state.home.selectedUser);
    this.$store.commit('setTransferToAccount', null);
  },
};
</script>

<style>

</style>
