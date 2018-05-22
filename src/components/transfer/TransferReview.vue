<template>
    <div class="transfer-review">
        <div class="review-content">
            <div class='from-lbl'>{{ $t('message.transfer.fromlbl') }}</div>
            <div class='from-value'>{{ transferFromAccount.emailAddress }}</div>
            <div class='to-lbl'>{{ $t('message.transfer.tolbl') }}</div>
            <div class='to-value'>{{ transferToAccount.emailAddress }}</div>
            <div class='note-lbl'>{{ $t('message.transfer.notelbl') }}</div>
            <div class='note-value'>{{ transferNote }}</div>

            <md-divider></md-divider>
            <div class='amount-lbl'>{{ $t('message.transfer.amountlbl') }}</div>
            <div class='amount-unit'>MDT</div>
            <div class='amount-value'>{{ transferAmount.toFixed(4) }}</div>
        </div>

        <vue-recaptcha class="recaptcha" v-on:verify="onRecaptchaVerified" sitekey="6LcyaVoUAAAAAO4bHCKeCJTsdJDbgq04n-3OUOSF"></vue-recaptcha>
        <md-button v-on:click="transferMDT" class="transfer md-raised md-primary" :disabled="disableTransferBtn">
            {{ $t('message.transfer.transfer') }}
        </md-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'TransferReview',
  data() {
    return {
      disableTransferBtn: true,
    };
  },
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
  methods: {
    onRecaptchaVerified() {
      this.disableTransferBtn = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer-review {
  margin-left: $defaultPageMargin;
  margin-right: $defaultPageMargin;
  text-align: left;
}

.from-lbl,
.to-lbl,
.note-lbl,
.amount-lbl {
  margin-top: $defaultPageMargin;
  font-weight: bold;
}

.from-value,
.to-value,
.note-value,
.amount-value {
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 16px;
}

.md-divider {
  height: 0px;
  border: solid 1px #e2e5ec;
  margin-top: 8px;
}

.amount-lbl {
    float: left;
    width: 30%;
}

.amount-value {
    float: right;
    font-size: 28px;
    width: 55%;
    text-align: right;
    line-height: 40px;
}

.amount-unit {
    float: right;
    font-size: 16px;
    width: 15%;
    padding-left: 16px;
    padding-top: 12px;
    line-height: 40px;
}

.recaptcha {
  position: absolute;
  bottom: 7em;
  @include center_horizontal;
}

.md-button.transfer {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
