<template>

  <div class="home-header">
    <md-button v-if="needExit" class="md-icon-button closebtn" v-on:click="returnCallback">
      <md-icon md-src="/static/icons/close-white.svg"></md-icon>
    </md-button>

    <md-button :to="RouteDef.Settings.path" class="md-icon-button settingsbtn">
      <md-icon md-src="/static/icons/settings-white.svg"></md-icon>
    </md-button>
    <md-button @click="$emit('tutorialClick')" class="md-icon-button tutorialbtn">
      <md-icon md-src="/static/icons/question-mark-home.svg"></md-icon>
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


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-header {
  background-color: $home-bgcolor;
}

.closebtn {
  float: left;
  height: 100%;
}

.tutorialbtn,
.settingsbtn {
  float: right;
  height: 100%;
}

.md-icon {
  color: white;
}
</style>
