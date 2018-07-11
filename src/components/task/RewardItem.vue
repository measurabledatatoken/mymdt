<template>
  <BaseEarnMDTItem
    class="earn-mdt-reward-item"
    :title="reward.name"
    md-src="/static/icons/done.svg"
    v-bind="$attrs"
  >
    <template slot="action">
      <div class="earn-mdt-reward-item-action">
        <div class="earn-mdt-reward-item-action__amount-placholder">
          <transition name="earn-mdt-reward-item-action__amount-to-earn">
            <span v-show="!claimed" class="earn-mdt-reward-item-action__amount-to-earn">{{ amountText }}</span>
          </transition>
          <transition name="earn-mdt-reward-item-action__claim-button" v-on:after-leave="afterLeave">
            <MDTSecondaryButton
              v-show="!claimed"
              @click="handleClickClaimButton"
              ref="claimButton"
              class="earn-mdt-reward-item-action__claim-button"
              color="secondary"
              :style="claimButtonStyle"
            >
              {{ buttonText }}
            </MDTSecondaryButton>
          </transition>
          <div class="earn-mdt-reward-item-action__amount-wrapper">
            <transition name="earn-mdt-reward-item-action__amount">
              <MDTSecondaryButton v-if="showAmount" class="earn-mdt-reward-item-action__amount" disabled>{{ `+${amountText}` }}</MDTSecondaryButton>
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
    </template>
  </BaseEarnMDTItem>
</template>

<script>
import { mapActions } from 'vuex';

import BaseEarnMDTItem from '@/components/task/BaseEarnMDTItem';
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
    buttonText() {
      return this.claimed ? '' : this.$t('message.earnMDT.claim');
    },
    amountText() {
      return `${formatAmount(this.reward.value, { type: 'short' })} ${
        this.reward.currency
      }`;
    },
  },
  methods: {
    ...mapActions({
      claimReward: CLAIM_REWARD,
    }),
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
  components: {
    BaseEarnMDTItem,
    MDTSecondaryButton,
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
    width: 14px;
  }
  to {
    width: 0px;
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
