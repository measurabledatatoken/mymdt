<template>
  <div class="transfer_success">
    <template v-if="transferType === TransferType.Email">
      <md-icon md-src="/static/icons/transaction-success.svg"/>
      <div class="message">
        {{ $t('message.transfer.successdetail_email', { 'finalAmount': formatAmount(transaction.amount) }) }}
      </div>

    </template>
    <template v-else>
      <md-icon md-src="/static/icons/transaction-pending.svg"/>
      <div class="message">
        {{ $t('message.transfer.successdetail_ethwallet') }}
      </div>
    </template>

    <MDTPrimaryButton 
      @click="onDoneClick"
    >
      {{ $t('message.common.done') }}
    </MDTPrimaryButton>
    
    <MDTSubtleButton 
      v-if="transferType === TransferType.EthWallet"
      class="view_transactions" 
      @click="onViewTransactionsClicked"
    >
      {{ $t('message.transfer.view_transactions') }}
    </MDTSubtleButton>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { formatAmount, trackEvent } from '@/utils';
import TransferType from '@/enum/transferType';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import { SET_IS_USER_ACCOUNTS_DIRTY } from '@/store/modules/home';
import {
  FLUSH_TRANSFER_DATA,
  ADD_TRANSFERTO_EMAIL_HISTORY,
} from '@/store/modules/transfer';
import { BACK_TO_PATH } from '@/store/modules/common';

export default {
  components: {
    MDTPrimaryButton,
    MDTSubtleButton,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.successtitle'),
    };
  },
  data() {
    return {
      RouteDef,
      TransferType,
    };
  },
  computed: {
    ...mapState({
      transferToAccount: state => state.transfer.transferToAccount,
      transferType: state => state.ui.transferSuccess.transferType,
      transaction: state => state.ui.transferSuccess.transaction,
    }),
    ...mapGetters({
      getUser: 'getUser',
    }),
  },
  created() {
    trackEvent('Transfer Success', {
      'Transfer Mode': this.transferType,
    });
    this.setHideNavigationBackButton(true);
  },
  methods: {
    ...mapMutations({
      setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
      flushTransferData: FLUSH_TRANSFER_DATA,
      addTransferToEmailHistory: ADD_TRANSFERTO_EMAIL_HISTORY,
    }),
    ...mapActions({
      backToPath: BACK_TO_PATH,
    }),
    onDoneClick() {
      if (this.transferType === TransferType.Email) {
        const user = this.getUser(this.transferToAccount.emailAddress);
        if (!user) {
          this.addTransferToEmailHistory(this.transferToAccount.emailAddress);
        }
      }
      this.flushTransferData();
      this.setIsUserAcctionsDirty(true);
      this.backToPath(RouteDef.Home.path);
    },
    onViewTransactionsClicked() {
      this.$router.push({
        name: RouteDef.TransactionDetail.name,
        params: {
          account_id: this.transaction.from_email,
          transaction_id: this.transaction.id,
          transaction: this.transaction,
        },
      });
    },
    formatAmount,
  },
};
</script>

<style lang="scss" scoped>
.transfer_success {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.md-icon {
  flex: 1;
  height: 72px;
  width: 72px;
  margin-top: 40%;
}

.message {
  flex: 4;
  font-size: 20px;
  line-height: 30px;
  margin: 0px 16px 16px 16px;
  white-space: pre-line;
}

.nonuser-note {
  margin: 1rem 1.5rem;
  text-align: left;
  color: $label-color;
}

.view_transactions {
  bottom: 10px;
}

.md-button.md-raised.primary {
  margin-bottom: 1.5rem;
}
</style>
