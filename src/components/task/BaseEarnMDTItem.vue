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
        <span 
          v-if="title" 
          class="base-earn-mdt-item__info-title"
        >{{ title }}</span>
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

    /deep/ .md-list-item-text {
      * {
        line-height: 1.25rem;
      }
    }

    .base-earn-mdt-item__info-title {
      font-weight: bold;
    }

    .base-earn-mdt-item__info-description {
      color: $secondary-text-color;
    }
  }
}
</style>
