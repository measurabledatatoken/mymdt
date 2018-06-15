<template>
  <md-list-item class="reward-item" v-bind="$attrs">
    <div class="reward-item__info">
      <md-icon class="reward-item__icon" md-src="/static/icons/done.svg" />
      <div class="md-list-item-text">
        <span class="reward-item__info-title">{{ reward.name }}</span>
      </div>
    </div>
    <div class="reward-item__action">
      <div class="action__amount-placholder">
        <transition name="action__amount-to-earn">
          <span v-show="!claimed" class="action__amount-to-earn">{{getAmountText()}}</span>
        </transition>
        <transition name="action__claim-button" v-on:after-leave="afterLeave">
          <MDTSecondaryButton
            v-show="!claimed"
            @click="handleClickClaimButton"
            ref="claimButton"
            class="action__claim-button"
            color="secondary"
            :style="claimButtonStyle"
          >
            {{getButtonText()}}
          </MDTSecondaryButton>
        </transition>
        <div class="action__amount-wrapper">
          <transition name="action__amount">
            <MDTSecondaryButton v-if="showAmount" class="action__amount" disabled>{{ `+${getAmountText()}` }}</MDTSecondaryButton>
          </transition>
          <transition name="deco">
            <span v-if="showAmount" class="deco deco__left deco__left-1"></span>
          </transition>
          <transition name="deco">
            <span v-if="showAmount" class="deco deco__left deco__left-2"></span>
          </transition>
          <transition name="deco">
            <span v-if="showAmount" class="deco deco__left deco__left-3"></span>
          </transition>
          <transition name="deco">
            <span v-if="showAmount" class="deco deco__right deco__right-1"></span>
          </transition>
          <transition name="deco">
            <span v-if="showAmount" class="deco deco__right deco__right-2"></span>
          </transition>
          <transition name="deco">
            <span v-if="showAmount" class="deco deco__right deco__right-3"></span>
          </transition>
        </div>
      </div>
    </div>
  </md-list-item>
</template>

<script>
import { mapActions } from 'vuex';

import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import { CLAIM_REWARD } from '@/store/modules/entities/rewards';
import { formatAmount } from '@/utils';

export default {
  props: {
    reward: Object,
    userId: String,
  },
  data() {
    return {
      claimButtonStyle: null,
      // animationPlaceholderStyle: null,
      showAmount: false,
    };
  },
  computed: {
    claimed() {
      return this.reward.status === 4;
    },
  },
  methods: {
    ...mapActions({
      claimReward: CLAIM_REWARD,
    }),
    getButtonText() {
      if (this.claimed) {
        return '';
      }
      return this.$t('message.earnMDT.claim');
    },
    getAmountText() {
      return `${formatAmount(this.reward.value, { type: 'short' })} ${this.reward.currency}`;
    },
    handleClickClaimButton() {
      this.claimReward({
        rewardId: this.reward.id,
        userId: this.userId,
      });
    },
    afterLeave() {
      this.showAmount = true;
    },
  },
  created() {
    if (this.reward.status === 4) {
      this.showAmount = true;
    }
  },
  mounted() {
    this.claimButtonStyle = {
      height: `${this.$refs.claimButton.$el.clientHeight}px`,
      width: `${this.$refs.claimButton.$el.clientWidth}px`,
    };

    // TODO: is more fine-tuned needed?
    // const style = this.$refs.claimButton.$el.currentStyle || window.getComputedStyle(this.$refs.claimButton.$el);
    // const marginVertical = parseInt(style.marginTop, 10) + parseInt(style.marginRight, 10);
    // const marginHorizontal = parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);

    // this.animationPlaceholderStyle = {
    //   height: `${this.$refs.claimButton.$el.clientHeight + marginVertical}px`,
    //   width: `${this.$refs.claimButton.$el.clientWidth + marginHorizontal}px`,
    // };
  },
  components: {
    MDTSecondaryButton,
  },
};
</script>

<style lang="scss" scoped>
.reward-item {
  /deep/ .md-list-item-content {
    display: block;
  }

  .reward-item__info {
    display: flex;
    align-items: flex-start;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 0.5rem;

    .reward-item__info-title {
      font-weight: bold;
      color: $label-color;
    }

    .reward-item__icon {
      line-height: 1.25rem;
      width: 1rem;
      height: 1rem;

      /deep/ svg {
        fill: $theme-secondary-color;
      }
    }
  }

  .reward-item__action {
    justify-content: flex-end;
    display: flex;

    .action__claim-button {
      margin-right: 0px;
      margin-left: 0px;
    }

    .action__claim-button-leave-active {
      min-width: 0;
      animation-name: shrink;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    .action__amount-to-earn {
      font-size: 0.875rem;
      color: $theme-secondary-color;
      margin-right: 0.625rem;
    }

    .action__amount-to-earn-leave-active {
      animation-name: action__amount-to-earn-animation;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    .action__amount-placholder {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      line-height: 1.25rem;

      .action__amount-wrapper {
        position: relative;

        .action__amount {
          background-color: transparent;
          color: $theme-secondary-color;
          min-width: 0;
          /deep/ .md-ripple {
            padding: 0;
          }
        }

        .action__amount-enter-active {
          animation-name: zoomIn;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .deco-enter-active {
          animation-name: vanish;
          animation-duration: 650ms;
          animation-delay: 150ms;
          animation-fill-mode: forwards;
        }

        .deco {
          height: 2px;
          width: 0px;
          background-color: $theme-secondary-color;
          position: absolute;

          &.deco__left {
            left: 0px;

            &.deco__left-1 {
              top: 16%;
              transform: translateY(-50%) rotate(10deg);
            }

            &.deco__left-2 {
              top: 50%;
              transform: translateY(-50%);
            }

            &.deco__left-3 {
              top: 84%;
              transform: translateY(-50%) rotate(-10deg);
            }
          }

          &.deco__right {
            right: 0px;

            &.deco__right-1 {
              top: 16%;
              transform: translateY(-50%) rotate(-10deg);
            }

            &.deco__right-2 {
              top: 50%;
              transform: translateY(-50%);
            }

            &.deco__right-3 {
              top: 84%;
              transform: translateY(-50%) rotate(10deg);
            }
          }
        }
      }
    }
  }
}

@keyframes shrink {
  65% {
    width: 24px;
    transform: scale3d(1, 1, 1);
  }
  to {
    width: 24px;
    transform: scale3d(0, 0, 0);
  }
}

@keyframes action__amount-to-earn-animation {
  from {
    opacity: 1;
    // transform: translateX(0);
  }
  to {
    opacity: 0;;
    // transform: translateX(100%);
  }
}

@keyframes vanish {
  from { width: 14px;}
  to { width: 0px; }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
  75% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

</style>

