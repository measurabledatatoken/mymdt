<template>
  <div>
    <div class="account">
      <AccountSelector v-on:accountSelected="selectedFromAccount" :accounts="accounts" :selectedAccount="transferFromAccount">
      </AccountSelector>
    </div>
    <div class="action-card-list">
      <ActionCard :to="RouteDef.TransferEmail" class="left" :title="$t('message.transfer.transferlist_emailtitle')"
        :actionName="$t('message.common.transferbtn')" imgSrc="/static/icons/transfer-to-email.svg">
      </ActionCard>
      <ActionCard :to="RouteDef.TransferEthWallet" class="right" :title="$t('message.transfer.transferlist_ethtitle')"
        :actionName="$t('message.common.transferbtn')" imgSrc="/static/icons/transfer-to-eth.svg">
      </ActionCard>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { RouteDef } from '@/constants';
import AccountSelector from '@/components/common/AccountSelector';
import ActionCard from '@/components/common/ActionCard';

export default {
  name: 'TransferListing',
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapGetters({
      transferFromAccount: 'transferFromAccount',
      accounts: 'userAccounts',
    }),
  },
  metaInfo() {
    return {
      title: this.$t('message.transfer.title'),
    };
  },
  components: {
    AccountSelector,
    ActionCard,
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);

    if (this.$store.state.transfer.transferFromAccount == null) {
      this.$store.commit('setTransferFromAccount', this.$store.state.home.selectedUser);
    }
    this.$store.commit('setTransferToAccount', null);
  },
  methods: {
    selectedFromAccount(user) {
      this.$store.commit('setTransferFromAccount', user);
    },
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
