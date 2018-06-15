<template>
  <input ref="pinCodeInput" :class="[position, `pin-input-item`, {invalid: invalid}]" :value="initPinCode"
    min="0" max="9" :type="type" :pattern="pattern" :inputmode="inputmode" @input="onValueInput" @focus="onInputFocus" @keydown="onKeyDown">
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
    numericOnly: {
      default: true,
      type: Boolean,
    },
    invalid: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    pattern() {
      if (this.numericOnly) {
        return '[0-9]*';
      }
      return '';
    },
    inputMode() {
      if (this.numericOnly) {
        return 'numeric';
      }
      return '';
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
    border-radius: 4px 0px 0px 4px;

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
    border-radius: 0px 0px 0px 0px;
    &:not(:focus) {
      border-right: 0px;
    }

    &.invalid {
      border-top-color: #ff3b30;
      border-bottom-color: #ff3b30;
    }
  }

  &.right {
    border-radius: 0px 4px 4px 0px;

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
