<template>
    <div>
        <UserInfo :user="getSelectedSecurityUser" :showMDT="false" />
        <md-divider></md-divider>
        <slot name="content"></slot>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '@/components/common/UserInfo';

export default {
  components: {
    UserInfo,
  },
  computed: {
    ...mapGetters(
      {
        getSelectedSecurityUser: 'getSelectedSecurityUser',
      },
    ),
  },
};
</script>

<style lang="scss" scoped>

.user-info {
  margin: 16px;
}

.md-divider {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
