<template>
  <BaseEarnMDTItem
    :title="reward.name"
    :reward="reward"
    :user-id="userId"
    v-bind="$attrs"
    class="earn-mdt-reward-item"
    md-src="/static/icons/done.svg"
  >
    <template slot="action">
      <div class="earn-mdt-reward-item-action">
        <div class="earn-mdt-reward-item-action__amount-placholder">
          <transition  
            name="earn-mdt-reward-item-action__claim-button"    
            @after-leave="afterLeave" 
          >
            <MDTSecondaryButton
              v-show="!claimed"
              ref="claimButton"
              :style="claimButtonStyle"
              class="earn-mdt-reward-item-action__claim-button"
              color="secondary"
              @click="handleClickClaimButton"
            >
              {{ buttonText + " " + amountText }}
            </MDTSecondaryButton>
          </transition>
          <div class="earn-mdt-reward-item-action__amount-wrapper">
            <transition name="earn-mdt-reward-item-action__amount">
              <MDTSecondaryButton 
                v-if="showAmount" 
                class="earn-mdt-reward-item-action__amount" 
                disabled
              >{{ `+${amountText}` }}</MDTSecondaryButton>
            </transition>
            <transition 
              v-for="n in 8" 
              :key="n" 
              name="deco"
            >    
              <span  
                v-if="showAmount" 
                :class="['deco', 'deco-' + n]"
              />
            </transition> 
          </div>
        </div>
      </div>
    </template>
  </BaseEarnMDTItem>
</template>

<script>
import { mapActions } from 'vuex';
import { trackEvent } from '@/utils';

import BaseEarnMDTItem from '@/components/task/BaseEarnMDTItem';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import { CLAIM_REWARD } from '@/store/modules/entities/rewards';
import { formatAmount } from '@/utils';

