<template>
  <div>
    <md-list>
      <base-setting-list-item :title="$t('message.settings.martketPriceUnit')">
        <span slot="action-data">USD</span>
      </base-setting-list-item>
      <md-divider />
    </md-list>
    <md-list class="md-double-line">
      <setting-list-section-header>{{ $t('message.settings.security') }}</setting-list-section-header>
      <md-divider />
      <template v-for="user in userAccounts">
        <SettingListUserItem :key="user.emailAddress" :user="user" />
        <md-divider :key="`${user.emailAddress}-divider`" />
      </template>
    </md-list>
    <md-list>
      <setting-list-section-header>{{ $t('message.settings.help') }}</setting-list-section-header>
      <md-divider />
      <base-setting-list-item :title="$t('message.settings.reportProblem')" :showAction="false" />
      <md-divider />
      <base-setting-list-item :title="$t('message.settings.legalAndPrivary')" :showAction="false" />
      <md-divider />
    </md-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import UserAvatar from '@/components/common/UserAvatar';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListUserItem from '@/components/setting/SettingListUserItem';

export default {
  computed: {
    ...mapState({
      userAccounts: state => state.home.userAccounts,
    }),
  },
  components: {
    UserAvatar,
    SettingListSectionHeader,
    BaseSettingListItem,
    SettingListUserItem,
  },
};
</script>
