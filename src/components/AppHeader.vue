<template>
    <div>
        <div id="home-header">
            <button v-on:click="returnCallback">Back</button>
            <button v-on:click="clickedMenuButton( TutorialURL )">Tutorial</button>
            <button v-on:click="clickedMenuButton( TransactionHistoryURL )">Transaction History</button>
            <button v-on:click="clickedMenuButton( SettingURL )">Setting</button>
        </div>
    </div>
</template>


<script>
import { RouteDef, ReturnFromWalletURL } from '@/constants';

export default {
  name: 'AppHeader',
  data() {
    return {
      TutorialURL: `${RouteDef.Tutorial}`,
      TransactionHistoryURL: `/${RouteDef.TransactionHistory}`,
      SettingURL: `/${RouteDef.Settings}`,
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

</style>
