<template>
  <ul class="account-list">
    <li v-for="user in allUsers" :key="user.emailAddress">
      <UserInfoCard :user="user" small>
      </UserInfoCard>
      <md-list class="account-task-list">
        <li
          v-if="uiState.users[user.emailAddress].isFetchingRewards"
          class="account-task-list__loading-item"
        >
          <Skeleton width="80%" />
          <Skeleton width="50%" />
          <Skeleton class="account-task-list__loading-item-button" width="60px" />
        </li>
        <template
          v-else-if="Array.isArray(user.rewards) && user.rewards.length > 0"
          v-for="reward in getRewards(user.rewards)"
        >
            <RewardItem
              v-if="reward"
              :key="reward.id"
              :reward="reward"
              :userId="user.emailAddress"
            />
            <md-divider v-if="reward" :key="`${reward.id}-divider`" />
        </template>
        <li
          v-if="uiState.users[user.emailAddress].isFetchingTasks"
          class="account-task-list__loading-item"
        >
          <Skeleton width="80%" />
          <Skeleton width="50%" />
          <Skeleton class="account-task-list__loading-item-button" width="60px" />
        </li>
        <template
          v-else-if="Array.isArray(user.tasks) && user.tasks.filter(task => !task.is_task_completed).length > 0"
          v-for="task in user.tasks.filter(task => !task.is_task_completed)"
        >
            <TaskItem
              :key="task.task_id"
              :task="task"
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
import RewardItem from '@/components/task/RewardItem';
import TaskItem from '@/components/task/TaskItem';

import { FETCH_ALL_TASKS } from '@/store/modules/entities/users';
import { FETCH_ALL_REWARDS } from '@/store/modules/entities/rewards';

export default {
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
  methods: {
    afterLeave() {
      this.showAmount = true;
    },
    ...mapActions({
      fetchAllTasks: FETCH_ALL_TASKS,
      fetchAllRewards: FETCH_ALL_REWARDS,
    }),
  },
  created() {
    this.fetchAllTasks();
    this.fetchAllRewards();
  },
  components: {
    UserInfoCard,
    Skeleton,
    RewardItem,
    TaskItem,
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

    .account-task-list__loading-item {
      padding: 0.25rem 1.5rem;

      .account-task-list__loading-item-button {
        margin-left: auto;
      }
    }
  }
}
</style>
