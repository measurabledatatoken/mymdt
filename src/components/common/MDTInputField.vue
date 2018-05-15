<template>
    <div class="mdtinput">
        <div class="label">{{ $t('message.transfer.amountlbl') }}</div>
        <div class="input">
            <input class="amount" type="number" placeholder="0.0000" v-on:change="$emit('amountEntered', $event.target.value)">
            <div class="symbol">MDT</div>
        </div>
        <md-divider></md-divider>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.mdtinput {
  height: 90px;
}

.label {
  text-align: left;
  margin: 16px;

  font-size: 14px;
  font-weight: bold;
  color: $label-color;
}

.amount {
  font-size: 28px;
  color: #aaaaaa;
  text-align: right;
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
