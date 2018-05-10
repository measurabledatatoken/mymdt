<template>
  <div class="home">
    <p>Total Balance</p>
    <h1>{{ totalMDTBalance }}</h1>
    <p>≈ {{ totalMDTValues }} USD</p>

    <div class="accountnum">{{ $t('message.home.accountnum', userAccounts.length, {num: userAccounts.length}) }}</div>
    <div v-for="entry in userAccounts" :key="entry.emailAddress">
      <md-card md-with-hover>
        <md-card-content>
          <div> {{ entry.displayName }}</div>
          <div> {{ entry.emailAddress }}</div>
          <div> {{ entry.mdtBalance }}</div>
        </md-card-content>

        <md-divider></md-divider>
        <md-card-actions md-alignment="space-between">
          <md-button v-on:click="goToTransfer(entry)">{{ $t('message.home.transferbtn') }}</md-button>
        </md-card-actions>

      </md-card>
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
<style lang="scss" scoped>
h1,
h2 {
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

.accountnum {
  font-size: 14px;
  font-weight: bold;
  margin-left: 16px;
  text-align: left;
  color: white;
}

.md-card {
  border-radius: 8px;
  background-color: white;
  margin: 8px;
}

.md-card-actions {
  justify-content: center;
}

.md-divider {
  background-color: #eef3f8;
  width: 80%;
  margin-left: 10%;
}

.md-button {
  color: $plainbtn-wordcolor;
  font-size: 16px;
  font-weight: bold;
}

</style>
