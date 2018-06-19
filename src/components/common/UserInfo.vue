<template>
  <div :class="['user-info', { 'user-info--small': small } ]">
    <div class="user-info__item">
      <UserAvatar :user="user" />
      <div class="user-data">
        <div v-bind:class="{ onlytitle : subTitle.length === 0} " class="md-title"> {{ title }}</div>
        <div class="md-sutitle"> {{ subTitle }}</div>
      </div>
      <UserInfoMDTAmount v-if="showMDT && small" class="user-info__amount" :amount="user.mdtBalance" animated />
    </div>
    <UserInfoMDTAmount v-if="showMDT && !small" class="user-info__amount" :amount="user.mdtBalance" />
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
    },
    small: {
      type: Boolean,
      default: true,
    },
    showMDT: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    title() {
      if (this.user.displayName.length === 0) {
        return this.user.emailAddress;
      }
      return this.user.displayName;
    },
    subTitle() {
      if (this.user.displayName.length === 0) {
        return '';
      }
      return this.user.emailAddress;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
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

      > * {
        width: 100%;
        margin: 0;
        overflow: hidden;
        line-height: 1.25em;
        text-overflow: ellipsis;
      }

      .md-title, .md-sutitle {
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
    margin-top: 1.25rem;
  }

  &.user-info--small {
    .user-info__amount {
      margin-top: 0;

      &.mdt-amount {
        font-size: 1rem;
      }
    }
  }
}
</style>
