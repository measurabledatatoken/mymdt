<template>
  <div class="rewards-container">
    <padded-container>
      <AccountSelector 
        :accounts="allUsers" 
        :selected-account="selectedUser" 
        @accountSelected="onAccountSelected"
      />
    </padded-container>
    <md-divider />
    <ClaimMDTCard 
      :unclaimed="24" 
      :earned="99"
      :claimed="54" 
    >
      <template slot="header-caption">
        <div class="header-caption">
          <img
            class="header-caption-icon"
            src="/static/icons/help.svg" 
            alt="help"
          >
          <span>How to Claim</span>
        </div>
      </template>
    </ClaimMDTCard>
  </div>
  
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import BasePage from '@/screens/BasePage';
import Skeleton from '@/components/common/Skeleton';
import AccountSelector from '@/components/common/AccountSelector';
import PaddedContainer from '@/components/containers/PaddedContainer';
import ClaimMDTCard from '@/components/common/ClaimMDTCard';

// import { FETCH_TASKS } from '@/store/modules/entities/users';
// import { FETCH_REWARDS } from '@/store/modules/entities/rewards';
import { SET_SELECTED_USER } from '@/store/modules/home';
import { trackEvent } from '@/utils';

export default {
  components: {
    PaddedContainer,
    AccountSelector,
    Skeleton,
    ClaimMDTCard,
    // EarnMDTLoadingItem,
    // RewardItem,
    // TaskItem,
    // WebViewItem,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.title'),
    };
  },
  computed: {
    ...mapState({
      uiState: state => state.ui.earnMDTScreen,
      locale: state => state.common.locale,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      allUsers: 'getAllUsers',
    }),
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
    }),
    onAccountSelected(account) {
      trackEvent('Switch accounts on data point reward List');
      this.setSelectedUser(account.emailAddress);
      // this.fetchData(account.emailAddress);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $theme-font-color-btn;

  .header-caption-icon {
    width: 0.625rem;
    height: 0.625rem;
    margin-right: 0.25rem;
  }
}

.md-divider {
  margin: 0;
}
</style>