export default {
  components: {
    BaseEarnMDTItem,
    MDTSecondaryButton,
  },
  props: {
    reward: {
      type: Object,
      default: null,
    },
    userId: {
      type: String,
      default: '',
    },
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
    buttonText() {
      return this.claimed ? '' : this.$t('message.earnMDT.claim');
    },
    amountText() {
      return `${formatAmount(this.reward.value, { type: 'short' })} ${
        this.reward.currency
      }`;
    },
  },
  created() {
    if (this.reward.status === 4) {
      this.showAmount = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.claimButtonStyle = {
        height: `${this.$refs.claimButton.$el.clientHeight}px`,
        width: `${this.$refs.claimButton.$el.clientWidth}px`,
      };
    });

    // TODO: is more fine-tuned needed?
    // const style = this.$refs.claimButton.$el.currentStyle || window.getComputedStyle(this.$refs.claimButton.$el);
    // const marginVertical = parseInt(style.marginTop, 10) + parseInt(style.marginRight, 10);
    // const marginHorizontal = parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);

    // this.animationPlaceholderStyle = {
    //   height: `${this.$refs.claimButton.$el.clientHeight + marginVertical}px`,
    //   width: `${this.$refs.claimButton.$el.clientWidth + marginHorizontal}px`,
    // };
  },
  methods: {
    ...mapActions({
      claimReward: CLAIM_REWARD,
    }),
    handleClickClaimButton() {
      trackEvent('Click on claim button', {
        'Reward Name': this.reward.name,
      });
      this.claimReward({
        rewardId: this.reward.id,
        userId: this.userId,
      });
    },
    afterLeave() {
      this.showAmount = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.earn-mdt-reward-item {
  /deep/ .md-list-item-content {
    display: block;
  }

  /deep/ .md-icon {
    svg {
      fill: $theme-secondary-color;
    }
  }

  .earn-mdt-reward-item-action {
    justify-content: flex-end;
    display: flex;

    .earn-mdt-reward-item-action__claim-button {
      margin-right: 0px;
      margin-left: 0px;
    }

    .earn-mdt-reward-item-action__claim-button-leave-active {
      min-width: 0;
      animation-name: shrink;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    .earn-mdt-reward-item-action__amount-to-earn {
      font-size: 0.875rem;
      font-weight: bold;
      color: $theme-secondary-color;
      margin-right: 0.625rem;
    }

    .earn-mdt-reward-item-action__amount-to-earn-leave-active {
      animation-name: earn-mdt-reward-item-action__amount-to-earn-animation;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    .earn-mdt-reward-item-action__amount-placholder {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      line-height: 1.25rem;

      .earn-mdt-reward-item-action__amount-wrapper {
        position: relative;

        .earn-mdt-reward-item-action__amount {
          background-color: transparent;
          color: $theme-secondary-color;
          min-width: 0;
          font-weight: bold;
          box-shadow: none;

          /deep/ .md-ripple {
            padding: 0;
          }
        }

        .earn-mdt-reward-item-action__amount-enter-active {
          animation-name: zoomIn;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .deco-enter-active {
          animation-duration: 650ms;
          animation-delay: 150ms;
          animation-fill-mode: forwards;

          $positionLeftOfCenterPoint: 75%;
          $positionTopOfCenterPoint: 50%;
          $horizontalOffset: 8%;
          &.deco-1 {
            animation-name: vanish, moveToTop;
            top: ($positionTopOfCenterPoint - 30%);
            left: $positionLeftOfCenterPoint;
            transform: rotate(90deg);
            transform-origin: left;
          }

          &.deco-2 {
            top: ($positionTopOfCenterPoint - 20%);
            right: (100% - $positionLeftOfCenterPoint) - ($horizontalOffset/2);
            animation-name: vanish, moveToTop, moveToRight;
            transform: rotate(-45deg);
            transform-origin: right top;
          }

          &.deco-3 {
            top: $positionTopOfCenterPoint;
            right: (100% - $positionLeftOfCenterPoint) - $horizontalOffset;
            animation-name: vanish, moveToRight;
            // transform: translateY(-50%);
          }

          &.deco-4 {
            top: ($positionTopOfCenterPoint + 20%);
            right: (100% - $positionLeftOfCenterPoint) - ($horizontalOffset/2);
            transform: rotate(45deg);
            animation-name: vanish, moveToBottom, moveToRight;
            transform-origin: right bottom;
          }

          &.deco-5 {
            top: ($positionTopOfCenterPoint + 30%);
            left: $positionLeftOfCenterPoint;
            transform: rotate(-90deg);
            animation-name: vanish, moveToBottom;
            transform-origin: left;
          }

          &.deco-6 {
            top: ($positionTopOfCenterPoint + 20%);
            left: ($positionLeftOfCenterPoint - $horizontalOffset/2);
            transform: rotate(-45deg);
            transform-origin: left bottom;
            animation-name: vanish, moveToBottom, moveToLeft;
          }

          &.deco-7 {
            top: $positionTopOfCenterPoint;
            left: $positionLeftOfCenterPoint - $horizontalOffset;
            animation-name: vanish, moveToLeft;
          }

          &.deco-8 {
            top: ($positionTopOfCenterPoint - 20%);
            left: ($positionLeftOfCenterPoint - $horizontalOffset/2);
            transform: rotate(45deg);
            transform-origin: left top;
            animation-name: vanish, moveToTop, moveToLeft;
          }
        }

        .deco {
          height: 1px;
          width: 0px;
          background-color: $theme-secondary-color;
          position: absolute;
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

@keyframes earn-mdt-reward-item-action__amount-to-earn-animation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes vanish {
  from {
    width: 8px;
  }
  to {
    width: 0px;
  }
}
@keyframes moveToTop {
  to {
    margin-top: -10px;
  }
}
@keyframes moveToRight {
  to {
    margin-right: -10px;
  }
}
@keyframes moveToBottom {
  to {
    margin-top: 10px;
  }
}
@keyframes moveToLeft {
  to {
    margin-left: -10px;
  }
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
