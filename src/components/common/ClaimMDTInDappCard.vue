<template>
  <md-card class="reward-card">
    <div class="card-header">
      <div class="label">{{ $t('message.common.unclaimed') }}</div>
      <Skeleton 
        v-if="isLoading"
        width="200px"
        height="32px"
      />
      <div 
        v-if="!isLoading"
        class="md-title"
      >
        {{ formatMDTAmount(unclaimed) }}
      </div>
      <div class="claim-button-container">
        <MDTMediumButton 
          :style-type="1"
          :disabled="isLoading || disabled"
          @click="onClick"
        >
          Claim All
        </MDTMediumButton>
      </div>
    </div>
    <hr >
    <md-card-content>
      <div class="box">
        <div class="box-row label">
          {{ $t('message.common.claimed') }}
        </div>
        <Skeleton 
          v-if="isLoading"
          width="200px"
          height="32px"
        />
        <div 
          v-if="!isLoading"
          class="box-row amount"
        >
          {{ formatMDTAmount(claimed) }}
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import Skeleton from '@/components/common/Skeleton';
import MDTMediumButton from '@/components/button/MDTMediumButton';

import { formatAmount } from '@/utils';

export default {
  components: {
    Skeleton,
    MDTMediumButton,
  },
  props: {
    unclaimed: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatMDTAmount(amount) {
      return formatAmount(amount, { suffix: ' MDT' });
    },
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.reward-card {
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);

  .card-header {
    padding: 1rem;
  }

  .md-title {
    font-size: 2.625rem;
    font-weight: bold;
    line-height: normal;
  }

  .claim-button-container {
    margin-top: 0.5rem;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: normal;
    color: #aab1c0;
    text-transform: uppercase;
  }

  hr {
    border: solid 1px #eef3f8;
    margin: 0 1rem;
  }

  .md-card-content {
    display: flex;
    justify-content: center;
    padding: 1rem;

    .box {
      margin: 0 0.25rem;
      border-radius: 0.25rem;
      flex: 1;

      .box-row {
        margin: 0.25rem 0;

        &.amount {
          font-size: 1.5rem;
          font-weight: bold;
          line-height: normal;
        }
      }
    }
  }
}
</style>
