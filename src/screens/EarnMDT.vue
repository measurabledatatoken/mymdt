<template>
  <div 
    ref="rewardsContainer" 
    class="rewards-container"
  >
    <padded-container ref="accountSelectorContainer">
      <AccountSelector
        :accounts="allUsers" 
        :selected-account="selectedUser" 
        @accountSelected="onAccountSelected"
      />
    </padded-container>
    <md-divider />
    <padded-container v-if="showDataSharingBanner">
      <WebViewLink :to="bannerUrl">
        <div class="data-sharing-banner">
          <img
            src="/static/background/banner-data-sharing.jpg"
            srcset="/static/background/banner-data-sharing@2x.jpg 2x, /static/background/banner-data-sharing@3x.jpg 3x"
          >
          <div class="data-sharing-banner-text-block">
            <div>{{ $t('message.earnMDT.dataSharing') }}</div>
            <div class="banner-text-title">{{ $t('message.earnMDT.getYourDataRewards') }}</div>
          </div>
        </div>
      </WebViewLink>
    </padded-container>
    <padded-container>
      <md-list 
        class="account-task-list"
      >
        <WebViewItem
          :title="$t('message.earnMDT.redeemTitle')"
          :caption="$t('message.earnMDT.redeem')"
          :url="redeemURL"
        />
        <md-divider />
      </md-list>
      <md-divider />
    </padded-container>
    <padded-container>
      <md-list 
        class="account-task-list"
      >
        <template v-if="uiState.users[selectedUser.emailAddress].isFetchingTasks">
          <template v-for="n in numberOfTaskLoadingItems">
            <EarnMDTLoadingItem :key="`task-loading-${n}`"/>
            <md-divider :key="`task-loading-divider-${n}`" />
          </template>
        </template>
        <template
          v-for="task in selectedUser.tasks.filter(task => !task.is_task_completed)"
          v-else-if="Array.isArray(selectedUser.tasks) && selectedUser.tasks.filter(task => !task.is_task_completed).length > 0"
        >
          <TaskItem
            :key="task.task_id"
            :task="task"
            :user-id="selectedUser.emailAddress"
          />
          <md-divider :key="`${task.task_id}-divider`" />
        </template>
        <template v-if="uiState.users[selectedUser.emailAddress].isFetchingRewards">
          <template v-for="n in numberOfRewardLoadingItems">
            <EarnMDTLoadingItem :key="`reward-loading-${n}`" />
            <md-divider :key="`reward-loading-divider-${n}`" />
          </template>
        </template>
        <template
          v-for="reward in getRewards(selectedUser.rewards).filter(reward => reward)"
          v-else-if="Array.isArray(selectedUser.rewards) && selectedUser.rewards.length > 0"
        >
          <RewardItem
            :key="reward.id"
            :reward="reward"
            :user-id="selectedUser.emailAddress"
          />
          <md-divider :key="`${reward.id}-divider`" />
        </template>
      </md-list>
    </padded-container>
  </div>
  
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

import BasePage from '@/screens/BasePage';
import Skeleton from '@/components/common/Skeleton';
import AccountSelector from '@/components/common/AccountSelector';
import EarnMDTLoadingItem from '@/components/task/EarnMDTLoadingItem';
import RewardItem from '@/components/task/RewardItem';
import TaskItem from '@/components/task/TaskItem';
import WebViewItem from '@/components/task/WebViewItem';
import WebViewLink from '@/components/common/WebViewLink';
import PaddedContainer from '@/components/containers/PaddedContainer';

import { FETCH_TASKS } from '@/store/modules/entities/users';
import { FETCH_REWARDS } from '@/store/modules/entities/rewards';
import { SET_SELECTED_USER } from '@/store/modules/home';
import { FETCH_DATA_POINT_SUMMARY } from '@/store/modules/dataPoint';
import { trackEvent } from '@/utils';
import { RouteDef } from '@/constants';
import localeEnum from '@/enum/locale';

