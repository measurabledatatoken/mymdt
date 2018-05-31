<template>
  <div>
    <MDTInputField v-on:amountEntered="setTransferAmount" v-on:amountInvalid="transferAmountInvalid"
      :amount="transferAmount" :max-amount="transferFromAccount.mdtBalance"></MDTInputField>

    <AccountSelector v-on:accountSelected="setTransferFromAccount" :label="$t('message.transfer.fromlbl')" :accounts="fromUserAccounts"
      :selectedAccount="transferFromAccount">
    </AccountSelector>
    <AccountSelector v-on:accountSelected="setTransferToAccount" :label="$t('message.transfer.tolbl')" :enableOther="true"
      :accounts="transferToAccounts" :selectedAccount="transferToAccount">
    </AccountSelector>

    <NoteInputField v-on:infoEntered="setTransferNote" :note="transferNote"></NoteInputField>

    <md-button :to="RouteDef.TransferEmailReview" class="next md-raised md-primary" :disabled="disableNextBtn">
      {{ $t('message.transfer.nextbtn') }}
    </md-button>

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

export default {
  metaInfo() {
    return {
      title: this.$t('message.transfer.emailtitle'),
    };
  },
  components: {
    AccountSelector,
    MDTInputField,
    NoteInputField,
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
      fromUserAccounts: state => state.home.userAccounts,
    }),
    ...mapGetters([
      'transferToAccounts',
    ]),
    isValidEmailAddress() {
      return isValidEmailAddress(this.transferToAccount.emailAddress);
    },
    disableNextBtn() {
      if (this.transferAmount > 0 && this.transferToAccount && this.isWalletAmountValid && this.isValidEmailAddress) {
        return false;
      }
      return true;
    },
    isWalletAmountValid() {
      return this.transferAmount < this.transferFromAccount.mdtBalance;
    },
  },
  created() {
    this.$store.commit('setNavigationTitle', this.$metaInfo.title);
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

<style lang="scss" scoped>
.account-selector {
  height: 80px;
  margin: 16px 0px;
}

.md-button.next {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
