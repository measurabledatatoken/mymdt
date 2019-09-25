<template>
  <div :class="['wallet-address', walletClass]">
    <div class="wallet-address-line">
      <div class="wallet-address-part">
        <span class="card-text">
          0x
        </span>
      </div>
      <div
        v-for="(part, index) in hashParts.slice(0, 5)"
        :key="index"
        class="wallet-address-part"
      >
        <span class="card-text">
          {{ part }}
        </span>
      </div>
    </div>
    <div class="wallet-address-line">
      <div class="wallet-address-part" />
      <div
        v-for="(part, index) in hashParts.slice(5)"
        :key="index"
        class="wallet-address-part"
      >
        <span class="card-text">
          {{ part }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hash: {
      type: String,
      default: '',
    },
    walletClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    hashParts() {
      const parts = [];
      for (let index = 2; index < this.hash.length; index += 4) {
        parts.push(this.hash.slice(index, index + 4));
      }

      return parts;
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet-address {
  display: inline-table;
  border-spacing: 0.5rem 0;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  color: $primary-text-color;
  font-weight: 600;

  .wallet-address-line {
    display: table-row;
  }

  .wallet-address-part {
    display: table-cell;
  }
}
</style>
