<template>
  <md-card class="reward-card">
    <div class="card-header">
      <div class="label label-highlight">{{ $t('message.common.unclaimed') }}</div>
      <Skeleton v-if="isLoading" />
      <div 
        v-if="!isLoading"
        class="md-title"
      >
        {{ formatMDTAmount(unclaimed) }}
      </div>
      <slot name="header-caption"/>
    </div>
    <hr >
    <md-card-content>
      <Skeleton v-if="isLoading" />
      <div 
        v-else
        class="box"
      >
        <span class="label">
          {{ $t('message.common.claimed') }}
        </span>
        <span class="amount">
          {{ formatMDTAmount(claimed) }}
        </span>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import Skeleton from '@/components/common/Skeleton';

import { formatAmount } from '@/utils';

export default {
  components: {
    Skeleton,
  },
  props: {
    unclaimed: {
      type: Number,
      default: 0,
    },
    earned: {
      type: Number,
      default: 0,
    },
    claimed: {
      type: Number,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatMDTAmount(amount) {
      return formatAmount(amount, { suffix: ' MDT' });
    },
  },
};
</script>

<style lang="scss" scoped>
.reward-card {
  margin: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);

  .card-header {
    padding: 1rem;
  }

  .md-title {
    font-size: 1.75rem;
    font-weight: bold;
    line-height: normal;
  }

  .label {
    font-size: 1rem;
    font-weight: 600;
    color: #8f8f8f;

    &.label-highlight {
      color: #488bf7;
    }
  }

  hr {
    border: solid 1px #eef3f8;
    margin: 0 1rem;
  }

  .md-card-content {
    padding: 1rem;

    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .amount {
        font-size: 1rem;
        font-weight: bold;
        color: $primary-text-color;
      }
    }
  }
}
</style>
