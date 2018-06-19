<template>
    <MDTSubtleButton v-on:click="onClick()" :disabled="!enabled">
        <template v-if="enabled">
            {{ $t(countDoneTranslateKey) }}
        </template>
        <template v-else>
            {{ $t(countingTranslateKey, { second: curCountDownSecond}) }}
        </template>
    </MDTSubtleButton>
</template>

<script>
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  components: {
    MDTSubtleButton,
  },
  props: {
    secondsToCount: {
      type: Number,
    },
    countingTranslateKey: {
      type: String,
    },
    countDoneTranslateKey: {
      type: String,
    },
  },
  data() {
    return {
      enabled: false,
      curCountDownSecond: 0,
    };
  },
  mounted() {
    this.curCountDownSecond = this.secondsToCount;
    this.countDown();
  },
  methods: {
    countDown() {
      setTimeout(
        () => {
          this.curCountDownSecond = Math.max(0, this.curCountDownSecond - 1);

          if (this.curCountDownSecond === 0) {
            this.enabled = true;
            this.curCountDownSecond = this.secondsToCount;
          } else {
            this.countDown();
          }
        }, 1000,
      );
    },
    onClick() {
      this.enabled = false;
      this.$emit('click');
      this.countDown();
    },
  },
};
</script>

