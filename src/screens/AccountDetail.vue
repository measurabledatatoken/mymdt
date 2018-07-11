<template>
  <div class="app-view">
    <div class="header">
      <div class="header__background"/>
      <user-info-card 
        :user="selectedUser" 
        @transfer="goToTransfer()"
      />
    </div>
    <transaction-list :transactions="transactions" />
    <MDTPrimaryButton 
      :to="RouteDef.EarnMDT.path" 
      :bottom="true"
    >{{ $t('message.home.earn_mdt') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import BasePage from '@/screens/BasePage';
import UserInfoCard from '@/components/common/UserInfoCard';
import TransactionList from '@/components/transaction/TransactionList';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

import { FETCH_TRANSACTIONS } from '@/store/modules/entities/transactions';
import { FETCH_APPLICATIONS } from '@/store/modules/entities/applications';

import { RouteDef } from '@/constants';

export default {
  components: {
    UserInfoCard,
    TransactionList,
    MDTPrimaryButton,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.account.title'),
    };
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getTransactions: 'getTransactions',
    }),
    transactions() {
      return this.getTransactions(this.selectedUser.transactions);
    },
  },
  created() {
    this.fetchApplications({
      userId: this.selectedUser.emailAddress,
    });
    this.fetchTransactions({
      userId: this.selectedUser.emailAddress,
    });
  },
  methods: {
    goToTransfer() {
      this.$router.push(RouteDef.TransferList.path);
    },
    ...mapActions({
      fetchTransactions: FETCH_TRANSACTIONS,
      fetchApplications: FETCH_APPLICATIONS,
    }),
  },
};
</script>

<style lang="scss" scoped>
$header-padding-top: 2rem;

.app-view {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.header {
  padding-top: $header-padding-top;
  position: relative;

  .header__background {
    background-color: $home-bgcolor;
    height: calc(
      8em + 0.5em + #{$header-padding-top}
    ); // height of UserInfoCard content + UserInfoCard margin top + header padding
    width: 100%;
    position: absolute;
    top: 0;
  }
}
</style>
