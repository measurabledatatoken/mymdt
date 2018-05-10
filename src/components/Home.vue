<template>
  <div class="home">
    <p>Total Balance</p>
    <h1>{{ totalMDTBalance }}</h1>
    <p>≈ {{ totalMDTValues }} USD</p>
    <div v-for="entry in userAccounts" :key="entry.emailAddress">
      <hr>
      <div> {{ entry.displayName }}</div>
      <div> {{ entry.emailAddress }}</div>
      <div> {{ entry.mdtBalance }}</div>
      <div> <button v-on:click="goToTransfer(entry)">Transfer</button></div>
      <hr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$t('message.home.title'),
    };
  },
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
  mounted() {
    this.$store.dispatch('getMDTPrice');
    this.$store.dispatch('getUserAccounts');
  },
  methods: {
    goToTransfer(user) {
      this.$store.commit('setSelectedUserAccountForEmail', user.emailAddress);
      this.$router.push(RouteDef.TransferList);
    },
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
