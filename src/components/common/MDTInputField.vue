<template>
    <div class="mdtinput">
        <div class="label">{{ $t('message.transfer.amountlbl') }}</div>
        <md-field>
            <md-input class="amount" type="number" placeholder="0.0000" v-on:change="$emit('amountEntered', $event.target.value)">
            </md-input>
            <div class="md-suffix">MDT</div>
        </md-field>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.mdtinput {
  height: 100px;
}

.label {
  text-align: left;
  margin: 16px $transferMarginLeftRight 10px $transferMarginLeftRight;

  font-size: 14px;
  font-weight: bold;
  color: $label-color;
}

.md-field {
  width: calc(100% - #{ 2 * $transferMarginLeftRight });
  margin-left: $transferMarginLeftRight;

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

.md-divider {
  background-color: $divider-color;
  width: 90%;
  margin-left: 5%;
  height: 2px;
  margin-top: 10px;
}
</style>
