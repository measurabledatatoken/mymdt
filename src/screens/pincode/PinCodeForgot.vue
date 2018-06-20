<template>
    <BaseUserSettingPage v-bind="$attrs" @click="onNextClicked">
        <template slot="content">

            <div> Forgot PIN</div>
        </template>
    </BaseUserSettingPage>
</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';

export default {
  components: {
    BaseUserSettingPage,
  },
  props: {
    doneCallBackPath: {
      default: RouteDef.UserSettings.path,
      type: String,
    },
  },
  methods: {
    ...mapGetters(
      {
        getSelectedSecurityUser: 'getSelectedSecurityUser',
      },
    ),
  },
};
</script>

<style>
</style>
