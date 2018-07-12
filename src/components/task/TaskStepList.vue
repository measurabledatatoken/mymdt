<template>
  <ul>
    <li
      v-for="n in task.max_completion"
      :key="n"
    >
      <div
        :class="[{ 'reward-completed' : stepCompleted(n) }]"
        class="step-content"
      >
        <md-icon
          v-if="stepCompleted(n)"
          md-src="/static/icons/done.svg"
        />
        <span v-else>{{ n }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  methods: {
    stepCompleted(n) {
      return n <= this.task.tasks_finished_count;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  width: auto;
  padding: 0;
  margin-top: 10px;
  li {
    width: auto;
    display: inline-flex;
    overflow: hidden;
    position: relative;
    vertical-align: top;
    .step-content {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: color, background-color;
      will-change: color, background-color;
      font-size: 12px;
      line-height: 24px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      text-align: center;
      color: $theme-disable-color-font;
      border: 1px solid $theme-disable-color-font;
      position: relative;
      overflow: visible;
      &::after {
        left: 100%;
        width: 9999%;
        height: 1px;
        position: absolute;
        top: 50%;
        z-index: 2;
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: background-color;
        content: ' ';
        background: $theme-disable-color-font;
      }
      .md-icon {
        width: 80%;
        height: 80%;
      }
      &.reward-completed {
        background: $theme-color;
        border-color: $theme-color;
        &::after {
          background: $theme-color;
        }
        /deep/ .md-icon {
          svg {
            fill: white;
          }
        }
      }
    }
    &:not(:last-child) {
      padding-right: 30px;
    }
  }
}
</style>
