<template>
  <div>
      <h1>Earn MDT</h1>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t('message.earn.title'),
    };
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style>

</style>
