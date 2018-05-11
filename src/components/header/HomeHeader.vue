<template>
  <div>

    <div class="home-header">
      <md-button class="md-icon-button closebtn" v-on:click="returnCallback">
        <md-icon md-src="/static/icons/close-white.svg"></md-icon>
      </md-button>

      <md-button :to="settingURL" class="md-icon-button settingsbtn">
        <md-icon md-src="/static/icons/settings-white.svg"></md-icon>
      </md-button>
      <md-button :to="tutorialURL" class="md-icon-button tutorialbtn">
        <md-icon md-src="/static/icons/question-mark-home.svg"></md-icon>
      </md-button>
    </div>
  </div>
</template>


<script>
import { RouteDef, ExitFromWalletWebviewURL } from '@/constants';

export default {
  name: 'AppHeader',
  data() {
    return {
      tutorialURL: `${RouteDef.Tutorial}`,
      transactionHistoryURL: `${RouteDef.TransactionHistory}`,
      settingURL: `${RouteDef.Settings}`,
    };
  },
  methods: {
    returnCallback() {
      window.location = ExitFromWalletWebviewURL;
    },
  },
};


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-header {
  margin-top: 1em;
}

.closebtn {
  float: left;
}

.tutorialbtn, .settingsbtn {
  float: right;
}

.md-icon {
  color: white;

}
</style>
