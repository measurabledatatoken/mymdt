<template>
  <BasePageContainer class="transfer-ethwallet">
    <MDTInputField 
      :amount="transferAmount"
      :max-amount="transferFromAccount.mdtBalance"
      class="mdtinput"
      @amountEntered="onAmountEntered"
      @amountInvalid="transferAmountInvalid"
    />
    <div class="transaction-fee">
      <div class="transaction-fee-lbl">{{ $t('message.transfer.transaction_fee') }}</div>
      <md-button 
        :md-ripple="false"
        class="transaction-fee-icon md-icon-button"
        @click="showTutorial = true"
      >
        <md-icon md-src="/static/icons/question-mark-home.svg"/>
      </md-button>
      <div class="transaction-fee-value"> {{ formatAmount(transactionFee) }} MDT</div>
    </div>

    <div class="final-amount">
      <div class="final-amount-lbl">{{ $t('message.transfer.final_amount') }}</div>
      <div 
        :class="{ 'negative': isFinalAmountSmallerThanZero }"
        class="final-amount-value"
      > {{ finalAmountStr }} MDT</div>
    </div>

    <div class="extra-space"/>
    <AccountSelector 
      :label="$t('message.transfer.fromlbl')"
      :accounts="fromUserAccounts"
      :selected-account="transferFromAccount"
      class="transfer-from"
      @accountSelected="onTransferFromAccountSelected"
      @menuOpened="onTransferFromMenuOpened"
    />
    <WalletAddressField 
      :label="$t('message.transfer.tolbl')"
      :init-wallet-address="transferToWalletAddress"
      class="address-field"
      @walletAddressEntered="walletAddressEntered"
      @walletAddressInvalid="walletAddressInvalid"
    />
    <NoteInputField 
      :note="transferNote"
      class="note"
      @infoEntered="setTransferNote"
    />
    <MDTPrimaryButton 
      :disabled="disableNextBtn"
      @click="onNextClicked"
    >
      {{ $t('message.common.nextbtn') }}
    </MDTPrimaryButton>

    <md-dialog-alert 
      :md-active.sync="showTutorial"
      :md-title="$t('message.transfer.tutorial_title')"
      :md-content="$t('message.transfer.tutorial_description')"
      :md-confirm-text="$t('message.common.okay')"
    />
  </BasePageContainer>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TransferType from '@/enum/transferType';
import { RouteDef } from '@/constants';
import { formatAmount, trackEvent } from '@/utils';
import {
  SET_TRANSFER_AMOUNT,
  SET_TRANSFER_TYPE,
  SET_TRANSFER_FROM_ACCOUNT,
  SET_TRANSFER_TO_WALLETADDRESS,
  SET_TRANSFER_NOTE,
} from '@/store/modules/transfer';

import BasePage from '@/screens/BasePage';
import BasePageContainer from '@/screens/BasePageContainer';

import AccountSelector from '@/components/common/AccountSelector';
import MDTInputField from '@/components/common/MDTInputField';
import NoteInputField from '@/components/common/NoteInputField';
import WalletAddressField from '@/components/common/WalletAddressField';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

const eventProperties = { 'Transfer Mode': TransferType.EthWallet };

export default {
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
    WalletAddressField,
    MDTPrimaryButton,
    BasePageContainer,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.ethtitle'),
    };
  },
  data() {
    return {
      RouteDef,
      isWalletAddressValid: false,
      showTutorial: false,
    };
  },
  computed: {
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
      transferFromAccount: state => state.transfer.transferFromAccount,
      transferToWalletAddress: state => state.transfer.transferToWalletAddress,
      transferNote: state => state.transfer.transferNote,
      ethAddressScanned: state => state.qrcode.ethAddressScanned,
    }),
    ...mapGetters({
      fromUserAccounts: 'getAllUsers',
      transactionFee: 'transactionFee',
      finalAmount: 'finalAmount',
    }),
    disableNextBtn() {
      if (
        this.transferAmount > 0 &&
        this.transferToWalletAddress &&
        this.isWalletAddressValid &&
        this.finalAmount > 0 &&
        this.isWalletAmountValid
      ) {
        return false;
      }
      return true;
    },
    finalAmountStr() {
      return this.finalAmount <= 0 ? '--' : formatAmount(this.finalAmount);
    },
    isWalletAmountValid() {
      return this.transferAmount <= this.transferFromAccount.mdtBalance;
    },
    isFinalAmountSmallerThanZero() {
      if (this.finalAmount <= 0) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.setTransferType(TransferType.EthWallet);

    if (this.ethAddressScanned != null) {
      this.setTransferToWalletAddress(this.ethAddressScanned);
    }
  },
  methods: {
    ...mapMutations({
      setTransferAmount: SET_TRANSFER_AMOUNT,
      setTransferType: SET_TRANSFER_TYPE,
      setTransferNote: SET_TRANSFER_NOTE,
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
      setTransferToWalletAddress: SET_TRANSFER_TO_WALLETADDRESS,
    }),
    transferAmountInvalid() {
      this.setTransferAmount(0);
    },
    walletAddressEntered(value) {
      trackEvent('Enter ETH wallet address', eventProperties);
      this.isWalletAddressValid = true;
      this.setTransferToWalletAddress(value);
    },
    walletAddressInvalid() {
      this.isWalletAddressValid = false;
    },
    onAmountEntered(amount) {
      trackEvent('Enter amount', eventProperties);
      this.setTransferAmount(amount);
    },
    onTransferFromAccountSelected(account) {
      trackEvent('Choose account for "from"', eventProperties);
      this.setTransferFromAccount(account);
    },
    onTransferFromMenuOpened() {
      trackEvent('Click on the dropdown arrow for "from"', eventProperties);
    },
    onNextClicked() {
      trackEvent('Click on next button to confirm transfer', eventProperties);
      this.$router.push(RouteDef.TransferReview.path);
    },
    formatAmount,
  },
};
</script>

<style lang='scss' scoped>
.transfer-ethwallet {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transaction-fee,
.final-amount {
  margin-left: $defaultPageMargin;
  margin-right: $defaultPageMargin;
  min-height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.transaction-fee-lbl,
.final-amount-lbl {
  float: left;
  width: auto;
  text-align: left;
  font-weight: bold;
}

.transaction-fee-icon {
  float: left;
  width: 10%;
  min-width: 0px;
  height: 20px;
  margin: 0px;

  &:active:before,
  &:focus:before {
    background-color: white;
  }
}

.transaction-fee-value {
  float: right;
  width: 50%;
  text-align: right;
}

.final-amount-value {
  float: right;
  width: 60%;
  text-align: right;
}

.final-amount-value.negative {
  color: $theme-warning-color;
}

.extra-space {
  height: 10px;
}

.md-dialog {
  /deep/ .md-dialog-title {
    font-weight: bold;
  }

  /deep/ .md-dialog-actions {
    justify-content: center;
  }

  /deep/ .md-button-content {
    font-weight: bold;
    text-transform: none;
  }
}

.mdtinput,
.transaction-fee,
.final-amount,
.transfer-from,
.address-field,
.note {
  width: 100%;
}

.md-button.md-raised.primary {
  margin-top: auto;
  margin-bottom: 30px;
}
</style>
