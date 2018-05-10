<template>
  <div>Transfer Email</div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t('message.transfer.emailtitle'),
    };
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style>

</style>
