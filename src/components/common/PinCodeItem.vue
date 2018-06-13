<template>
    <input ref="pinCodeInput" :class="[position, `pin-input-item`]" :value="initPinCode" min="0" max="9" :type="type" @input="onValueInput"
        @focus="onInputFocus" @keydown="onKeyDown">
</template>

<script>
export default {
  props: {
    initPinCode: {
      default: null,
      type: Number,
      validator(value) {
        return value >= 0 && value <= 9;
      },
    },
    position: {
      default: 'middle',
      type: String,
      validator(value) {
        return ['left', 'middle', 'right'].indexOf(value) !== -1;
      },
    },
    type: {
      default: 'password',
      type: String,
      validator(value) {
        return ['password', 'number'].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    onValueInput(event) {
      event.target.blur();
      this.$emit('input', event.target.value);
    },
    onInputFocus() {
      this.$emit('focus');
    },
    onKeyDown(event) {
      const code = event.code.toLowerCase();
      if (code === 'backspace' || code === 'delete') {
        this.$emit('backspace');
      }
    },
    focus() {
      this.$refs.pinCodeInput.focus();
    },
    emptyInput() {
      this.$refs.pinCodeInput.value = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin left_right_boarder_radius {
  &.left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &.right {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.pin-input-item {
  width: 100%;
  height: 100%;
  text-align: center;
  border: solid 1px #aaaaaa;

  @include left_right_boarder_radius;

  &:focus {
    outline: none;
    border: solid 2px #4187f7;

    @include left_right_boarder_radius;
  }
}
</style>
