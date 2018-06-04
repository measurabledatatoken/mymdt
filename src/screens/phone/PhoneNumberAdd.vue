<template>
  <div>
    <UserInfo :user="selectedAccount" :showMDT="false" />
    <PhoneInputField/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BasePage from '@/screens/BasePage';
import UserInfo from '@/components/common/UserInfo';
import PhoneInputField from '@/components/common/PhoneInputField';

export default {
  extends: BasePage,
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      selectedAccount: state => state.home.selectedUser,
    }),
  },
  metaInfo() {
    return {
      title: this.$t('message.phone.title'),
    };
  },
  components: {
    UserInfo,
    PhoneInputField,
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  margin: 16px;
}
</style>
