<template>
  <PaddedContainer>
    <UserInfo 
      :user="getSelectedSecurityUser" 
      :show-mdt="false"
    />
    <md-divider/>
    <slot name="content"/>
  </PaddedContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import UserInfo from '@/components/common/UserInfo';
import PaddedContainer from '@/components/containers/PaddedContainer';

export default {
  components: {
    UserInfo,
    PaddedContainer,
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
  width: 100%;
}

.md-divider {
  width: 100%;
  margin: 10px 0px;
}
</style>
