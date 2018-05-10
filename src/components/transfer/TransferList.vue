<template>
  <div>
      <h1>Transfer Listing</h1>
      <router-link :to="RouteDef.TransferEmail"> Transfer to Email</router-link>
      <router-link :to="RouteDef.TransferEthWallet"> Transfer to Ethereum Wallet </router-link>
  </div>

</template>

<script>
import { RouteDef } from '@/constants';

export default {
  name: 'TransferListing',
  data() {
    return {
      RouteDef,
    };
  },
  metaInfo() {
    return {
      title: this.$t('message.transfer.title'),
    };
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style>

</style>
