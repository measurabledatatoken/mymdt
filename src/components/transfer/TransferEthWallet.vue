<template>
  <div>
    <h1>Transfer EthWallet</h1>
    <md-button :to="transferEthReviewUrl" class="next md-raised md-primary">
      {{ $t('message.transfer.nextbtn') }}
    </md-button>
  </div>

</template>

<script>
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
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style lang='scss' scoped>
.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
