<template>
    <BasePage>
        <UserInfo :user="getSelectedSecurityUser" :showMDT="false" />
        <md-divider></md-divider>
        <slot name="content"></slot>
    </BasePage>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '@/components/common/UserInfo';
import BasePage from '@/screens/BasePage';

export default {
  components: {
    UserInfo,
    BasePage,
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
  margin-top: 16px;
  margin-bottom: 16px;
}

.md-divider {
  width: 100%;
  margin: 10px 0px;
}

</style>
