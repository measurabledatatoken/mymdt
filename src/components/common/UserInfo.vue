<template>
  <div class="user-info">
    <UserAvatar :user="user" />
    <div class="user-data">
      <div v-bind:class="{ onlytitle : subTitle.length === 0} " class="md-title"> {{ title }}</div>
      <div class="md-sutitle"> {{ subTitle }}</div>
    </div>

    <div v-show="showMDT" class="mdt-count"> {{ user.mdtBalance.toFixed(4) }} MDT</div>

    <md-divider v-bind:class="{ 'show-mdt': showMDT} "></md-divider>
  </div>
</template>

<script>
import UserAvatar from '@/components/common/UserAvatar';

export default {
  components: {
    UserAvatar,
  },
  props: {
    user: {
      type: Object,
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
.md-avatar {
  margin-right: 16px;
  float: left;
}

.user-data {
  min-height: 40px;

  .md-title,
  .md-sutitle {
    color: #4a4a4a;
    text-align: left;
  }
  .md-title {
    line-height: 20px;
    font-size: 16px;

    &.onlytitle {
      line-height: 40px;
    }
  }
  .md-sutitle {
    font-size: 14px;
  }
}

.mdt-count {
  width: 100%;
  text-align: right;
  color: #4a4a4a;
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
  line-height: 40px;
}

.md-divider {
  background-color: #eef3f8;
  width: 100%;
  margin-top: 14px;
  margin-left: 0px;
  &.show-mdt {
    margin-top: 0px;
  }
}
</style>