export default {
  components: {
    PaddedContainer,
    AccountSelector,
    Skeleton,
    EarnMDTLoadingItem,
    RewardItem,
    TaskItem,
    WebViewItem,
    WebViewLink,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.title'),
    };
  },
  data() {
    return {
      clicked: false,
      numberOfRewardLoadingItems: 0,
      numberOfTaskLoadingItems: 0,
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
      getRewards: 'getRewards',
      getDataPointSummary: 'getDataPointSummary',
      isUserDataSharingEnabled: 'isUserDataSharingEnabled',
    }),
    redeemURL() {
      const emailAddress = this.selectedUser.emailAddress;

      const localeTolangMap = {
        [localeEnum.ZH_CN]: 'cn',
        [localeEnum.ZH_HK]: 'zh',
        [localeEnum.EN_US]: 'en',
      };
      const lang = localeTolangMap[this.locale];

      if (!emailAddress || !lang) {
        return '';
      }

      return `https://redpacket.mdt.co/?email=${emailAddress}&lang=${lang}&app=true`;
    },
    showDataSharingBanner() {
      const summary = this.getDataPointSummary(this.selectedUser.emailAddress);
      const isUserDataSharingEnabled = this.isUserDataSharingEnabled(
        this.selectedUser,
      );
      if (!summary) {
        return false;
      }

      if (!isUserDataSharingEnabled) {
        return true;
      }

      return Object.keys(summary).length === 0;
    },
    bannerUrl() {
      let part = '';
      switch (this.locale) {
        case localeEnum.ZH_HK: {
          part = 'zh-hk/';
          break;
        }
        case localeEnum.ZH_CN: {
          part = 'zh-cn/';
          break;
        }
        default: {
          part = '';
        }
      }

      return `https://mdt.io/${part}data-rewards#earn-rewards`;
    },
  },
  created() {
    this.fetchData(this.selectedUser.emailAddress);
  },
  mounted() {
    // improve loading effect by filling loading items on whole screen
    this.$nextTick(() => {
      const LOADING_ITEM_HEIGHT = 78;
      const contentHeight =
        this.$refs.rewardsContainer.offsetHeight -
        this.$refs.accountSelectorContainer.$el.offsetHeight;
      const numberOfLoadingItems = Math.ceil(
        contentHeight / LOADING_ITEM_HEIGHT,
      );
      this.numberOfRewardLoadingItems = Math.floor(numberOfLoadingItems / 2);
      this.numberOfTaskLoadingItems = Math.ceil(numberOfLoadingItems / 2);
    });
  },
  methods: {
    ...mapActions({
      fetchTasks: FETCH_TASKS,
      fetchRewards: FETCH_REWARDS,
      fetchDataPointSummary: FETCH_DATA_POINT_SUMMARY,
    }),
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
    }),
    fetchData(userId) {
      this.fetchTasks({
        userId,
      });
      this.fetchRewards({
        userId,
      });
      this.fetchDataPointSummary({
        userId,
      });
    },
    onAccountSelected(account) {
      trackEvent('Switch accounts on Reward List');
      this.setSelectedUser(account.emailAddress);
      this.fetchData(account.emailAddress);
    },
    onDataSharingBannerClick() {
      this.$router.push({
        name: RouteDef.UserSettings.name,
        params: {
          account_id: this.selectedUser.emailAddress,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-sharing-banner {
  display: inline-block;
  position: relative;
  cursor: pointer;

  .data-sharing-banner-text-block {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: 1rem;
    font-weight: bold;
    color: #ffffff;
    font-size: 1rem;
    line-height: normal;
    white-space: pre-line;

    .banner-text-title {
      margin-top: 0.24rem;
      font-size: 1.5rem;
    }
  }
}

.rewards-container {
  /deep/ .md-divider {
    margin: 0;
  }
  .account-task-list {
    list-style: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

    /deep/ .md-list-item {
      .md-list-item-content {
        padding: 12px 8px;
      }
    }

    li:last-of-type {
      display: none;
    }

    .account-task-list__loading-item {
      padding: 0.25rem 1.5rem;

      .account-task-list__loading-item-button {
        margin-left: auto;
      }
    }
  }
}
</style>
