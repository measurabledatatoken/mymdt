<template>
  <div>
    <MDTInputField 
      :amount="transferAmount" 
      :max-amount="transferFromAccount.mdtBalance" 
      @amountEntered="setTransferAmount"
      @amountInvalid="transferAmountInvalid"
    />
    <AccountSelector 
      :label="$t('message.transfer.fromlbl')" 
      :accounts="fromUserAccounts"
      :selected-account="transferFromAccount" 
      @accountSelected="setTransferFromAccount"
    />
    <AccountSelector 
      :label="$t('message.transfer.tolbl')" 
      :enable-other="true" 
      :accounts="transferToAccounts"
      :selected-account="transferToAccount" 
      @accountSelected="setTransferToAccount"
    />
    <NoteInputField 
      :note="transferNote" 
      @infoEntered="setTransferNote"
    />
    <MDTPrimaryButton 
      :to="RouteDef.TransferReview.path" 
      :disabled="disableNextBtn" 
      :bottom="true"
    >{{ $t('message.common.nextbtn') }}</MDTPrimaryButton>
  </div>

</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import {
  SET_TRANSFER_AMOUNT,
  SET_TRANSFER_TYPE,
  SET_TRANSFER_FROM_ACCOUNT,
  SET_TRANSFER_TO_ACCOUNT,
  SET_TRANSFER_NOTE,
} from '@/store/modules/transfer';
import AccountSelector from '@/components/common/AccountSelector';
import MDTInputField from '@/components/common/MDTInputField';
import NoteInputField from '@/components/common/NoteInputField';
import { RouteDef, TransferType } from '@/constants';
import { isValidEmailAddress } from '@/utils';
import BasePage from '@/screens/BasePage';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';

export default {
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
    MDTPrimaryButton,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transfer.emailtitle'),
    };
  },
  data() {
    return {
      RouteDef,
    };
  },
  computed: {
    ...mapState({
      transferAmount: state => state.transfer.transferAmount,
      transferFromAccount: state => state.transfer.transferFromAccount,
      transferToAccount: state => state.transfer.transferToAccount,
      transferNote: state => state.transfer.transferNote,
    }),
    ...mapGetters({
      transferToAccounts: 'transferToAccounts',
      fromUserAccounts: 'getAllUsers',
    }),
    isValidEmailAddress() {
      return isValidEmailAddress(this.transferToAccount.emailAddress);
    },
    disableNextBtn() {
      if (
        this.transferAmount > 0 &&
        this.transferToAccount &&
        this.isWalletAmountValid &&
        this.isValidEmailAddress
      ) {
        return false;
      }
      return true;
    },
    isWalletAmountValid() {
      return this.transferAmount <= this.transferFromAccount.mdtBalance;
    },
  },
  created() {
    this.setTransferType(TransferType.Email);
  },
  methods: {
    ...mapMutations({
      setTransferAmount: SET_TRANSFER_AMOUNT,
      setTransferType: SET_TRANSFER_TYPE,
      setTransferNote: SET_TRANSFER_NOTE,
      setTransferFromAccount: SET_TRANSFER_FROM_ACCOUNT,
      setTransferToAccount: SET_TRANSFER_TO_ACCOUNT,
    }),
    transferAmountInvalid() {
      this.setTransferAmount(0);
    },
  },
};
</script>
