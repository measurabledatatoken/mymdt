<template>
  <div class="app-view">
    <div class="header">
      <div class="header-wrapper">
        <div class="header__background"/>
        <user-info-card 
          :user="selectedUser" 
          @transfer="goToTransfer()"
        />
      </div>
    </div>
    <TransactionList/>
    <div class="buttons">
      <MDTPrimaryButton
        :style-type="1"
        @click="goToEarn()"
      >{{ $t('message.home.earn_mdt') }}</MDTPrimaryButton>
      <MDTPrimaryButton 
        @click="goToEarn()"
      >{{ $t('message.home.earn_mdt') }}</MDTPrimaryButton>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { trackEvent } from '@/utils';

import BasePage from '@/screens/BasePage';
import UserInfoCard from '@/components/common/UserInfoCard';
import TransactionList from '@/components/transaction/TransactionList';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

import { FETCH_APPLICATIONS } from '@/store/modules/entities/applications';

import { RouteDef } from '@/constants';
import { SET_SELECTED_USER } from '@/store/modules/home';

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
    }),
  },
  created() {
    const emailAddress = this.$route.params.account_id;
    this.setSelectedUser(emailAddress);
    this.fetchApplications({
      userId: this.selectedUser.emailAddress,
    });
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
    }),
    goToTransfer() {
      trackEvent('Click on transfer from account page');
      this.$router.push({
        name: RouteDef.TransferList.name,
        params: {
          account_id: this.selectedUser.emailAddress,
        },
      });
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

  /deep/ .transaction-list {
    flex: 1;
    &:after {
      content: '';
      display: block;
      height: 80px;
      width: 100%;
      flex-shrink: 0;
    }
  }

  .buttons {
    position: fixed;
    bottom: 1.5rem;
    @include center_horizontal;
    display: flex;
    justify-content: center;
    flex: 1;
    width: 100%;
    padding: 0 8px;

    .md-button {
      flex: 1;
      margin: 0 8px;
    }
  }
}

.header {
  .header-wrapper {
    padding-top: $header-padding-top;
    position: relative;
  }

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
