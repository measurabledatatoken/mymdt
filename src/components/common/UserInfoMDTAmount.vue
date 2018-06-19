<template>
  <div class="mdt-amount">
    <div>{{ amountText }}</div>
    <transition :name="transitionName" v-on:after-enter="afterEnter" class="abc">
      <div v-if="amountDelta" class="mdt-amount-delta">{{ amountDeltaText }}</div>
    </transition>
  </div>
</template>

<script>
import { formatAmount } from '@/utils';

export default {
  data() {
    return {
      animating: false,
      amountDelta: 0,
    };
  },
  props: {
    amount: {
      type: Number,
    },
    animated: Boolean,
  },
  computed: {
    amountText() {
      return `${formatAmount(this.amount, { type: 'medium' })} MDT`;
    },
    amountDeltaText() {
      return `${this.amountDelta >= 0 ? '+' : '-'}${formatAmount(this.amountDelta, { type: 'short' })} MDT`;
    },
    transitionName() {
      if (this.amountDelta >= 0) {
        return 'mdt-amount-delta--positive';
      }
      return 'mdt-amount-delta--negative';
    },
  },
  watch: {
    amount(val, oldVal) {
      if (this.animated) {
        this.amountDelta = val - oldVal;
      }
    },
  },
  methods: {
    afterEnter() {
      this.amountDelta = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.mdt-amount {
  text-align: right;
  color: $label-color;
  font-size: 1.25rem;
  font-weight: bold;
  position: relative;

  .mdt-amount-delta {
    font-size: 0.75em;
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    opacity: 0;
  }

  .mdt-amount-delta--positive-enter-active, .mdt-amount-delta--negative-enter-active {
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  .mdt-amount-delta--positive-enter-active {
    color: $theme-secondary-color;
    animation-name: mdt-amount-delta-positive-animation;
  }

  .mdt-amount-delta--negative-enter-active {
    color: $theme-warning-color;
    animation-name: mdt-amount-delta-negative-animation;
  }
}

@keyframes mdt-amount-delta-positive-animation {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@keyframes mdt-amount-delta-negative-animation {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
