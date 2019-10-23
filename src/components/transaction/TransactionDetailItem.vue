<template>
  <md-list-item :class="['item', { 'item--single-line': singleLine }]">
    <div class="transaction-detail-item__text">
      <span class="transaction-detail-item__text-title">{{ title }}</span>
      <div class="transaction-detail-item__text-description">
        <slot name="description">
          <span>{{ description }}</span>
        </slot>
      </div>
    </div>
  </md-list-item>
</template>

<script>
export default {
  props: {
    singleLine: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  .transaction-detail-item__text {
    flex: 1;
    align-items: flex-start;
    overflow: hidden;
    white-space: nowrap;
    color: var(--md-theme-default-text-primary-on-background);

    .transaction-detail-item__text-title {
      font-weight: bold;
      font-size: $secondary-font-size;
      line-height: 1.75em;
    }

    .transaction-detail-item__text-description {
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: break-word;
      line-height: normal;
    }
  }

  &.item--single-line {
    flex-direction: row;

    /deep/ .md-list-item-content {
      min-height: 48px;
    }

    .transaction-detail-item__text {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .transaction-detail-item__text-title {
        flex: 1;
      }
    }
  }
}
</style>
