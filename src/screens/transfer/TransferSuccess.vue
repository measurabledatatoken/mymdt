<template>
    <div>
        <md-icon md-src="/static/icons/transaction-success.svg"></md-icon>
        <div class="message">
            {{ transferAmount.toFixed(4) }} MDT
            <br>
            {{ $t('message.transfer.successdetail')}}
        </div>

        <MDTPrimaryButton :to="RouteDef.Home.path">{{ $t('message.common.done') }}</MDTPrimaryButton>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

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
  components: {
    MDTPrimaryButton,
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

.md-button{
  position: absolute;
  bottom: 24px;
}
</style>
