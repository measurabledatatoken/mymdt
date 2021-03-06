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
      <div class="subtitle">{{ selectedUser? selectedUser.emailAddress : "" }}</div>
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
          <a 
            data-cy="forgot-pin-click" 
            @click="onForgotClicked"
          >{{ $t('message.passcode.forgot_pin') }}</a>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import {
  SET_PIN_FOR_SECURITY,
  SET_DONE_CALLBACK_PATH,
  VALIDATE_PIN,
} from '@/store/modules/security';

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
    autoValidate: {
      default: false,
      type: Boolean,
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
      selectedUser: 'getSelectedUser',
    }),
    getCallbackPath() {
      return this.callbackPath || this.$router.currentRoute.path;
    },
  },
  methods: {
    ...mapMutations({
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setPinForSecuirty: SET_PIN_FOR_SECURITY,
    }),
    ...mapActions({
      validatePIN: VALIDATE_PIN,
    }),
    setInvalid() {
      this.$refs.pinCodeField.setInvalid();
      this.shouldShake = true;
    },
    async onCodeFilled(pinCode) {
      this.shouldShake = false;
      if (this.autoValidate) {
        try {
          await this.validatePIN(pinCode);
          this.setPinForSecuirty(pinCode);
        } catch (error) {
          console.error(`error in validating: ${error.message}`);
          this.setInvalid();
          return;
        }
      }

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
  z-index: 10000;
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
