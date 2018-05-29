<template>
    <div>
        <md-icon md-src="/static/icons/transaction-success.svg"></md-icon>
        <div class="message">
            {{ transferAmount.toFixed(4) }} MDT
            <br>
            {{ $t('message.transfer.successdetail')}}
        </div>

        <md-button :to="RouteDef.Home" class="md-raised md-primary">{{ $t('message.common.done') }} </md-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';

export default {
  name: 'TransferSuccess',
  metaInfo() {
    return {
      title: this.$t('message.transfer.successtitle'),
    };
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapGetters({
      transferAmount: 'transferAmount',
    }),
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
  },
};
</script>

<style lang="scss" scoped>

.md-icon {
  height: 72px;
  width: 72px;
  margin-top: 50%;
}

.message {
    margin-top: 20px;
    font-size: 20px;
    line-height: 30px;
}

.md-button {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
