<template>
  <md-dialog 
    v-bind="$attrs" 
    :md-fullscreen="false"
    v-on="$listeners"
  >
    <div class="md-title-container">
      <span class="md-title">{{ title }}</span>
      <div
        class="close-icon-button"
        @click="$emit('update:mdActive', false)"
      >
        <md-icon
          class="close-icon"
          md-src="/static/icons/close-gray.svg"
        />
      </div>
    </div>
    <md-dialog-content v-if="!!description">{{ description }}</md-dialog-content>
    <md-dialog-actions>
      <slot />
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 100%;
  left: 1rem;
  right: 1rem;
  transform: translateY(-50%);
  border-radius: 0.5rem;
}

.md-title-container {
  display: flex;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1rem;

  .md-title {
    font-weight: bold;
  }

  .close-icon-button {
    margin-left: 0.5rem;
  }

  .close-icon {
    margin: 0;
  }
}

.md-dialog-content {
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
}

.md-dialog-actions {
  padding: 0 1.5rem 1.5rem;
}
</style>
