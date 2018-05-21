<template>
    <div>
        <div class='from-lbl'>{{ $t('message.transfer.fromlbl') }}</div>
        <div class='from-value'>{{ transferFromAccount.emailAddress  }}</div>
        <div class='to-lbl'>{{ $t('message.transfer.tolbl') }}</div>
        <div class='to-value'>{{ transferToAccount.emailAddress }}</div>
        <div class='note-lbl'>{{ $t('message.transfer.notelbl') }}</div>
        <div class='note-value'>{{ transferNote }}</div>
        <div class='amount-label'>{{ $t('message.transfer.amountlbl') }}</div>
        <div class='amount-value'>{{ transferAmount }}MDT</div>
        <vue-recaptcha sitekey="6LcyaVoUAAAAAO4bHCKeCJTsdJDbgq04n-3OUOSF"></vue-recaptcha>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'TransferReview',
  components: {
    VueRecaptcha,
  },
  computed: {
    ...mapGetters({
      transferAmount: 'transferAmount',
      transferType: 'transferType',
      transferFromAccount: 'transferFromAccount',
      transferToAccount: 'transferToAccount',
      transferToWalletAddress: 'transferToWalletAddress',
      transferNote: 'transferNote',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
