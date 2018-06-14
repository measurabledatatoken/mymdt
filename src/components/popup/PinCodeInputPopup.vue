<template>
  <md-dialog v-bind="$attrs" :class="[{'animated shake': shouldShake}]" @md-closed="shouldShake = false" @md-opened="onMDOpened">
    <md-button @click="$emit('close-clicked')">
      <md-icon md-src="/static/icons/done.svg"></md-icon>
    </md-button>

    <md-dialog-title>
      <span class="title">{{$t('message.passcode.pin_popup_title')}}</span>
      <span class="subtitle">{{ emailAddress }}</span>
    </md-dialog-title>
    <div class="content">
      <PinCodeField ref="pinCodeField" @codefilled="onCodeFilled" :length="6"></PinCodeField>
      <div class="forgot">
        <a href="google.com">{{ $t('message.passcode.forgot_pin') }}</a>
      </div>
    </div>
  </md-dialog>
</template>

<script>
import PinCodeField from '@/components/common/PinCodeField';

export default {
  components: {
    PinCodeField,
  },
  props: {
    emailAddress: {
      type: String,
    },
    autoFocus: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      shouldShake: false,
    };
  },
  methods: {
    setInvalid() {
      this.$refs.pinCodeField.setInvalid();
      this.shouldShake = true;
    },
    onCodeFilled(pinCode) {
      this.shouldShake = false;
      this.$emit('codefilled', pinCode);
    },
    onMDOpened() {
      // Not sure why need to set timeout in order to focus yet. May have better solution
      setTimeout(() => {
        this.$refs.pinCodeField.focus(0);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  width: 80%;
  height: 196px;

  .md-dialog-title {
    background-color: #f4f6f8;
    height: 91px;
    margin-bottom: 0px;

    .subtitle {
      font-size: 12px;
      color: #bdbdbd;
    }
  }

  .md-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    margin: 0px;
    position: fixed;
    top: 0px;
    right: 0px;

    /deep/ svg {
      fill: #4a4a4a;
    }
  }

  .md-dialog-title {
    text-align: center;
  }
}

.pin-code-field {
  width: auto;
}

.forgot {
  text-align: center;
}
</style>
