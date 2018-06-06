<template>
  <div class="app-view">
    <div class="header">
      <div class="header__background"></div>
      <user-info-card v-on:transfer="goToTransfer()" v-bind:user="selectedUser">
      </user-info-card>
    </div>
    <transaction-list v-bind:transactions="transactions" />
    <MDTPrimaryButton :to="RouteDef.EarnMDT.path" class="earn-mdt-btn">{{ $t('message.home.earn_mdt') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import BasePage from '@/screens/BasePage';
import UserInfoCard from '@/components/common/UserInfoCard';
import TransactionList from '@/components/transaction/TransactionList';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import { mapState, mapActions } from 'vuex';
import { RouteDef } from '@/constants';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.account.title'),
    };
  },
  components: {
    UserInfoCard,
    TransactionList,
    MDTPrimaryButton,
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.all,
      selectedUser: state => state.home.selectedUser,
    }),
  },
  created() {
    this.getAccountTransactions();
  },
  methods: {
    goToTransfer() {
      this.$router.push(RouteDef.TransferList.path);
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
    height: calc(100vh - #{$header-height});
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .header {
    padding-top: $header-padding-top;
    position: relative;

    .header__background {
      background-color: $home-bgcolor;
      height: calc(8em + 0.5em + #{$header-padding-top}); // height of UserInfoCard content + UserInfoCard margin top + header padding
      width: 100%;
      position: absolute;
      top: 0;
    }
  }

  .earn-mdt-btn {
    position: absolute;
    bottom: 24px;
  }
</style>