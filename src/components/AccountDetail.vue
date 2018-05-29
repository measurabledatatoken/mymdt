<template>
  <div class="app-view">
    <div class="header">
      <div class="header__background"></div>
      <user-card v-on:transfer="goToTransfer()" v-bind:user="selectedUser">
      </user-card>
    </div>
    <transaction-list v-bind:transactions="transactions" />
    <earn-m-d-t-button />
  </div>
</template>

<script>
import UserCard from '@/components/common/UserCard';
import TransactionList from '@/components/common/TransactionList';
import EarnMDTButton from '@/components/common/EarnMDTButton';
import { mapState, mapActions } from 'vuex';
import { RouteDef } from '@/constants';

export default {
  name: 'AccountDetail',
  components: {
    UserCard,
    TransactionList,
    EarnMDTButton,
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.all,
      selectedUser: state => state.home.selectedUser,
    }),
  },
  mounted() {
    this.getAccountTransactions();
  },
  methods: {
    goToTransfer() {
      this.$router.push(RouteDef.TransferList);
    },
    ...mapActions([
      'getAccountTransactions',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  $header-padding-top: 2rem;

  .app-view {
    height: calc(100vh - 52px);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .header {
    padding-top: $header-padding-top;
    position: relative;

    .header__background {
      background-color: $home-bgcolor;
      height: calc(8em + 0.5em + #{$header-padding-top}); // height of UserCard content + UserCard margin top + header padding
      width: 100%;
      position: absolute;
      top: 0;
    }
  }
</style>
