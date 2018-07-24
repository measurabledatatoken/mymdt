<template>
  <div class="base-field">
    <div 
      v-if="!!label" 
      class="label"
    >{{ label }}</div>
    <md-field 
      :class="{ 'md-invalid': !!error}" 
      v-bind="$attrs"
    >
      <slot />
      <span 
        v-if="!!error" 
        class="md-error"
      >{{ error }}</span>
    </md-field>
  </div>

</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    error: {
      type: [String, Boolean],
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-field {
  margin: 0.5rem 0;
  overflow: auto;

  .label {
    text-align: left;
    font-size: 0.875rem;
    font-weight: bold;
    color: $label-color;
  }

  .md-field {
    padding-top: 0;
    min-height: 2rem;

    /deep/ .md-input-action {
      top: 0;
    }

    /deep/ .md-clear {
      width: 24px;
      min-width: 24px;
      height: 24px;
      top: 4px;

      .md-icon {
        background-color: #cccccc;
        width: 18px;
        min-width: 18px;
        height: 18px;
        border-radius: 100%;
        padding: 2.15px;

        > svg {
          fill: white;
        }
      }
    }
  }
}
</style>
