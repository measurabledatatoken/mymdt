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
      <template v-if="transaction.transaction_type === transactionType.MONTHLY_REWARD || true">
        <TransactionDetailItem  
          :title="$t('message.transaction.detail')" 
        >
          <template
            slot="description"
          > 
            <router-link :to="{ name: RouteDef.DataPointRewardDetail.name, params: { userId: selectedUser.emailAddress }}">{{ $t('message.transaction.viewRewardDetail') }}</router-link> 
          </template>
        </TransactionDetailItem>
      </template>
      <template v-else>
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
          :description="`${formatAmount(transaction.transaction_fee, { type: 'short' })} MDT`"
          :single-line="true"
        />
      </template>
      <TransactionDetailItem
        v-if="typeof transaction.account_balance === 'number'"
        :title="$t('message.transaction.accountBalance')"
        :description="`${formatAmount(transaction.account_balance, { type: 'short' })} MDT`"
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
        :class="['item', 'item--single-line', 'item--problem']"
        @click="showProblemSupportDialog = true"
      >
        {{ $t('message.transaction.problemWithTransation') }}
      </md-list-item>
    </md-list>
    <PinCodeInputPopup 
      ref="pinCodeInputPopup" 
      :md-active.sync="showPinCodeInput" 
      :title="$t('message.passcode.pin_popup_title')"
      @codefilled="onPinCodeFilled" 
      @close-click="showPinCodeInput = false"
    />

    <!-- Problem List popup -->
    <md-dialog 
      :md-active.sync="showProblemSupportDialog" 
      :md-fullscreen="false"
    >
      <md-dialog-content>
        <ul class="transaction-problem-list"> 
          <li @click="onProblemDidNotMakeItClicked">{{ $t('message.transaction.problemDidNotMakeIt') }}</li>
          <li @click="onProblemMakeItAccidentallyClicked">{{ $t('message.transaction.problemMakeItAccidentally') }}</li>
        </ul>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button 
          @click="showProblemSupportDialog = false"
        >{{ $t('message.common.cancel') }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- Confirm to cancel popup -->
    <MDTConfirmPopup 
      :md-active.sync="showConfirmToCancelDialog"
      :md-title="$t('message.transaction.popupCancelTitle')"
      :md-content="$t('message.transaction.popupCancelDescription')"
      :md-confirm-text="$t('message.common.confirm')"
      :md-cancel-text="$t('message.common.go_back')"
      @md-confirm="onConfirmToCancelClicked"
      @md-cancel="onGoBackClicked"
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
import MDTConfirmPopup from '@/components/popup/MDTConfirmPopup';
import { REPORT_PROBLEM } from '@/store/modules/reportProblem';
import { transactionType, transactionStatus } from '@/enum';
import { formatAmount } from '@/utils';
import { CANCEL_TRANSACTION } from '@/store/modules/entities/transactions';
import { RouteDef } from '@/constants';
import { SET_DONE_CALLBACK_PATH, VALIDATE_PIN } from '@/store/modules/security';
import { SET_IS_USER_ACCOUNTS_DIRTY } from '@/store/modules/home';
import { BACK_TO_PATH } from '@/store/modules/common';

export default {
  components: {
    TransactionItem,
    TransactionDetailItem,
    WebViewLink,
    MDTPrimaryButton,
    MDTConfirmPopup,
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
      RouteDef,
      transactionType,
      transactionStatus,
      showPinCodeInput: false,
      showProblemSupportDialog: false,
      showConfirmToCancelDialog: false,
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
      validatePIN: VALIDATE_PIN,
      reportProblem: REPORT_PROBLEM,
      backToPath: BACK_TO_PATH,
    }),
    ...mapMutations({
      setDoneCallbackPath: SET_DONE_CALLBACK_PATH,
      setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
    }),
    formatAmount,
    onConfirmToCancelClicked() {
      this.showConfirmToCancelDialog = false;
      this.showPinCodeInput = true;
    },
    onProblemMakeItAccidentallyClicked() {
      this.showProblemSupportDialog = false;
      this.showConfirmToCancelDialog = true;
    },
    onProblemDidNotMakeItClicked() {
      this.showProblemSupportDialog = false;
      this.reportProblem({
        email_address: this.transaction.from_email,
        comments:
          this.$t('message.transaction.problemDidNotMakeIt') +
          'transaction id: ' +
          this.transaction.id,
      });
    },
    onGoBackClicked() {
      this.showConfirmToCancelDialog = false;
      this.showProblemSupportDialog = true;
    },
    async onPinCodeFilled(pin) {
      try {
        await this.validatePIN(pin);
        this.showPinCodeInput = false;
      } catch (err) {
        console.error(`error in validating: ${err.message}`);
        this.$refs.pinCodeInputPopup.setInvalid();
        return;
      }
      try {
        await this.cancelTransaction({
          applicationId: this.transaction.application_id,
          transactionId: this.transaction.id,
          pin,
        });
        this.setIsUserAcctionsDirty(true);
        this.backToPath(RouteDef.Home.path);
      } catch (err) {
        console.error(`error in cancelTransaction: ${err.message}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transaction-detail-list {
  padding-top: 0;
  /deep/ .md-button {
    left: 50%;
    transform: translateX(-50%);
  }
  /deep/ .md-list-item {
    &.item--problem {
      .md-list-item-content {
        color: $theme-color;
        min-height: 48px;
      }
    }
  }
}
.md-dialog {
  // width: 80%;
  /deep/ .md-dialog-content {
    padding-bottom: 0px;
    ul.transaction-problem-list {
      padding: 0;
      list-style: none;
      li {
        color: $theme-color;
        &:not(:last-child) {
          margin-bottom: 16px;
        }
      }
    }
  }
  /deep/ .md-dialog-actions {
    justify-content: space-between;
    padding-right: 24px;

    .md-ripple {
      padding: 0px;
      justify-content: left;
    }
  }

  /deep/ .md-button-content {
    text-transform: none;
  }
}
</style>
