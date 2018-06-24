<template>
  <BaseUserSettingPage>
    <template slot="content">
      <div class="title">
        <slot name="title" />
      </div>
      <div class="content">
        <slot name="content" />
      </div>
      <slot name="action-area"></slot>
      <slot name="buttons"></slot>
    </template>
  </BaseUserSettingPage>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '@/components/common/UserInfo';
import BaseUserSettingPage from '@/screens/setting/BaseUserSettingPage';

export default {
  components: {
    UserInfo,
    BaseUserSettingPage,
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
    }),
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  margin: 16px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: $label-color;
  margin: 24px 0px;
}
.content {
  font-size: 16px;
  text-align: left;
  color: $label-color;
  margin: 0px $defaultPageMargin 10px;
}
</style>
