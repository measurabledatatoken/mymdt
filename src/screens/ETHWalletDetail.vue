<template>
  <div class="app-view">
    <ExtendedHeaderContainer>
      <ETHCard
        :user="selectedUser"
        compact
        show-balance
      />
    </ExtendedHeaderContainer>
    <TransactionList />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BasePage from '@/screens/BasePage';
import ExtendedHeaderContainer from '@/components/containers/ExtendedHeaderContainer';
import ETHCard from '@/components/common/ETHCard';
import TransactionList from '@/components/ethWallet/TransactionList';

export default {
  components: {
    TransactionList,
    ExtendedHeaderContainer,
    ETHCard,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.account.title'),
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
    }),
  },
};
</script>

<style lang="scss" scoped>
.app-view {
  display: flex;
  flex-direction: column;
}
</style>
