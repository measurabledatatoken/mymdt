<template>
  <BasePageContainer>
    <UserInfo 
      :user="getSelectedSecurityUser" 
      :show-mdt="false"
    />
    <md-divider/>
    <slot name="content"/>
  </BasePageContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '@/components/common/UserInfo';
import BasePageContainer from '@/screens/BasePageContainer';

export default {
  components: {
    UserInfo,
    BasePageContainer,
  },
  computed: {
    ...mapGetters({
      getSelectedSecurityUser: 'getSelectedSecurityUser',
    }),
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
