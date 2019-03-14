<template>
  <div>
    <md-list class="md-double-line">
      <setting-list-section-header>{{ $t('message.settings.security') }}</setting-list-section-header>
      <md-divider />
      <template v-for="user in allUsers">
        <SettingListUserItem
          :key="user.emailAddress"
          :user="user"
          data-cy="setting-list-user-item"
          @click="onUserClicked(user.emailAddress)"
        />
        <md-divider :key="`${user.emailAddress}-divider`" />
      </template>
    </md-list>
    <md-list>
      <setting-list-section-header>{{ $t('message.settings.help') }}</setting-list-section-header>
      <md-divider />
      <base-setting-list-item 
        :title="$t('message.settings.reportProblem')" 
        :show-action="false" 
        data-cy="report-problem"
        @click="onReportProblemClick"
      />
      <md-divider />
      <base-setting-list-item 
        :title="$t('message.settings.termsOfUse')" 
        :show-action="false"
        @click="onTermsOfUseClick"
      />
      <md-divider />
    </md-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import { trackEvent } from '@/utils';

import BasePage from '@/screens/BasePage';
import UserAvatar from '@/components/common/UserAvatar';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListUserItem from '@/components/setting/SettingListUserItem';

export default {
  components: {
    UserAvatar,
    SettingListSectionHeader,
    BaseSettingListItem,
    SettingListUserItem,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.settings.title'),
    };
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      priceUnit: state => state.home.priceUnit,
    }),
    ...mapGetters({
      allUsers: 'getAllUsers',
      getUser: 'getUser',
    }),
  },
  methods: {
    onUserClicked(emailAddress) {
      trackEvent('Click on an account under security section');
      this.$router.push({
        name: RouteDef.UserSettings.name,
        params: {
          account_id: emailAddress,
        },
      });
    },
    onReportProblemClick() {
      trackEvent('Click on report a problem');
      this.$router.push(RouteDef.ReportProblem.path);
    },
    onTermsOfUseClick() {
      trackEvent('Click on Legal and Privacy');
      this.$router.push(RouteDef.LegalAndPrivacy.path);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-list {
  padding-top: 0;
}
</style>
