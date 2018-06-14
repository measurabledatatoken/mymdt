<template>
  <input ref="pinCodeInput" :class="[position, `pin-input-item`, {invalid: invalid}]" :value="initPinCode"
    min="0" max="9" :type="type" @input="onValueInput" @focus="onInputFocus" @keydown="onKeyDown">
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
    invalid: {
      default: false,
      type: Boolean,
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

    &:not(:focus) {
      border-right: 0px;
    }

    &.invalid {
      border-top-color: #ff3b30;
      border-left-color: #ff3b30;
      border-bottom-color: #ff3b30;
    }
  }

  &.middle {
    &:not(:focus) {
      border-right: 0px;
    }

    &.invalid {
      border-top-color: #ff3b30;
      border-bottom-color: #ff3b30;
    }
  }

  &.right {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    &.invalid {
      border-top-color: #ff3b30;
      border-right-color: #ff3b30;
      border-bottom-color: #ff3b30;
    }
  }
}

.pin-input-item {
  width: 100%;
  height: 100%;
  text-align: center;
  border: solid 1px #aaaaaa;
  outline: none;

  @include left_right_boarder_radius;

  &:focus {
    border-color: #4187f7;
    border-width: 2px;

    @include left_right_boarder_radius;
  }
}
</style>
