<template>
  <div :class="['user-info', { 'user-info--small': small } ]">
    <div class="user-info__item">
      <UserAvatar 
        :user="user"
        :disabled="disabled"
      />
      <div 
        :disabled="disabled"
        class="user-data"
      >
        <div 
          :class="{ onlytitle : subTitle.length === 0} "
          class="md-title"
        > {{ title }}</div>
        <div class="md-sutitle"> {{ subTitle }}</div>
      </div>
      <UserInfoMDTAmount 
        v-if="showMdt && small"
        :disabled="disabled"
        :amount="user.mdtBalance"
        class="user-info__amount"
        animated
      />
    </div>
    <div 
      v-if="showMdt && !small"
      class="label"
    >
      {{ $t('message.home.total_balance') }}
    </div>
    <UserInfoMDTAmount 
      v-if="showMdt && !small"
      :disabled="disabled"
      :amount="user.mdtBalance"
      class="user-info__amount"
    />
  </div>
</template>

<script>
import UserAvatar from '@/components/common/UserAvatar';
import UserInfoMDTAmount from '@/components/common/UserInfoMDTAmount';

export default {
  components: {
    UserAvatar,
    UserInfoMDTAmount,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    small: {
      type: Boolean,
      default: true,
    },
    showMdt: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      if (!this.user.displayName) {
        return this.user.emailAddress;
      }
      return this.user.displayName;
    },
    subTitle() {
      if (!this.user.displayName) {
        return '';
      }
      return this.user.emailAddress;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  @include no-flick();

  .user-info__item {
    display: flex;
    align-items: center;

    .md-avatar {
      float: none;
      margin: 0 1rem 0 0;
    }

    .user-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      overflow: hidden;
      white-space: nowrap;

      &[disabled] {
        opacity: 0.6;
      }

      > * {
        width: 100%;
        margin: 0;
        overflow: hidden;
        line-height: 1.25em;
        text-overflow: ellipsis;
      }

      .md-title,
      .md-sutitle {
        color: $label-color;
        text-align: left;
      }

      .md-title {
        font-size: 1rem;
      }

      .md-sutitle {
        font-size: 0.875rem;
      }
    }
  }

  .user-info__amount {
    margin-top: 0.25rem;
  }

  &.user-info--small {
    .user-info__amount {
      margin-top: 0;

      &.mdt-amount {
        font-size: 1rem;
      }
    }
  }

  .label {
    margin-top: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: normal;
    color: #8f8f8f;
    text-align: left;
    text-transform: uppercase;
  }
}
</style>
