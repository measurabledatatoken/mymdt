<template>
  <div>
    <template v-if="transferType === TransferType.Email">
      <md-icon md-src="/static/icons/transaction-success.svg"/>
      <div class="message">
        {{ $t('message.transfer.successdetail_email', { 'finalAmount': formatAmount(finalAmount) }) }}
      </div>

    </template>
    <template v-else>
      <md-icon md-src="/static/icons/transaction-pending.svg"/>
      <div class="message">
        {{ $t('message.transfer.successdetail_ethwallet') }}
      </div>
    </template>

    <MDTPrimaryButton 
      :bottom="true"
      @click="onDoneClick"
    >{{ $t('message.common.done') }}</MDTPrimaryButton>
    <MDTSubtleButton/>
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
import { BACK_TO_HOME } from '@/store/modules/common';

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
  props: {
    finalAmount: {
      type: Number,
      default: null,
    },
    fee: {
      type: Number,
      default: null,
    },
    totalAmount: {
      type: Number,
      default: null,
    },
    transferType: {
      type: String,
      required: true,
      validator(value) {
        return (
          [TransferType.EthWallet, TransferType.Email].indexOf(value) !== -1
        );
      },
    },
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
    }),
    ...mapGetters({
      getUser: 'getUser',
    }),
  },
  created() {
    trackEvent('Transfer Success', {
      'Transfer Mode': this.TransferType,
    });
  },
  methods: {
    ...mapMutations({
      setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
      flushTransferData: FLUSH_TRANSFER_DATA,
      addTransferToEmailHistory: ADD_TRANSFERTO_EMAIL_HISTORY,
    }),
    ...mapActions({
      backToHome: BACK_TO_HOME,
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
      this.backToHome();
    },
    formatAmount,
  },
};
</script>

<style lang="scss" scoped>
.md-icon {
  height: 72px;
  width: 72px;
  margin-top: 50%;
}

.message {
  font-size: 20px;
  line-height: 30px;
  margin: 0px 16px 16px 16px;
  white-space: pre-line;
}
</style>
