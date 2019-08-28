<template>
  <RewardDetail
    :rewards="rewards"
    show-dropdown
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import RewardDetail from '@/components/dataPointRewards/RewardDetail';
import BasePage from '@/screens/BasePage';

import { FETCH_REWARDS } from '@/store/modules/entities/rewards';

export default {
  components: {
    RewardDetail,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transaction.dataPointReward'),
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getRewardsWithDataPoints: 'getRewardsWithDataPoints',
    }),
    rewards() {
      return this.getRewardsWithDataPoints(this.selectedUser.rewards).filter(
        reward => reward,
      );
    },
  },
  mounted() {
    const userId = this.$route.params.userId;
    this.fetchRewards({
      userId,
    });
  },
  methods: {
    ...mapActions({
      fetchRewards: FETCH_REWARDS,
    }),
  },
};
</script>
