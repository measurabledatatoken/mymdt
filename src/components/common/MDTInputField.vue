<template>
  <BaseField
    :label="$t('message.transfer.amountlbl')"
    :error="isInSufficientFund && $t('message.transfer.insufficient_fund')"
  >
    <md-input
      :value="enteredAmount"
      class="amount"
      type="number"
      placeholder="0.0000"
      min="0"
      @change="numberChanged($event.target.value)"
    />
    <span class="md-suffix">MDT</span>
  </BaseField>
</template>

<script>
import BaseField from '@/components/input/BaseField';

export default {
  components: {
    BaseField,
  },
  props: {
    amount: {
      type: Number,
      default: null,
    },
    maxAmount: {
      type: Number,
      default: 0,
    },
  },
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
.base-field {
  /deep/ .md-field {
    justify-content: flex-end;
    padding-bottom: 1rem;
  }

  .md-input {
    text-align: right;

    &.amount,
    &::placeholder {
      font-size: 1.75rem;
    }

    &::placeholder {
      color: $theme-placehoder-color;
    }
  }

  .md-suffix {
    margin-left: 1rem;
  }
}
</style>
