<template>
  <md-list-item class="base-earn-mdt-item" v-bind="$attrs">
    <div class="base-earn-mdt-item__info">
      <md-icon class="base-earn-mdt-item__icon" :md-src="mdSrc" />
      <div class="md-list-item-text">
        <span v-if="title" class="base-earn-mdt-item__info-title">{{ title }}</span>
        <span v-if="description" class="base-earn-mdt-item__info-description">{{ description }}</span>
      </div>
    </div>
    <slot name="action" />
  </md-list-item>
</template>

<script>
export default {
  props: ['md-src', 'title', 'description'],
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
