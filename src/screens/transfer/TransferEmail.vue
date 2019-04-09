<template>
  <PaddedContainer class="transfer-email">
    <MDTInputField 
      :amount="transferAmount" 
      :max-amount="selectedUser.mdtBalance" 
      class="mdtinput"
      @amountEntered="onAmountEntered"
      @amountInvalid="transferAmountInvalid"
    />
    <AccountSelector 
      :label="$t('message.transfer.fromlbl')"
      :accounts="allUsers" 
      :selected-account="selectedUser"
      class="transfer-from" 
      @accountSelected="onAccountSelected"
      @menuOpened="onTransferFromMenuOpened"
    />
    <AccountSelector 
      :label="$t('message.transfer.tolbl')" 
      :enable-other="true" 
      :accounts="transferToAccounts"
      :selected-account="transferToAccount" 
      :is-email-valid="isValidEmailAddress"
      :invalid-email-text="$t('message.error.invalid_email')"
      class="transfer-to"
      @accountSelected="onTransferToAccountSelected"
      @menuOpened="onTransferToMenuOpened"
      @otherSelected="onTransferToOtherSelected"
    />
    <NoteInputField 
      :note="transferNote" 
      class="note"
      @infoEntered="onNoteEntered"
    />
    <MDTPrimaryButton 
      :disabled="disableNextBtn"
      :bottom="false" 
      @click="onNextClicked"
    >
      {{ $t('message.common.nextbtn') }}
    </MDTPrimaryButton>
  </PaddedContainer>

</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import TransferType from '@/enum/transferType';
import { RouteDef } from '@/constants';
import { isValidEmailAddress, trackEvent } from '@/utils';
import {
  SET_TRANSFER_AMOUNT,
  SET_TRANSFER_TYPE,
  SET_TRANSFER_TO_ACCOUNT,
  SET_TRANSFER_NOTE,
} from '@/store/modules/transfer';
import { SET_SELECTED_USER } from '@/store/modules/home';

import AccountSelector from '@/components/common/AccountSelector';
import MDTInputField from '@/components/common/MDTInputField';
import NoteInputField from '@/components/common/NoteInputField';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import PaddedContainer from '@/components/containers/PaddedContainer';

import BasePage from '@/screens/BasePage';

const eventProperties = { 'Transfer Mode': TransferType.Email };

export default {
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
    MDTPrimaryButton,
    PaddedContainer,
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
      transferToAccount: state => state.transfer.transferToAccount,
      transferNote: state => state.transfer.transferNote,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      transferToAccounts: 'transferToAccounts',
      allUsers: 'getAllUsers',
    }),
    isValidEmailAddress() {
      if (!this.transferToAccount || !this.transferToAccount.emailAddress) {
        return null;
      }
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
      return this.transferAmount <= this.selectedUser.mdtBalance;
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
      setTransferToAccount: SET_TRANSFER_TO_ACCOUNT,
      setSelectedUser: SET_SELECTED_USER,
    }),
    transferAmountInvalid() {
      this.setTransferAmount(0);
    },
    onAmountEntered(amount) {
      trackEvent('Enter amount', eventProperties);
      this.setTransferAmount(amount);
    },
    onAccountSelected(account) {
      trackEvent('Choose account for "from"', eventProperties);
      this.setSelectedUser(account.emailAddress);
      if (
        this.transferToAccount &&
        account.emailAddress === this.transferToAccount.emailAddress
      ) {
        this.setTransferToAccount(null);
      }
    },
    onTransferFromMenuOpened() {
      trackEvent('Click on the dropdown arrow for "from"', eventProperties);
    },
    onTransferToAccountSelected(account) {
      trackEvent('Choose an existing account for "to"', eventProperties);
      this.setTransferToAccount(account);
    },
    onTransferToMenuOpened() {
      trackEvent('Click on the dropdown arrow for "to"', eventProperties);
    },
    onTransferToOtherSelected() {
      trackEvent('Choose “Other Email Account"', eventProperties);
      this.setTransferToAccount(null);
    },
    onNoteEntered(note) {
      trackEvent('Input Note', eventProperties);
      this.setTransferNote(note);
    },
    onNextClicked() {
      trackEvent('Click on next button to confirm transfer', eventProperties);
      this.$router.push(RouteDef.TransferReview.path);
    },
  },
};
</script>


<style lang="scss" scoped>
.transfer-email {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mdtinput,
.transfer-from,
.transfer-to,
.note {
  width: 100%;
}

.md-button.md-raised.primary {
  margin-top: auto;
  margin-bottom: 30px;
}
</style>
