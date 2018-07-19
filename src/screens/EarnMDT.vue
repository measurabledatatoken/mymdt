<template>
  <ul 
    ref="accountList" 
    class="account-list"
  >
    <li 
      v-for="user in users" 
      :id="user.emailAddress"
      :key="user.emailAddress"
    >
      <UserInfoCard 
        :user="user" 
        :hover="false" 
        small
      />
      <md-list class="account-task-list">
        <template v-if="uiState.users[user.emailAddress].isFetchingRewards">
          <template v-for="n in numberOfRewardLoadingItems">
            <EarnMDTLoadingItem :key="`reward-loading-${n}`" />
            <md-divider :key="`reward-loading-divider-${n}`" />
          </template>
        </template>
        <template
          v-for="reward in getRewards(user.rewards).filter(reward => reward)"
          v-else-if="Array.isArray(user.rewards) && user.rewards.length > 0"
        >
          <RewardItem
            :key="reward.id"
            :reward="reward"
            :user-id="user.emailAddress"
          />
          <md-divider :key="`${reward.id}-divider`" />
        </template>
        <template v-if="uiState.users[user.emailAddress].isFetchingTasks">
          <template v-for="n in numberOfTaskLoadingItems">
            <EarnMDTLoadingItem :key="`task-loading-${n}`"/>
            <md-divider :key="`task-loading-divider-${n}`" />
          </template>
        </template>
        <template
          v-for="task in user.tasks.filter(task => !task.is_task_completed)"
          v-else-if="Array.isArray(user.tasks) && user.tasks.filter(task => !task.is_task_completed).length > 0"
        >
          <TaskItem
            :key="task.task_id"
            :task="task"
            :user="user"
          />
          <md-divider :key="`${task.task_id}-divider`" />
        </template>
      </md-list>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import BasePage from '@/screens/BasePage';
import Skeleton from '@/components/common/Skeleton';
import UserInfoCard from '@/components/common/UserInfoCard';
import EarnMDTLoadingItem from '@/components/task/EarnMDTLoadingItem';
import RewardItem from '@/components/task/RewardItem';
import TaskItem from '@/components/task/TaskItem';

import { FETCH_ALL_TASKS, FETCH_TASKS } from '@/store/modules/entities/users';
import {
  FETCH_ALL_REWARDS,
  FETCH_REWARDS,
} from '@/store/modules/entities/rewards';

export default {
  components: {
    UserInfoCard,
    Skeleton,
    EarnMDTLoadingItem,
    RewardItem,
    TaskItem,
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
      showAmount: false,
      numberOfRewardLoadingItems: 0,
      numberOfTaskLoadingItems: 0,
    };
  },
  computed: {
    ...mapState({
      uiState: state => state.ui.earnMDTScreen,
    }),
    ...mapGetters({
      getUser: 'getUser',
      allUsers: 'getAllUsers',
      getRewards: 'getRewards',
    }),
    users() {
      if (this.$route.params && this.$route.params.userId) {
        return [this.getUser(this.$route.params.userId)];
      } else {
        return this.allUsers;
      }
    },
  },
  created() {
    if (this.$route.params && this.$route.params.userId) {
      const userId = this.$route.params.userId;
      this.fetchTasks({
        userId,
      });
      this.fetchRewards({
        userId,
      });
    } else {
      this.fetchAllTasks();
      this.fetchAllRewards();
    }
  },
  mounted() {
    // improve loading effect by filling loading items on whole screen
    this.$nextTick(() => {
      const ACCOUNT_CARD_HEIGHT = 86;
      const LOADING_ITEM_HEIGHT = 66;
      const contentHeight =
        this.$refs.accountList.offsetHeight - ACCOUNT_CARD_HEIGHT;
      const numberOfLoadingItems = Math.ceil(
        contentHeight / LOADING_ITEM_HEIGHT,
      );
      this.numberOfRewardLoadingItems = Math.floor(numberOfLoadingItems / 2);
      this.numberOfTaskLoadingItems = Math.ceil(numberOfLoadingItems / 2);
    });
  },
  methods: {
    afterLeave() {
      this.showAmount = true;
    },
    ...mapActions({
      fetchAllTasks: FETCH_ALL_TASKS,
      fetchTasks: FETCH_TASKS,
      fetchAllRewards: FETCH_ALL_REWARDS,
      fetchRewards: FETCH_REWARDS,
    }),
  },
};
</script>

<style lang="scss" scoped>
.account-list {
  list-style: none;
  padding: 0;
  margin-top: 0;

  .account-task-list {
    list-style: none;
    padding: 0;
    margin-top: 0;

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
