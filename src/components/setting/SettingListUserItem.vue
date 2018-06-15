<template>
  <base-setting-list-item :title="user.displayName" :description="user.emailAddress" v-bind="$attrs" v-on="$listeners">
    <user-avatar slot="icon" :user="user" />
    <md-icon
      class="secured-icon"
      slot="action-data"
      md-src="/static/icons/account-secured.svg"
      alt="Secured"
      v-if="user.isEmailConfirmed && user.isPhoneConfirmed"
    />
  </base-setting-list-item>
</template>

<script>
import UserAvatar from '@/components/common/UserAvatar';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';

export default {
  props: ['user'],
  components: {
    UserAvatar,
    BaseSettingListItem,
  },
};
</script>

<style lang="scss" scoped>
.secured-icon {
  height: 32px;
  width: 32px;
}
</style>

