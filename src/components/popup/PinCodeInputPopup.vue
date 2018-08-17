<template>
  <md-dialog 
    v-bind="$attrs" 
    :class="[{'animated shake': shouldShake}]" 
    @md-closed="shouldShake = false"
    @md-opened="onMDOpened"
  >
    <md-button @click="$emit('close-click')">
      <md-icon md-src="/static/icons/popup-close.svg"/>
    </md-button>

    <md-dialog-title>
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ selectedSecurityUser.emailAddress }}</div>
    </md-dialog-title>
    <div class="content">
      <template v-if="!validatingPIN">
        <PinCodeField 
          ref="pinCodeField" 
          :length="6" 
          :should-auto-focus="true" 
          @filled="onCodeFilled"
        />
        <div class="forgot">
          <a @click="onForgotClicked">{{ $t('message.passcode.forgot_pin') }}</a>
        </div>
        
      </template>
      <div 
        v-else 
        class="spinner-cointainer"
      >
        <img 
          src="/static/threedotsloader.gif" 
        >
      </div>
    </div>
  </md-dialog>
</template>

<script>
import PinCodeField from '@/components/common/PinCodeField';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import { SET_DONE_CALLBACK_PATH } from '@/store/modules/security';

export default {
  components: {
    PinCodeField,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    autoFocus: {
      default: true,
      type: Boolean,
    },
    callbackPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      shouldShake: false,
    };
  },
  computed: {
    ...mapState({
      validatingPIN: state => state.security.validatingPIN,
    }),
    ...mapGetters({
      selectedSecurityUser: 'getSelectedSecurityUser',
    }),
    getCallbackPath() {
      return this.callbackPath || this.$router.currentRoute.path;
    },
  },
  methods: {
    ...mapMutations({
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
    }),
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
    onForgotClicked() {
      this.setDoneCallbackPath(this.getCallbackPath);
      this.$router.push({
        name: RouteDef.PinCodeForgot.name,
      });
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

.content {
  flex: 1;
  position: relative;
  .spinner-cointainer {
    position: absolute;
    width: 110px;
    height: 110px;
    @include center_horizontal_and_Vertical;
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
