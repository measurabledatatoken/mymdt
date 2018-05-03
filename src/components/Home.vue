<template>
  <div class="home">
    <p>Total Balance</p>
    <h1>{{ totalMDTBalance }}</h1>
    <p>≈ {{ totalMDTValues }} USD</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Current MDT Price:',
    };
  },
  computed: {
    ...mapGetters({
      mdtPrice: 'mdtPrice',
      userAccounts: 'userAccounts',
    }),
    totalMDTBalance() {
      let totalMDTBalance = 0;
      this.userAccounts.forEach((userAccount) => {
        totalMDTBalance += userAccount.mdtBalance;
      });
      return totalMDTBalance;
    },
    totalMDTValues() {
      return this.totalMDTBalance * this.mdtPrice;
    },
  },
  created() {
    this.$store.dispatch('getMDTPrice');
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
