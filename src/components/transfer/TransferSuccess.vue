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
import { mapState } from 'vuex';
import { RouteDef } from '@/constants';
import BasePage from '@/components/BasePage';

export default {
  extends: BasePage,
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
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
    }),
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
