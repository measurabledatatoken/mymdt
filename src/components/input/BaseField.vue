<template>
  <div class="base-field">
    <div class="label" v-if="!!label">{{ label }}</div>
    <md-field :class="{ 'md-invalid': !!error}" md-inline md-clearable v-bind="$attrs">
      <slot />
      <span class="md-error" v-if="!!error">{{ error }}</span>
    </md-field>
  </div>

</template>

<script>
export default {
  props: ['label', 'error'],
};
</script>

<style lang="scss" scoped>
.base-field {
  margin: 0.5rem 0;
  padding: 0px 1rem;
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
  }
}
</style>
