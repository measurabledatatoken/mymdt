<template>
  <div>
    <md-list class="transaction-detail-list md-double-line">
      <TransactionItem
        :transaction="transaction"
        show-application
      />
      <md-divider />
      <TransactionDetailItem 
        :title="$t('message.transaction.type')" 
        :description="$t(transactionType.properties[transaction.transaction_type].messageId)"
      />
      <TransactionDetailItem 
        :title="$t('message.transaction.time')" 
        :description="$d(new Date(transaction.transaction_time), 'long')"
      />
      <!-- <TransactionDetailItem v-if="!!transaction.detail" :title="$t('message.transaction.detail')" :description="transaction.detail" /> -->
      <TransactionDetailItem 
        v-if="!!from" 
        :title="$t('message.transaction.from')" 
        :description="from"
      />
      <TransactionDetailItem 
        v-if="!!to" 
        :title="$t('message.transaction.to')" 
        :description="to"
      />
      <TransactionDetailItem 
        v-if="!!transaction.note" 
        :title="$t('message.transaction.note')" 
        :description="transaction.note"
      />
      <TransactionDetailItem
        v-if="typeof transaction.transaction_fee === 'number'"
        :title="$t('message.transaction.transactionFee')"
        :description="`${formatAmount(transaction.transaction_fee, { type: 'long' })} MDT`"
        :single-line="true"
      />
      <TransactionDetailItem
        v-if="typeof transaction.account_balance === 'number'"
        :title="$t('message.transaction.accountBalance')"
        :description="`${formatAmount(transaction.account_balance, { type: 'long' })} MDT`"
        :single-line="true"
      />
      <TransactionDetailItem
        v-if="transaction.ethereum_transaction && transaction.ethereum_transaction.etherscan_link"
        :title="$t('message.transaction.transactionRecord')"
      >
        <template
          slot="description"
        >
          <WebViewLink
            :to="transaction.ethereum_transaction.etherscan_link"
            external
          >{{ transaction.ethereum_transaction.etherscan_link }}</WebViewLink>
        </template>
      </TransactionDetailItem>
      <md-list-item 
        v-if="transaction.status === transactionStatus.PENDING_TO_CLAIM && transaction.transaction_type === transactionType.INTERNAL_TRANSFER"
        :class="['item', 'item--single-line']"
      >
        <MDTPrimaryButton 
          @click="onCancelClicked"
        >{{ $t("message.transaction.cancel") }}</MDTPrimaryButton>
      </md-list-item>
    </md-list>
    <PinCodeInputPopup 
      ref="pinCodeInputPopup" 
      :md-active.sync="showPinCodeInput" 
      :title="$t('message.passcode.pin_popup_title')"
      @codefilled="onPinCodeFilled" 
      @close-click="showPinCodeInput = false"
      @fotgot-click="onFotgotClicked"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BasePage from '@/screens/BasePage';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionDetailItem from '@/components/transaction/TransactionDetailItem';
import WebViewLink from '@/components/common/WebViewLink';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import PinCodeInputPopup from '@/components/popup/PinCodeInputPopup';

import { transactionType, transactionStatus } from '@/enum';
import { formatAmount } from '@/utils';
import { CANCEL_TRANSACTION } from '@/store/modules/transaction';
import { RouteDef } from '@/constants';
import {
  SET_DONE_CALLBACK_PATH,
  SET_SELECTED_USER,
  VALIDATE_PIN_FOR_SELECTED_USER,
} from '@/store/modules/security';

export default {
  components: {
    TransactionItem,
    TransactionDetailItem,
    WebViewLink,
    MDTPrimaryButton,
    PinCodeInputPopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transaction.title'),
    };
  },
  data() {
    return {
      transactionType,
      transactionStatus,
      showPinCodeInput: false,
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getTransaction: 'getTransaction',
    }),
    transaction() {
      return (
        this.$route.params.transaction ||
        this.getTransaction(this.$route.params.transaction_id) ||
        {}
      );
    },
    from() {
      switch (this.transaction.transaction_type) {
        case transactionType.INTERNAL_TRANSFER: {
          return this.transaction.from_email;
        }
        case transactionType.EXTERNAL_TRANSFER: {
          return this.transaction.from_eth_wallet;
        }
        default: {
          return null;
        }
      }
    },
    to() {
      switch (this.transaction.transaction_type) {
        case transactionType.INTERNAL_TRANSFER: {
          return this.transaction.to_email;
        }
        case transactionType.EXTERNAL_TRANSFER: {
          return this.transaction.to_eth_wallet;
        }
        default: {
          return null;
        }
      }
    },
  },
  methods: {
    ...mapActions({
      cancelTransaction: CANCEL_TRANSACTION,
      validatePIN: VALIDATE_PIN_FOR_SELECTED_USER,
    }),
    ...mapMutations({
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setSelectedUser: SET_SELECTED_USER,
    }),
    formatAmount,
    onCancelClicked() {
      this.showPinCodeInput = true;
    },

    onPinCodeFilled(pin) {
      this.validatePIN(pin)
        .catch(err => {
          this.$refs.pinCodeInputPopup.setInvalid();
          throw err;
        })
        .then(() => {
          this.showPinCodeInput = false;
          this.cancelTransaction({
            applicationId: this.transaction.application_id,
            transactionId: this.transaction.id,
            pin,
          })
            .then(() => {
              this.$router.back();
            })
            .catch(err => {
              console.log(`error in cancelTransaction: ${err.message}`);
            });
        });
    },
    onFotgotClicked() {
      this.setSelectedUser(this.selectedUser.emailAddress);
      this.$router.push({
        name: RouteDef.PinCodeForgot.name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-detail-list {
  padding-top: 0;
  /deep/ .md-button {
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
</style>
