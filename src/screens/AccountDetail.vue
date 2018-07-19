<template>
  <div class="app-view">
    <div class="header">
      <div class="header__background"/>
      <user-info-card 
        :user="selectedUser" 
        @transfer="goToTransfer()"
      />
    </div>
    <TransactionList :transactions="transactions" />
    <MDTPrimaryButton 
      :bottom="true"
      @click="goToEarn()"
    >{{ $t('message.home.earn_mdt') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { trackEvent } from '@/utils';

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
      trackEvent('Click on transfer from account page');
      this.$router.push(RouteDef.TransferList.path);
    },
    goToEarn() {
      trackEvent('Click on Earn MDT button from account page');
      this.$router.push({
        name: RouteDef.EarnMDT.name,
        params: {
          userId: this.selectedUser.emailAddress,
        },
      });
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

  .transaction-list {
    flex: 1;
    &:after {
      content: '';
      display: block;
      height: 80px;
      width: 100%;
      flex-shrink: 0;
    }
  }
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
