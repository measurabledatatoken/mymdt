<template>
  <div>Transfer EthWallet</div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t('message.transfer.ethtitle'),
    };
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style>

</style>
