<template>
  <div class="home-header">
    <md-button class="md-icon-button" @click="returnCallback">
      <md-icon md-src="/static/icons/close-white.svg"></md-icon>
    </md-button>
  </div>
</template>
<script>
import { RouteDef, ExitFromWalletWebviewURL } from '@/constants';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      RouteDef,
      transactionHistoryURL: `${RouteDef.TransactionHistory.path}`,
    };
  },
  computed: {
    ...mapState({
      needExit: state => state.home.needExit,
    }),
  },
  methods: {
    returnCallback() {
      window.location = ExitFromWalletWebviewURL;
    },
  },
};
</script>
<style lang="scss" scoped>
.home-header {
  background-color: $home-bgcolor;
  height: 100%;
  display: flex;
  align-items: center;

  .md-icon-button {
    opacity: 0.4;
  }
}
</style>
