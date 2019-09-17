<template>
  <div class="pin-code-field">
    <input
      ref="pinCodeItem"
      :type="type"
      :maxlength="length"
      :pattern="pattern"
      :value="value"
      :min="0"
      autocomplete="off"
      class="pin-code-input"
      @input="onInput"
      @keydown="onKeydown"
    >
    <ul
      :class="['pin-code-container', { 'pin-code-container--invalid': invalid } ]"
      tabindex="0"
      @focus="focus"
    >
      <li 
        v-for="(item, index) in length" 
        :key="index"
        :class="['character', { 'character-focus': index === value.length } ]"
      >
        <div
          v-show="index === value.length"
          class="placeholder cursor"
        />
        <div
          v-show="index < value.length"
          class="placeholder"
        >●</div>
      </li>
    </ul>
    <div 
      v-if="invalid" 
      class="invalid-description"
    >{{ invalidDescription }}</div>
  </div>
</template>

<script>
import { isAndroid } from '@/utils';
export default {
  props: {
    length: {
      default: 6,
      type: Number,
      required: true,
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
      default: 'number',
      type: String,
    },
  },
  data() {
    return {
      value: '',
      invalid: false,
    };
  },
  computed: {
    filled() {
      return this.value.length === this.length;
    },
  },
  watch: {
    filled(val) {
      if (val) {
        this.$emit('filled', this.value);
      } else {
        this.$emit('unfilled');
      }
    },
  },
  mounted() {
    if (this.shouldAutoFocus) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.focus();
        }, 750);
      });
    }
  },
  methods: {
    focus() {
      this.$refs.pinCodeItem.focus();
    },
    onKeydown(event) {
      if (this.value.length <= this.length) {
        let isPressBackspace = false;
        let isNumber = false;
        if (event.key !== undefined) {
          const key = event.key.toLowerCase();
          isPressBackspace = key === 'backspace' || key === 'delete';
          isNumber = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
          ].includes(key);
        } else if (event.which || event.keyCode) {
          const keyCode = event.which || event.keyCode;
          isPressBackspace = keyCode === 8 || keyCode === 46;
          isNumber =
            (event.keyCode > 95 && event.keyCode < 106) ||
            (event.keyCode > 47 && event.keyCode < 58);
        }

        if (!isPressBackspace && !isNumber) {
          event.preventDefault();
          return;
        }
      }
    },
    onInput(event) {
      // workaround minus sign input problem on Android
      if (
        isAndroid &&
        event.inputType === 'insertText' &&
        event.target.value === ''
      ) {
        const oldValue = this.value;
        this.value = '';
        this.value = oldValue;
        return;
      }

      if (!event.isComposing) {
        if (event.target.value.length < this.length) {
          this.value = event.target.value;
        } else {
          if (
            this.correctPinCode &&
            this.correctPinCode !== event.target.value
          ) {
            this.setInvalid();
          } else {
            this.value = event.target.value;
          }
        }
      }
    },
    setInvalid() {
      this.invalid = true;
      this.value = '';
      this.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.pin-code-input {
  position: absolute;
  opacity: 0;
  -webkit-user-select: initial;
}
.pin-code-container {
  display: inline-block;
  padding: 0px;
  margin: 0 0 0.25rem 0;

  > li {
    list-style: none;
    display: inline-block;
    position: relative;

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

    &.character-focus {
      border-color: $theme-font-color-btn;
      border-width: 2px;
      border-right: solid 2px $theme-font-color-btn;
    }

    &:first-child {
      border-radius: 4px 0px 0px 4px;
    }

    &:last-child {
      border-radius: 0px 4px 4px 0px;
      border-right: solid 1px #aaaaaa;

      &.character-focus {
        border-right: solid 2px $theme-font-color-btn;
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

.placeholder {
  position: absolute;
  pointer-events: none;
  @include center_horizontal_and_Vertical;
}

.cursor {
  height: 1.25rem;
  width: 1px;
  background-color: rgb(0, 122, 255);
  animation-duration: 1s;
  animation-name: blink;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
