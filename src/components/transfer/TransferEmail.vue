<template>
  <div>
    <h1>Transfer Email</h1>
    <md-button :to="transferEmailReviewUrl" class="next md-raised md-primary">{{ $t('message.transfer.nextbtn') }} </md-button>
    </div>
</template>

<script>
import { RouteDef } from '@/constants';

export default {
  metaInfo() {
    return {
      title: this.$t('message.transfer.emailtitle'),
    };
  },
  data() {
    return {
      transferEmailReviewUrl: RouteDef.TransferEmailReview,
    };
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style>

</style>
