<template>
    <BaseUserSettingPage v-bind="$attrs" @click="onNextClicked">
        <template slot="content">

            <div> Forgot PIN</div>
        </template>
    </BaseUserSettingPage>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';

export default {
  props: {

  },
  components: {
    BaseUserSettingPage,
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
