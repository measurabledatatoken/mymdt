<template>
  <div class="mdtinput">
    <div class="label">{{ $t('message.transfer.amountlbl') }}</div>
    <md-field>
      <md-input class="amount" type="number" placeholder="0.0000" min="0" v-on:change="numberChanged($event.target.value)"
        :value="enteredAmount">
      </md-input>
      <div class="md-suffix">MDT</div>
      <span v-if="isInSufficientFund" class="md-helper-text">{{ $t('message.transfer.insufficient_fund') }}</span>
    </md-field>
  </div>
</template>

<script>
export default {
  props: { amount: Number, maxAmount: Number },
  data() {
    return {
      enteredAmount: this.amount,
    };
  },
  computed: {
    isInSufficientFund() {
      if (this.enteredAmount > this.maxAmount) {
        return true;
      }
      return false;
    },
  },
  methods: {
    numberChanged(value) {
      if (value.length !== 0) {
        this.enteredAmount = parseInt(value, 10);
      }

      if (!this.isInSufficientFund) {
        this.$emit('amountEntered', this.enteredAmount);
      } else {
        this.$emit('amountInvalid', this.enteredAmount);
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.mdtinput {
  height: auto;
}

.label {
  text-align: left;
  margin: 16px $defaultPageMargin 10px $defaultPageMargin;

  font-size: 14px;
  font-weight: bold;
  color: $label-color;
}

.md-field {
  width: calc(100% - #{2 * $defaultPageMargin});
  margin-left: $defaultPageMargin;

  .md-suffix {
    margin-left: 16px;
    margin-bottom: 10px;
  }

  .md-helper-text {
    color: $theme-warning-color
  }
}

.md-input.amount {
  font-size: 28px;
  text-align: right;
  width: 80%;
  margin-bottom: 20px;

  &::placeholder {
    font-size: 28px;
    color: #aaaaaa;
  }
}

.symbol {
  font-size: 16px;
  color: #4a4a4a;
  float: right;
  margin-right: 32px;
  margin-top: 14px;
}
</style>
