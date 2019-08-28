<template>
  <RewardDetail :rewards="rewards" />
</template>

<script>
import { mapGetters } from 'vuex';

import RewardDetail from '@/components/dataPointRewards/RewardDetail';
import BasePage from '@/screens/BasePage';

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
      getDataPointReward: 'getDataPointReward',
    }),
    rewards() {
      const reward = this.getDataPointReward(this.$route.params.rewardId);
      if (!reward) {
        return [];
      }

      return [reward];
    },
  },
};
</script>
