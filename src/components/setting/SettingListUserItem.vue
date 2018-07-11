<template>
  <base-setting-list-item 
    :title="user.displayName" 
    :description="user.emailAddress" 
    v-bind="$attrs" 
    v-on="$listeners"
  >
    <user-avatar 
      slot="icon" 
      :user="user"
    />
    <md-icon
      v-if="user.isPasscodeSet && user.isPhoneConfirmed"
      slot="action-data"
      class="secured-icon"
      md-src="/static/icons/account-secured.svg"
      alt="Secured"
    />
  </base-setting-list-item>
</template>

<script>
import UserAvatar from '@/components/common/UserAvatar';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';

export default {
  components: {
    UserAvatar,
    BaseSettingListItem,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.secured-icon {
  height: 32px;
  width: 32px;
}
</style>
