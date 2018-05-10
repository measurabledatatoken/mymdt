<template>
  <div>

    <div id="home-header">
      <md-button class="md-icon-button closebtn" v-on:click="returnCallback">
        <md-icon md-src="/static/icons/close-white.svg"></md-icon>
      </md-button>

      <md-button class="md-icon-button settingsbtn" v-on:click="clickedMenuButton( settingURL )">
        <md-icon>*</md-icon>
      </md-button>
      <md-button class="md-icon-button tutorialbtn" v-on:click="clickedMenuButton( tutorialURL )">
        <md-icon>?</md-icon>
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
    clickedMenuButton(url) {
      this.$router.push(url);
    },
  },
};


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
