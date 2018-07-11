<template>
  <ul class="account-list">
    <li 
      v-for="user in allUsers" 
      :key="user.emailAddress"
    >
      <UserInfoCard 
        :user="user" 
        :hover="false" 
        small
      />
      <md-list class="account-task-list">
        <template v-if="uiState.users[user.emailAddress].isFetchingRewards">
          <EarnMDTLoadingItem />
          <md-divider />
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
          <EarnMDTLoadingItem />
          <md-divider />
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

import { FETCH_ALL_TASKS } from '@/store/modules/entities/users';
import { FETCH_ALL_REWARDS } from '@/store/modules/entities/rewards';

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
    };
  },
  computed: {
    ...mapState({
      uiState: state => state.ui.earnMDTScreen,
    }),
    ...mapGetters({
      allUsers: 'getAllUsers',
      getRewards: 'getRewards',
    }),
  },
  created() {
    this.fetchAllTasks();
    this.fetchAllRewards();
  },
  methods: {
    afterLeave() {
      this.showAmount = true;
    },
    ...mapActions({
      fetchAllTasks: FETCH_ALL_TASKS,
      fetchAllRewards: FETCH_ALL_REWARDS,
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
