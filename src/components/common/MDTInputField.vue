<template>
  <BaseField
    :label="$t('message.transfer.amountlbl')"
    :error="isInSufficientFund && $t('message.transfer.insufficient_fund')"
  >
    <md-input
      v-model="enteredAmount"
      class="amount"
      type="number"
      placeholder="0.0000"
      min="0"
      @change="numberChanged($event.target.valueAsNumber)"
      @blur="handleBlur($event)"
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
      enteredAmount: this.amount === 0 ? undefined : this.amount,
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
    numberChanged(valueAsNumber) {
      if (valueAsNumber) {
        this.enteredAmount = Math.floor(valueAsNumber * 10000) / 10000;
      } else {
        this.enteredAmount = undefined;
      }

      if (!this.isInSufficientFund) {
        this.$emit('amountEntered', this.enteredAmount);
      } else {
        this.$emit('amountInvalid', this.enteredAmount);
      }
    },
    handleBlur(event) {
      if (!event.target.valueAsNumber) {
        this.enteredAmount = undefined;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-field {
  min-height: 5.5rem;
  margin-top: 16px;

  /deep/ .md-field {
    justify-content: flex-end;
    padding-bottom: 1rem;
  }

  /deep/ .md-field {
    margin-bottom: 0.5rem;
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

    &:focus::placeholder {
      opacity: 0;
    }
  }

  .md-suffix {
    margin-left: 1rem;
    margin-top: 0.4rem;
    color: #4a4a4a;
  }
}
</style>
