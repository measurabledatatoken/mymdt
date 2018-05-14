<template>
  <div class="home">
    <div class="balance-title">{{ $t('message.home.total_balance') }}</div>
    <div class="balance-count">{{ totalMDTBalance }} MDT</div>

    <div class="account-content">
      <div class="balance-value">≈ {{ totalMDTValues.toFixed(2) }} USD</div>
      <div class="accountnum">{{ $t('message.home.accountnum', userAccounts.length, {num: userAccounts.length}) }}</div>
    </div>

    <div v-for="user in userAccounts" :key="user.emailAddress">
      <UserCard v-on:transfer="goToTransfer(user)" v-on:goToAccountDetail="goToAccountDetail(user)" v-bind:user="user">
      </UserCard>
    </div>

    <md-button :to="earnMDTUrl" class="earn-mdt md-raised md-primary">{{ $t('message.home.earn_mdt') }} </md-button>
  </div>
</template>

<script>
import UserCard from '@/components/common/UserCard';
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
      earnMDTUrl: `${RouteDef.EarnMDT}`,
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
  components: {
    UserCard,
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
    goToAccountDetail(user) {
      this.$store.commit('setSelectedUserAccountForEmail', user.emailAddress);
      this.$router.push(RouteDef.AccountDetail);
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

.home {
  background-color: $home-bgcolor;
}

.account-content {
  background-image: url("/static/background/sub-header-background.svg");
  background-size: cover;
  width: 100%;
  bottom: 0;
  margin-top: -1em;
  margin-bottom: -3em;
}

.balance-title {
  font-size: 16px;
  color: white;
  line-height: 40px;
}

.balance-count {
  font-size: 28px;
  color: white;
  line-height: 50px;
  font-weight: bold;
}

.balance-value {
  font-size: 16px;
  color: white;
  line-height: 70px;
}

.accountnum {
  font-size: 14px;
  font-weight: bold;
  margin-left: 16px;
  padding-bottom: 3em;
  text-align: left;
  color: white;
}

.md-button.earn-mdt {
  width: 86%;
  margin: 0px;
  height: 48px;
  position: fixed;
  background-color: $bluebtn-backgroundcolor;
  color: $bluebtn-wordcolor;
  border-radius: 8px;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.25);
  bottom: 1.5em;
  font-size: 20px;
  z-index: 1;

  @include center_horizontal;
}
</style>
