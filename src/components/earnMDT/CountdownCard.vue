<template>
  <div class="countdown-card">
    <p class="title">{{ $t('message.dataPointRewards.nextDataReward') }}</p>
    <div 
      v-if="isLoading" 
      class="loading-bar"
    >
      <Skeleton/>
    </div>
    <div 
      v-else 
      class="content"
    >
      <div 
        v-for="unit in countingUnits"
        :key="unit.label"
        class="time"
      >
        <div class="time-number">
          {{ unit.value }}
        </div>
        <div class="time-unit">
          {{ unit.label }}
        </div>
      </div>
    </div>
    <div class="progress-bar">
      <div 
        :style="{ width: `${progress}%` }"
        class="progress-bar-current" 
      />
    </div>
  </div>
</template>

<script>
import Skeleton from '@/components/common/Skeleton';

export default {
  components: {
    Skeleton,
  },
  props: {
    initialRemainingTime: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      remainingTime: this.initialRemainingTime,
      intervalId: null,
    };
  },
  computed: {
    countingUnits() {
      const d = Math.floor(this.remainingTime / (3600 * 24));
      const h = Math.floor((this.remainingTime % (3600 * 24)) / 3600);
      const m = Math.floor((this.remainingTime % 3600) / 60);
      const s = Math.floor(this.remainingTime % 60);

      return [
        {
          value: d,
          label: this.$t('message.dataPointRewards.days'),
        },
        {
          value: h,
          label: this.$t('message.dataPointRewards.hours'),
        },
        {
          value: m,
          label: this.$t('message.dataPointRewards.minutes'),
        },
        {
          value: s,
          label: this.$t('message.dataPointRewards.seconds'),
        },
      ];
    },
    progress() {
      if (this.totalTime > 0) {
        return ((this.totalTime - this.remainingTime) * 100) / this.totalTime;
      } else {
        return 0;
      }
    },
  },
  watch: {
    initialRemainingTime: function(val) {
      this.remainingTime = val;
    },
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  created() {
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
      }
    }, 1000);
  },
};
</script>


<style lang="scss" scoped>
.countdown-card {
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
  padding-top: 1rem;
  margin: 0.5rem;
  overflow: hidden;
}

.loading-bar {
  padding: 0 1rem;
}

.title {
  font-size: 0.875rem;
  line-height: normal;
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.time {
  min-width: 50px;
  margin: 0 0.75rem;

  .time-number {
    font-size: 2.625rem;
    line-height: normal;
    font-weight: bold;
    color: $primary-text-color;
  }

  .time-unit {
    font-size: 0.625rem;
    line-height: normal;
    font-weight: bold;
    color: #aab1c0;
    text-transform: uppercase;
  }
}

.progress-bar {
  background-color: #dfebff;

  .progress-bar-current {
    height: 0.5rem;
    background-color: #488bf7;
  }
}
</style>