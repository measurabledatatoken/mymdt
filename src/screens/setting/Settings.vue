<template>
  <div>
    <md-list class="top-list">
      <base-setting-list-item 
        :title="$t('message.settings.martketPriceUnit')" 
        @click="onPriceUnitClicked"
      >
        <span slot="action-data">{{ priceUnit }}</span>
      </base-setting-list-item>
      <md-divider />
    </md-list>
    <md-list class="md-double-line">
      <setting-list-section-header>{{ $t('message.settings.security') }}</setting-list-section-header>
      <md-divider />
      <template v-for="user in allUsers">
        <SettingListUserItem
          :key="user.emailAddress"
          :user="user"
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
        @click="onReportProblemClick"
      />
      <md-divider />
      <base-setting-list-item 
        :title="$t('message.settings.legalAndPrivacy')" 
        :show-action="false"
        @click="onLegalAndPrivacyClick"
      />
      <md-divider />
    </md-list>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { RouteDef } from '@/constants';
import { trackEvent } from '@/utils';

import {
  SET_SELECTED_USER,
  SET_SECURITY_USER_PHONE_INFO,
} from '@/store/modules/security';
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
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
      setSecurityUserInfo: SET_SECURITY_USER_PHONE_INFO,
    }),
    onUserClicked(emailAddress) {
      trackEvent('Click on an account under security section');
      this.setSelectedUser(emailAddress);
      this.setSecurityUserInfo(this.getUser(emailAddress));
      this.$router.push({
        name: RouteDef.UserSettings.name,
      });
    },
    onPriceUnitClicked() {
      trackEvent('Click on Price Unit');
      this.$router.push(RouteDef.PriceUnits.path);
    },
    onReportProblemClick() {
      trackEvent('Click on report a problem');
      this.$router.push(RouteDef.ReportProblem.path);
    },
    onLegalAndPrivacyClick() {
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
