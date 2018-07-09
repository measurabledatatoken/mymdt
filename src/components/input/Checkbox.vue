<template>
    <label class="mdt-checkbox">
      <input type="checkbox" :value="value" @input="$emit('input', $event.target.checked)" />
      <span class="mdt-checkbox__checkmark"></span>
      <div class="mdt-checkbox__title">{{ title }}</div>
    </label>
</template>

<script>
import BaseField from '@/components/input/BaseField';

export default {
  props: {
    title: String,
    value: Boolean,
  },
  components: {
    BaseField,
  },
};
</script>

<style lang="scss" scoped>
$animation-time: 300ms;
$line-height: 1rem;

.mdt-checkbox {
  display: flex;
  position: relative;

  .mdt-checkbox__checkmark {
    position: relative;
    height: $line-height;
    width: $line-height;
    border-radius: 4px;
    border: 1px solid white;
    transition: all $animation-time;

    &:after {
      content: "";
      position: absolute;
      opacity: 0;

      top: 1px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      transition: opacity $animation-time;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 1px 1px 0;
    }
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .mdt-checkbox__checkmark {
      background-color: $theme-color;
      border-color: $theme-color;

      &:after {
        display: block;
        opacity: 1;
      }
    }
  }

  .mdt-checkbox__title {
    flex: 1;
    font-size: 0.875rem;
    color: #ffffff;
    text-align: left;
    margin-left: 0.5rem;
    line-height: $line-height;
  }
}
</style>
