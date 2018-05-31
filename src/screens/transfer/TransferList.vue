<template>
  <div>
    <div class="account">
      <AccountSelector v-on:accountSelected="setTransferFromAccount" :accounts="userAccounts" :selectedAccount="transferFromAccount">
      </AccountSelector>
    </div>
    <div class="action-card-list">
      <ActionCard :to="RouteDef.TransferEmail.path" class="left" :title="$t('message.transfer.transferlist_emailtitle')"
        :actionName="$t('message.common.transferbtn')" imgSrc="/static/icons/transfer-to-email.svg">
      </ActionCard>
      <ActionCard :to="RouteDef.TransferEthWallet.path" class="right" :title="$t('message.transfer.transferlist_ethtitle')"
        :actionName="$t('message.common.transferbtn')" imgSrc="/static/icons/transfer-to-eth.svg">
      </ActionCard>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  SET_TRANSFER_FROM_ACCOUNT,
} from '@/store/modules/transfer';
import { RouteDef } from '@/constants';
import AccountSelector from '@/components/common/AccountSelector';
import ActionCard from '@/components/common/ActionCard';

import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.title'),
    };
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      transferFromAccount: state => state.transfer.transferFromAccount,
      selectedUser: state => state.home.selectedUser,
      userAccounts: state => state.home.userAccounts,
    }),
  },
  components: {
    AccountSelector,
    ActionCard,
  },
  created() {
    this.setTransferFromAccount(this.selectedUser);
  },
  methods: {
    ...mapMutations({
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
    }),
  },
};
</script>

<style lang="scss" scoped>
.account-selector {
  height: 72px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0px;
}

.action-card-list {
  background-color: #f4f6f8;
  height: calc(100% - 72px);
}

.action-card {
  width: 44%;
  margin: 4% 2% 4% 4%;
  float: left;

  &.right {
    margin: 4% 4% 4% 2%;
  }
}
</style>
