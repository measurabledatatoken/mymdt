<template>
    <div>
        <UserInfo :user="selectedAccount" :showMDT="false" />
        <div class="title">
            <slot name="title"/>
        </div>
        <div class="content">
            <slot name="content"/>
        </div>
        <slot name="action-area"></slot>
        <slot name="buttons"></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from '@/components/common/UserInfo';

export default {
  components: {
    UserInfo,
  },
  computed: {
    ...mapState({
      selectedAccount: state => state.home.selectedUser,
    }),
  },
};
</script>

<style lang="scss" scoped>

.user-info {
  margin: 16px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: $label-color;
  margin: 24px 0px;
}
.content {
  font-size: 16px;
  text-align: left;
  color: $label-color;
  margin: 0px $defaultPageMargin 10px;
}

</style>
