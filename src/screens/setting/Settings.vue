<template>
  <div>
    <md-list class="top-list">
      <base-setting-list-item :title="$t('message.settings.martketPriceUnit')" :to="RouteDef.PriceUnits.path">
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
        @click="onUserClicked(user.emailAddress)"
        :user="user"
        />
        <md-divider :key="`${user.emailAddress}-divider`" />
      </template>
    </md-list>
    <md-list>
      <setting-list-section-header>{{ $t('message.settings.help') }}</setting-list-section-header>
      <md-divider />
      <base-setting-list-item :title="$t('message.settings.reportProblem')" :showAction="false" :to="RouteDef.ReportProblem.path" />
      <md-divider />
      <base-setting-list-item :title="$t('message.settings.legalAndPrivacy')" :showAction="false" />
      <md-divider />
    </md-list>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { SET_SELECTED_USER } from '@/store/modules/security';
import BasePage from '@/screens/BasePage';
import UserAvatar from '@/components/common/UserAvatar';
import SettingListSectionHeader from '@/components/setting/SettingListSectionHeader';
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';
import SettingListUserItem from '@/components/setting/SettingListUserItem';

import { RouteDef } from '@/constants';

export default {
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
    }),
  },
  components: {
    UserAvatar,
    SettingListSectionHeader,
    BaseSettingListItem,
    SettingListUserItem,
  },
  methods: {
    ...mapMutations(
      {
        setSelectedUser: SET_SELECTED_USER,
      },
    ),
    onUserClicked(emailAddress) {
      this.setSelectedUser(emailAddress);
      this.$router.push(
        {
          name: RouteDef.UserSettings.name,
        },
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.top-list {
  padding-top: 0;
}
</style>
