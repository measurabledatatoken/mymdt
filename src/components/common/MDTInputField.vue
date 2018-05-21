<template>
  <div class="mdtinput">
    <div class="label">{{ $t('message.transfer.amountlbl') }}</div>
    <md-field>
      <md-input class="amount" type="number" placeholder="0.0000" min="0" v-on:change="numberChanged($event.target.value)"
        :value="amount">
      </md-input>
      <div class="md-suffix">MDT</div>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'MDTInputField',
  props: { amount: Number },
  methods: {
    numberChanged(value) {
      let amount = 0;
      if (value.length !== 0) {
        amount = parseInt(value, 10);
      }
      this.$emit('amountEntered', amount);
    },
  },
};
</script>

<style lang="scss" scoped>
.mdtinput {
  height: 100px;
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
