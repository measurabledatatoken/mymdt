<template>
    <div>
        <div id="home-header">
            <button v-on:click="returnCallback">Back to App</button>
            <button v-on:click="clickedMenuButton( tutorialURL )">Tutorial</button>
            <button v-on:click="clickedMenuButton( settingURL )">Setting</button>
        </div>
    </div>
</template>


<script>
import { RouteDef, ReturnFromWalletURL } from '@/constants';

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
      window.location = ReturnFromWalletURL;
    },
    clickedMenuButton(url) {
      this.$router.push(url);
    },
  },
};


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .slide-left-enter {
  vue
} */

</style>
