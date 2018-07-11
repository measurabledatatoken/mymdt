<template>
  <div class="pin-code-field">
    <ul :class="['pin-code-container', { 'pin-code-container--invalid': invalid } ]">
      <li 
        v-for="(item, index) in length" 
        :key="index"
      >
        <input
          ref="pinCodeItem"
          :type="type"
          :pattern="pattern"
          :value="pinCodeChars[index].display"
          class="pin-code-input"
          maxlength="1"
          @input="onCharInput(index, $event.target.value)"
          @keydown="onCharKeyDown(index, $event)"
          @focus="onCharFocus(index)"
        >
      </li>
    </ul>
    <div 
      v-if="invalid" 
      class="invalid-description"
    >{{ invalidDescription }}</div>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      default: 6,
      type: Number,
      required: true,
    },
    initPinCodeChars: {
      type: Array,
      default: null,
    },
    correctPinCode: {
      type: String,
      default: null,
    },
    shouldAutoFocus: {
      default: false,
      type: Boolean,
    },
    invalidDescription: {
      default: '',
      type: String,
    },
    pattern: {
      default: '\\d*',
      type: String,
    },
    type: {
      default: 'password',
      type: String,
    },
  },
  data() {
    return {
      invalid: false,
      pinCodeChars:
        this.initPinCodeChars ||
        Array.from(Array(this.length)).map(() => ({
          value: undefined,
          display: undefined,
        })),
    };
  },
  computed: {
    filled() {
      return this.pinCodeChars.every(char => this.isValidChar(char.value));
    },
    pinCode() {
      return this.pinCodeChars.reduce((partial, char) => {
        if (this.isValidChar(char.value)) {
          return `${partial}${char.value.toString()}`;
        }
        return partial;
      }, '');
    },
  },
  watch: {
    filled(val) {
      if (val) {
        this.$emit('filled', this.pinCode);
      } else {
        this.$emit('unfilled');
      }
    },
  },
  mounted() {
    if (this.shouldAutoFocus) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.pinCodeItem[0].focus();
        }, 750);
      });
    }
  },
  methods: {
    isValidChar(char) {
      return !!(char || char === 0);
    },
    updatePincodeChar(index, char, options) {
      // eslint-disable-next-line
      options = {
        updateValue: true,
        updateDisplay: true,
        ...options,
      };

      if (options.updateValue) {
        this.pinCodeChars[index].value = char;
      }

      if (options.updateDisplay) {
        this.pinCodeChars[index].display = char;
      }
    },
    onCharInput(index, char) {
      this.invalid = false;
      this.updatePincodeChar(index, char);

      if (index > 0 && this.isValidChar(this.pinCodeChars[index - 1].value)) {
        this.$refs.pinCodeItem[index - 1].value = '●';
        this.updatePincodeChar(index - 1, '●', {
          updateValue: false,
        });
      }

      if (
        this.isValidChar(char) &&
        index < this.length - 1 &&
        !this.isValidChar(this.pinCodeChars[index + 1].value)
      ) {
        this.$refs.pinCodeItem[index + 1].focus();
      }

      if (
        this.filled &&
        this.correctPinCode &&
        this.correctPinCode !== this.pinCode
      ) {
        this.setInvalid();
      }
    },
    onCharFocus(index) {
      this.updatePincodeChar(index, undefined);
    },
    onCharKeyDown(index, event) {
      const key = event.key.toLowerCase();
      if (key === 'backspace' || key === 'delete') {
        const currentChar = this.pinCodeChars[index].value;
        if (index > 0 && !this.isValidChar(currentChar)) {
          this.$refs.pinCodeItem[index - 1].focus();
        }
      }
    },
    focus(index) {
      this.$refs.pinCodeItem[index].focus();
    },
    setInvalid() {
      this.invalid = true;

      for (let i = 0; i < this.length; i += 1) {
        this.$refs.pinCodeItem[i].value = '';
        this.updatePincodeChar(i, '');
      }

      this.$refs.pinCodeItem[0].focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.pin-code-container {
  display: inline-block;
  padding: 0px;
  margin: 0 0 0.25rem 0;

  > li {
    list-style: none;
    display: inline-block;

    .pin-code-input {
      height: 2.5rem;
      width: 2.5rem;
      line-height: 1;
      font-size: 1rem;
      text-align: center;
      border: none;
      border: solid 1px #aaaaaa;
      border-right: 0px;
      outline: none;
      border-radius: 0px 0px 0px 0px;
      appearance: none;

      &:focus {
        border-color: $theme-font-color-btn;
        border-width: 2px;
        border-right: solid 2px $theme-font-color-btn;
      }
    }

    &:first-child {
      .pin-code-input {
        border-radius: 4px 0px 0px 4px;
      }
    }

    &:last-child {
      .pin-code-input {
        border-radius: 0px 4px 4px 0px;
        border-right: solid 1px #aaaaaa;

        &:focus {
          border-right: solid 2px $theme-font-color-btn;
        }
      }
    }
  }

  &.pin-code-container--invalid {
    > li {
      .pin-code-input {
        border-top-color: $error-color;
        border-bottom-color: $error-color;

        &:focus {
          border-width: 1px;
          border-right: 0;
        }
      }

      &:first-child {
        .pin-code-input {
          border-left-color: $error-color;
        }
      }

      &:last-child {
        .pin-code-input {
          border-right-color: $error-color;
        }
      }
    }
  }
}

.invalid-description {
  color: $error-color;
  @include no-flick;
}
</style>
