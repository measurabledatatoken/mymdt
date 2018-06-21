<template>
  <div>
    <template v-if="transferType === TransferType.Email">
      <md-icon md-src="/static/icons/transaction-success.svg"></md-icon>
      <div class="message">

        {{ $t('message.transfer.successdetail_email', { 'finalAmount': formatAmount(finalAmount) })}}
        <br>
      </div>

    </template>
    <template v-else>
      <md-icon md-src="/static/icons/transaction-pending.svg"></md-icon>
      <div class="message">

        {{ $t('message.transfer.successdetail_ethwallet')}}
        <br>
      </div>
    </template>

    <MDTPrimaryButton @click="onDoneClick" :bottom="true">{{ $t('message.common.done') }}</MDTPrimaryButton>
    <MDTSubtleButton :to="Route"></MDTSubtleButton>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { RouteDef, TransferType } from '@/constants';
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import { SET_IS_USER_ACCOUNTS_DIRTY } from '@/store/modules/home';
import { FLUSH_TRANSFER_DATA } from '@/store/modules/transfer';
import { BACK_TO_HOME } from '@/store/modules/common';

import { formatAmount } from '@/utils';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.successtitle'),
    };
  },
  components: {
    MDTPrimaryButton,
    MDTSubtleButton,
  },
  props: {
    finalAmount: {
      type: Number,
    },
    fee: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    transferType: {
      type: String,
      validator(value) {
        return [TransferType.EthWallet, TransferType.Email].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      RouteDef,
      TransferType,
    };
  },
  methods: {
    ...mapMutations(
      {
        setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
        flushTransferData: FLUSH_TRANSFER_DATA,
      },
    ),
    ...mapActions(
      {
        backToHome: BACK_TO_HOME,
      },
    ),
    onDoneClick() {
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
  margin-top: 20px;
  font-size: 20px;
  line-height: 30px;
  margin: 16px;
}
</style>
