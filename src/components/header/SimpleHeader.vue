<template>
  <div 
    :style="style"  
    class="home-header"
  >
    <md-button 
      class="md-icon-button" 
      @click="returnCallback"
    >
      <md-icon 
        v-if="headerBackgroundColor === 'white' || headerBackgroundColor === '#FFFFFF'" 
        md-src="/static/icons/close-gray.svg"
      />
      <md-icon 
        v-else 
        md-src="/static/icons/close-white.svg"
      />
    </md-button>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { RouteDef, ExitFromWalletWebviewURL } from '@/constants';

export default {
  data() {
    return {
      RouteDef,
      transactionHistoryURL: `${RouteDef.TransactionHistory.path}`,
    };
  },
  computed: {
    ...mapState({
      headerBackgroundColor: state => state.home.headerBackgroundColor,
    }),
    style() {
      return (
        this.headerBackgroundColor &&
        `background-color: ${this.headerBackgroundColor}`
      );
    },
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
