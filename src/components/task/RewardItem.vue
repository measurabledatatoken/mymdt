<template>
  <BaseEarnMDTItem
    :title="reward.name"
    :reward="reward"
    :user-id="userId"
    v-bind="$attrs"
    class="earn-mdt-reward-item"
    md-src="/static/icons/done.svg"
  >
    <template slot="action">
      <div class="claim-button-wrapper">
        <ClaimButton 
          :reward-status="reward.status"
          :amount="reward.value"
          :currency="reward.currency"
          :expiry-in-days="expiryInDays"
          :expiry-time="reward.expiry_time"
          @click.stop="handleClickClaimButton"
        />
      </div>
    </template>
  </BaseEarnMDTItem>
</template>

<script>
import { mapActions } from 'vuex';
import { trackEvent } from '@/utils';

import BaseEarnMDTItem from '@/components/task/BaseEarnMDTItem';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import ClaimButton from '@/components/button/ClaimButton';
import { CLAIM_REWARD } from '@/store/modules/entities/rewards';

export default {
  components: {
    BaseEarnMDTItem,
    MDTSecondaryButton,
    ClaimButton,
  },
  props: {
    reward: {
      type: Object,
      default: null,
    },
    userId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      claimed: false,
    };
  },
  computed: {
    expiryInDays() {
      if (!this.reward.expiry_time) {
        return null;
      }

      const expiryDate = new Date(this.reward.expiry_time);
      const now = new Date();
      const utc1 = Date.UTC(
        expiryDate.getFullYear(),
        expiryDate.getMonth(),
        expiryDate.getDate(),
      );
      const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

      // https://stackoverflow.com/a/15289883
      const dateDiffInDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));

      if (dateDiffInDays >= 0) {
        return dateDiffInDays;
      }

      return 0;
    },
  },
  methods: {
    ...mapActions({
      claimReward: CLAIM_REWARD,
    }),
    handleClickClaimButton() {
      trackEvent('Click on claim button', {
        'Reward Name': this.reward.name,
      });
      this.claimReward({
        rewardId: this.reward.id,
        userId: this.userId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.earn-mdt-reward-item {
  /deep/ .md-list-item-content {
    display: block;
  }

  /deep/ .md-icon {
    svg {
      fill: $theme-secondary-color;
    }
  }
}

.claim-button-wrapper {
  text-align: right;
}
</style>
