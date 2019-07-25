<template>
  <div :class="['claim-button-container', { 'align-items-flex-end': expired }]">
    <transition :name="centered ? 'fade' : 'collapse'">
      <span 
        v-if="showExpiryDate"
        class="expiry-date placeholder"
      >
        {{ expiryText }}
      </span>
    </transition>
    <div class="earn-mdt-reward-item-action">
      <div class="earn-mdt-reward-item-action__amount-placholder">
        <transition  
          name="earn-mdt-reward-item-action__claim-button"    
          @after-leave="afterLeave" 
        >
          <MDTSecondaryButton
            v-show="canBeClaimed"
            ref="claimButton"
            :style="claimButtonStyle"
            class="earn-mdt-reward-item-action__claim-button"
            color="secondary"
            v-on="$listeners"
          >
            {{ buttonText }}
          </MDTSecondaryButton>
        </transition>
        <div class="earn-mdt-reward-item-action__amount-wrapper">
          <transition name="earn-mdt-reward-item-action__amount">
            <MDTSecondaryButton 
              v-if="showAmount" 
              :class="['earn-mdt-reward-item-action__amount', { 'amount-grey': !claimed }]" 
              disabled
            >{{ amountText }}</MDTSecondaryButton>
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
    <transition :name="centered ? 'fade' : 'collapse'">
      <span 
        v-if="showExpiryDate"
        class="expiry-date"
      >
        {{ expiryText }}
      </span>
    </transition>
  </div>
</template>

<script>
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';

import { formatAmount } from '@/utils';
import RewardStatus from '@/enum/rewardStatus';

export default {
  components: {
    MDTSecondaryButton,
  },
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'MDT',
    },
    rewardStatus: {
      type: Number,
      default: 0,
    },
    expiredInDays: {
      type: Number,
      default: 0,
    },
    expiryTime: {
      type: String || null,
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    noReward: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      claimButtonStyle: null,
      showAmount: this.rewardStatus !== RewardStatus.ACTIVE || this.noReward,
    };
  },
  computed: {
    buttonText() {
      return `${this.$t('message.earnMDT.claim')} ${this.amountText}`;
    },
    amountText() {
      return formatAmount(this.amount, {
        prefix: this.claimed ? '+' : '',
        suffix: ` ${this.currency}`,
      });
    },
    claimed() {
      if (this.noReward) {
        return false;
      }

      return this.rewardStatus === RewardStatus.CLAIMED;
    },
    canBeClaimed() {
      if (this.noReward) {
        return false;
      }

      return this.rewardStatus === RewardStatus.ACTIVE;
    },
    expired() {
      return this.rewardStatus === RewardStatus.EXPIRED;
    },
    expiryText() {
      switch (this.rewardStatus) {
        case RewardStatus.ACTIVE: {
          return this.$t('message.earnMDT.inviteFriend.expiredAfter', {
            number: this.expiredInDays >= 0 ? this.expiredInDays : 0,
          });
        }
        case RewardStatus.SUSPENDED:
        case RewardStatus.CLAIMED: {
          return '';
        }
        case RewardStatus.EXPIRED: {
          if (this.expiryTime) {
            return this.$t('message.earnMDT.inviteFriend.expiredOn', {
              date: this.$d(new Date(this.expiryTime), 'short'),
            });
          }
        }
      }

      return this.$t('message.earnMDT.inviteFriend.expired');
    },
    showExpiryDate() {
      return this.canBeClaimed || this.expired;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.claimButton) {
        this.claimButtonStyle = {
          height: `${this.$refs.claimButton.$el.clientHeight}px`,
          width: `${this.$refs.claimButton.$el.clientWidth}px`,
        };
      }
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
    afterLeave() {
      this.showAmount = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.claim-button-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  &.align-items-flex-end {
    align-items: flex-end;
  }
}

.expiry-date {
  color: $theme-placeholder-color;
  font-size: 0.625rem;
  line-height: normal;
  margin: 0.125rem 0;
  overflow: hidden;
  height: 12px;

  &.placeholder {
    opacity: 0;
  }
}

.earn-mdt-reward-item-action {
  justify-content: flex-end;
  display: flex;

  .earn-mdt-reward-item-action__claim-button {
    margin: 0px;
  }

  .md-button.earn-mdt-reward-item-action__claim-button-leave-active {
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
    line-height: 1;

    .earn-mdt-reward-item-action__amount-wrapper {
      position: relative;

      .earn-mdt-reward-item-action__amount {
        background-color: transparent;
        color: $theme-secondary-color;
        min-width: 0;
        font-weight: bold;
        box-shadow: none;
        margin: 0;
        font-size: 1rem;
        line-height: 1;
        padding: 0;

        /deep/ .md-ripple {
          padding: 0;
        }

        &.amount-grey {
          color: $theme-disable-color-font;
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

.collapse-enter-active,
.collapse-leave-active {
  transition: height 0.4s;
}
.collapse-enter,
.collapse-leave-to {
  height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
