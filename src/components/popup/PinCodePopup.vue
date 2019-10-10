<template>
  <div v-if="!!selectedUser">
    <MDTConfirmPopup
      :md-active="showSetPinDialog"
      :md-title="$t('message.passcode.please_setup_pin_title')"
      :md-content="pinSetupContent"
      :md-confirm-text="$t('message.passcode.please_setup_pin_action')"
      :md-cancel-text="$t('message.common.cancel')"
      @update:mdActive="$emit('update:mdActive', $event)"
      @md-confirm="onSetupPINClicked"
    />
    <PinCodeInputPopup
      :md-active="showPinCodeInput"
      :title="$t('message.passcode.pin_popup_title')"
      auto-validate
      @update:mdActive="$emit('update:mdActive', $event)"
      @codefilled="$emit('codefilled', $event)"
      @close-click="$emit('update:mdActive', false)"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';

import { SET_SELECTED_USER } from '@/store/modules/home';
import { SET_DONE_CALLBACK_PATH } from '@/store/modules/security';

import { trackEvent } from '@/utils';
import { RouteDef } from '@/constants';
import SetupPINMode from '@/enum/setupPINMode';

export default {
  components: {
    MDTConfirmPopup,
    PinCodeInputPopup,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    mdActive: {
      type: Boolean,
      default: false,
    },
    pinSetupContent: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      selectedUserFromStore: 'getSelectedUser',
    }),
    showSetPinDialog() {
      return (
        this.selectedUser && !this.selectedUser.isPasscodeSet && this.mdActive
      );
    },
    showPinCodeInput() {
      return (
        this.selectedUser && this.selectedUser.isPasscodeSet && this.mdActive
      );
    },
    selectedUser() {
      return this.user || this.selectedUserFromStore;
    },
  },
  watch: {
    mdActive(newValue) {
      if (newValue && this.user) {
        this.setSelectedUser(this.user.emailAddress);
      }
    },
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
    }),
    onSetupPINClicked() {
      trackEvent('Click on PIN');

      this.setDoneCallbackPath(this.$router.currentRoute.path);
      this.$router.push({
        name: RouteDef.PinCodeSetup.name,
        params: {
          mode: SetupPINMode.SETUP,
        },
      });
    },
    onPinCodeFilled() {
      return;
    },
  },
};
</script>
