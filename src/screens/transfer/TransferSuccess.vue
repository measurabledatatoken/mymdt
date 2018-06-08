<template>
  <div>
    <md-icon md-src="/static/icons/transaction-success.svg"></md-icon>
    <div class="message">
      {{ transferAmount.toFixed(4) }} MDT
      <br> {{ $t('message.transfer.successdetail')}}
    </div>

    <MDTPrimaryButton @click="onDoneClick">{{ $t('message.common.done') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import { SET_IS_USER_ACCOUNTS_DIRTY } from '@/store/modules/home';
import { BACK_TO_HOME } from '@/store/modules/common';

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
  methods: {
    ...mapMutations(
      {
        setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
      },
    ),
    ...mapActions(
      {
        backToHome: BACK_TO_HOME,
      },
    ),
    onDoneClick() {
      this.setIsUserAcctionsDirty(true);
      this.backToHome();
    },
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
  position: absolute;
  bottom: 24px;
}
</style>
