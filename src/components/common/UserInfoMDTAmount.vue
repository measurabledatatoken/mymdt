<template>
  <div 
    :disabled="disabled" 
    class="mdt-amount"
  >
    <div>{{ amountText }}</div>
    <transition 
      :name="transitionName"
      class="abc"
      @after-enter="afterEnter"
    >
      <div 
        v-if="amountDelta"
        class="mdt-amount-delta"
      >{{ amountDeltaText }}</div>
    </transition>
  </div>
</template>

<script>
import { formatAmount } from '@/utils';

export default {
  props: {
    amount: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      animating: false,
      amountDelta: 0,
    };
  },
  computed: {
    amountText() {
      if (this.amount === undefined) {
        return '--MDT';
      }
      return `${formatAmount(this.amount)} MDT`;
    },
    amountDeltaText() {
      return `${this.amountDelta >= 0 ? '+' : '-'}${formatAmount(
        this.amountDelta,
        { type: 'short' },
      )} MDT`;
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

  &[disabled] {
    opacity: 0.6;
  }

  .mdt-amount-delta {
    font-size: 0.75em;
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    opacity: 0;
  }

  .mdt-amount-delta--positive-enter-active,
  .mdt-amount-delta--negative-enter-active {
    animation-duration: 1s;
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
    transform: translateY(-200%);
  }
}

@keyframes mdt-amount-delta-negative-animation {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(200%);
  }
}
</style>
