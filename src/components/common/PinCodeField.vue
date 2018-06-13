<template>
  <div>
    <label for="pin-code-input">
      <ul class="pin-code-container">
        <li class="field-wrap" v-for="(item, index) in length" :key="index">
          <PinCodeItem ref="pinCodeItem" :position="getPositionForIndex(index, length)" @input="onPinInput(index, ...arguments)"
            @backspace="onBackspacePressed(index, ...arguments)" @focus="onInputFocus(index, ...arguments)">
          </PinCodeItem>
        </li>
      </ul>
    </label>
  </div>
</template>

<script>
import PinCodeItem from '@/components/common/PinCodeItem'
  ;

export default {
  props: {
    length: {
      default: 6,
      type: Number,
      required: true,
    },
    initPinCode: {
      default: '',
      type: String,
    },
  },
  components: {
    PinCodeItem,
  },
  data() {
    return {
      pinCode: this.initPinCode,
    };
  },
  methods: {
    getPositionForIndex(index, length) {
      if (index === 0) {
        return 'left';
      } else if (index === length - 1) {
        return 'right';
      }
      return 'middle';
    },
    onPinInput(index, pinCode) {
      if (this.pinCode[index] === undefined) {
        this.pinCode = this.pinCode.concat(pinCode.toString());
      } else {
        this.pinCode[index] = pinCode;
      }

      if (index < this.length - 1) {
        this.$refs.pinCodeItem[index + 1].focus();
      }
    },
    onInputFocus(index) {
      const curPinCodeLength = this.pinCode.length;
      if (index === curPinCodeLength - 1) {
        const pinCodeItem = this.$refs.pinCodeItem[index];
        this.pinCode = this.pinCode.slice(0, Math.max(0, index));
        pinCodeItem.emptyInput();
      } else if (index < curPinCodeLength - 1) {
        const focusIndex = Math.min(curPinCodeLength, this.length - 1);
        const pinCodeItem = this.$refs.pinCodeItem[focusIndex];
        this.pinCode = this.pinCode.slice(0, Math.max(0, focusIndex));
        pinCodeItem.emptyInput();
        pinCodeItem.focus();
      } else {
        const pinCodeItem = this.$refs.pinCodeItem[curPinCodeLength];
        pinCodeItem.focus();
      }
    },
    onBackspacePressed(index) {
      if (index > 0) {
        this.$refs.pinCodeItem[index - 1].focus();
        this.pinCode = this.pinCode.slice(0, index - 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pin-code-container {
  margin: 0;
  padding: 0;
  display: flex;
  .field-wrap {
    list-style: none;
    display: block;
    height: 40px;
    width: 40px;
    line-height: 40px;
    font-size: 16px;
    .char-field {
      font-style: normal;
    }
  }
}
</style>
