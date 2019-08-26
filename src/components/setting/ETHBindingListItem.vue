<template>
  <base-setting-list-item
    :title="$t('message.settings.ethWalletBinding')"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-if="!binded"
      slot="action-data"
    >
      <div class="action unbinded">
        <md-icon md-src="/static/icons/settings-incomplete.svg" />
        {{ $t('message.ethBinding.notBindedYet') }}
      </div>
    </template>
    <template 
      v-if="binded" 
      slot="action-data"
    >
      <div class="action binded">
        <md-icon md-src="/static/icons/settings-account-3.svg" />
        {{ $t('message.ethBinding.binded') }}
      </div>
    </template>
  </base-setting-list-item>
</template>

<script>
import BaseSettingListItem from '@/components/setting/BaseSettingListItem';

export default {
  components: {
    BaseSettingListItem,
  },
  props: {
    binded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;

  &.unbinded {
    color: #ffb600;

    /deep/ svg {
      circle {
        fill: #ffb600;
      }
    }
  }

  &.binded {
    color: #3cd57b;
  }
}
</style>
