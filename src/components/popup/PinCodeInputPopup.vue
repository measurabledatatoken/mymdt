<template>
  <md-dialog v-bind="$attrs" :class="[{'animated shake': shouldShake}]" @md-closed="shouldShake = false"
    @md-opened="onMDOpened">
    <md-button @click="$emit('close-click')">
      <md-icon md-src="/static/icons/popup-close.svg"></md-icon>
    </md-button>

    <md-dialog-title>
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ emailAddress }}</div>
    </md-dialog-title>
    <div class="content">
      <PinCodeField ref="pinCodeField" @filled="onCodeFilled" :length="6" :shouldAutoFocus=true></PinCodeField>
      <div class="forgot">
        <a @click="$emit('fotgot-click')">{{ $t('message.passcode.forgot_pin') }}</a>
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
    title: {
      type: String,
    },
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
      }, 300);
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
    height: 88px;
    margin-bottom: 0px;
    padding-top: 32px;

    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 20px;
    }

    .subtitle {
      font-size: 14px;
      color: #bdbdbd;
    }
  }

  .md-button {
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 8px;
    margin: 0px;
    position: absolute;
    top: 0px;
    right: 0px;

    /deep/ .md-icon {
      width: 16px;
      min-width: 16px;
      height: 16px;
      line-height: 16px;

      /deep/ svg {
        fill: #4a4a4a;
      }
    }
  }

  .md-dialog-title {
    text-align: center;
  }
}

.pin-code-field {
  margin-top: 16px;
  width: auto;
  text-align: center;
}

.forgot {
  margin-top: 16px;
  text-align: center;
}
</style>
