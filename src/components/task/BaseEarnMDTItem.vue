<template>
  <md-list-item 
    v-bind="$attrs"
    class="base-earn-mdt-item"
  >
    <div class="base-earn-mdt-item__info">
      <md-icon 
        :md-src="mdSrc" 
        class="base-earn-mdt-item__icon"
      />
      <div class="md-list-item-text">
        <div
          v-if="title" 
          class="base-earn-mdt-item__info-title"
        >
          <span>{{ title }}</span>
          <template v-if="isDataPointReward">
            <md-button 
              v-if="isDataPointReward"
              class="base-earn-mdt-item__info-button"
              @click="onClick"
            >
              <span
                class="base-earn-mdt-item__info-details"
              >{{ $t('message.common.detail') }}</span>
              <img
                class="base-earn-mdt-item__icon-details"
                src="/static/icons/arrow-go-to-detail.svg"
              >
            </md-button>
          </template>
        </div> 
        <span 
          v-if="isDataPointReward" 
          class="base-earn-mdt-item__info-description"
        >{{ reward.description }}</span>
        <TaskStepList
          v-if="task.max_completion > 1 && task.max_completion <= 5"
          :task="task"
        />
        <span 
          v-else-if="description" 
          class="base-earn-mdt-item__info-description"
        >{{ description }}</span>
      </div>
    </div>
    <slot name="action" />
  </md-list-item>
</template>

<script>
import { RouteDef } from '@/constants';

import TaskStepList from '@/components/task/TaskStepList';

export default {
  components: {
    TaskStepList,
  },
  props: {
    mdSrc: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    task: {
      type: Object,
      default() {
        return {};
      },
    },
    reward: {
      type: Object,
      default() {
        return {};
      },
    },
    userId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    isDataPointReward() {
      return this.reward.data_points_payload;
    },
  },
  methods: {
    onClick() {
      if (this.isDataPointReward) {
        this.$router.push({
          name: RouteDef.DataPointRewardDetail.name,
          params: { userId: this.userId, rewardId: this.reward.id },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-earn-mdt-item {
  /deep/ .md-list-item-content {
    display: block;
  }

  .base-earn-mdt-item__info {
    display: flex;
    align-items: flex-start;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 0.5rem;

    .base-earn-mdt-item__icon {
      display: flex;
      width: 1rem;
      height: 1.25rem;
      min-width: 0;
      margin-right: 0.625rem;
    }

    .base-earn-mdt-item__info-button {
      height: auto;
      min-width: auto;
      margin-left: 0.5rem;

      .base-earn-mdt-item__info-details {
        color: $secondary-text-color;
        margin-right: 0.25rem;
        font-size: 12px;
        font-weight: 600;
      }
    }

    /deep/ .md-list-item-text {
      * {
        line-height: 1.25rem;
      }
      .base-earn-mdt-item__info-title {
        font-weight: bold;
        * {
          width: auto;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }

    .base-earn-mdt-item__info-description {
      color: $secondary-text-color;
      white-space: normal;
    }
  }
}
</style>
