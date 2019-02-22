<template>
  <div>
    <user-info-card 
      :user="selectedUser" 
      :small="true"
    /> 
    <padded-container>
      <div class="label-time label-bolded">{{ $t('message.transaction.time') }}</div>
      <md-menu 
        :md-offset-y="-44"  
        class="reward-selector"
        md-size="auto" 
        md-full-width 
        md-close-on-select 
        md-align-trigger 
      >
        <md-button 
          :md-ripple="false" 
          :class="{ 'open': isMenuOpened }" 
          md-menu-trigger
        >
          <div 
            :class="{ 'open': isMenuOpened }" 
            class="reward-info"
          >
            <div 
              v-if="getSelectedReward" 
              class="reward-date"
            >
              {{ formateDate(getSelectedReward.start_date) }} - {{ formateDate(getSelectedReward.end_date) }}
            </div>
          </div>
          <md-icon 
            v-show="!isMenuOpened" 
            md-src="/static/icons/keyboard_arrow_down.svg"
          />
          <md-icon 
            v-show="isMenuOpened" 
            md-src="/static/icons/keyboard_arrow_up.svg"
          />
        </md-button>

        <md-menu-content :class="{ 'reward-selector-menu-content--selected': getSelectedReward }">
          <SelectorMenuItem
            v-if="getSelectedReward"
            :primary-text="`${formateDate(getSelectedReward.start_date)} - ${formateDate(getSelectedReward.end_date)}`"
            :is-drawer-top-item="true"
          /> 
          <SelectorMenuItem
            v-for="reward in rewards"
            :key="reward.id" 
            :selected="reward.id === getSelectedReward.id"
            :primary-text="`${formateDate(reward.start_date)} - ${formateDate(reward.end_date)}`"
            @click="selectReward(reward)"
          />
        </md-menu-content>
      </md-menu>
      <div 
        v-if="getSelectedReward && getSelectedReward.data_points_payload" 
        class="reward-detail"
      >
        <div class="description">
          (TBD) Because you opted in for anonymous data sharing through MyMDT, you will get rewards on a monthly basis. See below for your reward details. 
        </div>
        <div class="chart-container">
          <v-chart 
            v-if="getSelectedReward" 
            :options="createChartOption(getSelectedReward.data_points_payload)"
            autoresize
          />
        </div>
        <div
          v-for="(value, name, index) in JSON.parse(getSelectedReward.data_points_payload)"
          :key="name"
          class="row legend"
        > 
          <span  
            :style="`background-color: ${COLORS[index]}`"  
            class="color-box"
          />
          <span class="label-bolded">{{ getDataPointType(name) }}</span>
          <span class="amount">{{ `${formatAmount(value)} MDT` }} </span> 
        </div>
        <md-divider />
        <template v-if="reachMaxEarnableMDT">
          <div 
            class="row row-total"
          >
            <span class="label-bolded">
              {{ $t('message.common.total') }}
            </span> 
            <div class="amount">
              <span class="amount-deleted">{{ `${formatAmount(getSelectedReward.value)}` }} MDT</span>
            </div> 
          </div>
          <div 
            class="row row-total"
          >
            <div class="amount">
              <span class="amount-highlighted">{{ `${formatAmount(selectedRewardTotalDataPoints)}` }}*</span> MDT
            </div> 
          </div>
          <div 
            class="remark"
          >{{ $t('message.earnMDT.dataPointsReward.reachMaximumRemark', { 
            amount: formatAmount(getSelectedReward.value)
          }) }}</div>
        </template>
        <template v-else>
          <div class="row row-total">
            <span class="label-bolded">
              {{ $t('message.common.total') }}
            </span> 
            <div class="amount">
              <span class="amount-highlighted">{{ `${formatAmount(getSelectedReward.value)}` }}</span> MDT
            </div> 
          </div>
        </template>
        <div class="remark">{{ $t('message.earnMDT.rewardExpiresOn', {
          time: formateDate(getSelectedReward.expiry_time)
        }) }}</div>
        <div class="remark">{{ $t('message.common.termsAndConditionsApply') }}</div>
      </div>
    </padded-container>
</div></template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/pie';

import { mapGetters, mapActions } from 'vuex';
import BasePage from '@/screens/BasePage';

import UserInfoCard from '@/components/common/UserInfoCard';
import PaddedContainer from '@/components/containers/PaddedContainer';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import SelectorMenuItem from '@/components/common/SelectorMenuItem';

import { formatAmount } from '@/utils';
import { FETCH_REWARDS } from '@/store/modules/entities/rewards';

import { rewardDataPointType } from '@/enum';

const COLORS = [
  '#65f6a1',
  '#3ad179',
  '#0a439e',
  '#1459c9',
  '#4187f7',
  '#affaff',
];

export default {
  components: {
    UserInfoCard,
    SelectorMenuItem,
    PaddedContainer,
    MDTSecondaryButton,
    'v-chart': ECharts,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transaction.dataPointReward'),
    };
  },
  data() {
    return {
      COLORS,
      selectedReward: null,
      isMenuOpened: false,
    };
  },
  computed: {
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getRewardsWithDataPoints: 'getRewardsWithDataPoints',
    }),
    rewards() {
      return this.getRewardsWithDataPoints(this.selectedUser.rewards).filter(
        reward => reward,
      );
    },
    getSelectedReward() {
      return (
        this.selectedReward ||
        this.rewards.filter(
          reward => reward.id === this.$route.params.rewardId,
        )[0] ||
        this.rewards[0]
      );
    },
    selectedRewardTotalDataPoints() {
      const points = JSON.parse(this.getSelectedReward.data_points_payload);
      return Object.values(points).reduce((a, b) => a + b);
    },
    reachMaxEarnableMDT() {
      return this.selectedRewardTotalDataPoints > this.getSelectedReward.value;
    },
  },
  mounted() {
    const userId = this.$route.params.userId;
    this.fetchRewards({
      userId,
    });
  },
  methods: {
    ...mapActions({
      fetchRewards: FETCH_REWARDS,
    }),
    formatAmount,
    formateDate(dateString) {
      return this.$i18n.d(new Date(dateString), 'long', 'numeric');
    },
    getDataPointType(dataPointKey) {
      return rewardDataPointType.properties[dataPointKey]
        ? this.$t(rewardDataPointType.properties[dataPointKey].messageId)
        : this.$t('message.common.other');
    },
    selectReward(reward) {
      this.selectedReward = reward;
    },
    createChartOption(dataPoints) {
      const points = JSON.parse(dataPoints);
      return {
        series: {
          type: 'pie',
          radius: ['55%', '100%'],
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          data: Object.keys(points).map((key, index) => ({
            value: points[key],
            name: key,
            itemStyle: { color: COLORS[index] },
          })),
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$selectedRewardDateColor: $theme-color;
$menuItemCellHeight: 44px;

.md-divider {
  margin: 0;
}

.label-bolded {
  font-weight: bold;
}

.label-time {
  text-align: left;
  margin-top: 16px;
}

.md-menu {
  width: 100%;

  .md-button {
    width: 100%;
    height: $menuItemCellHeight;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0s;

    /deep/ .md-button-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: padding 50ms;
    }

    /deep/ .md-ripple {
      padding: 0px;
    }

    .md-icon {
      height: 26px;

      &.other {
        margin-top: 9px;
      }

      /deep/ svg {
        fill: $selectedRewardDateColor;
      }
    }
  }

  .md-button:not([disabled]).md-focused:before,
  .md-button:not([disabled]):active:before,
  .md-button:not([disabled]):hover:before {
    background-color: white;
    opacity: 1;
  }
}

.reward-info {
  flex: 1;
  word-break: break-all;
  white-space: normal;
  .reward-date {
    text-align: left;
    color: $selectedRewardDateColor;
    text-transform: none;
    font-size: 16px;
  }
}

.md-menu-content {
  border-radius: 0px 0px 4px 4px !important;
  background-color: $theme-listing-bgcolor;
  max-height: 38vh;
  width: 100%;
  left: 0;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 0px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  -webkit-overflow-scrolling: touch;

  &.reward-selector-menu-content--selected {
    max-height: 46vh;
  }

  /deep/ .md-menu-content-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .md-list {
      flex: 1;
      background-color: $theme-listing-bgcolor;
      border-radius: 0px 0px 4px 4px !important;
      padding: 0;
    }
  }
}

.md-icon {
  /deep/ &.selected-icon {
    svg {
      fill: $selectedRewardDateColor;
    }
  }
}

.reward-detail {
  text-align: left;
  padding-bottom: 20px;
  .row {
    display: flex;
  }
  .description {
    color: $secondary-text-color;
    white-space: normal;
  }
  .chart-container {
    display: inline-block;
    position: relative;
    margin: 24px auto;
    min-width: calc(40vw + 4em);
    width: 100%;
    .echarts {
      width: 100%;
      min-width: 0;
      height: 75vw;
    }
  }
  .legend {
    align-items: baseline;
    margin-bottom: 20px;
    .color-box {
      width: 12px;
      height: 12px;
      margin-right: 4px;
      display: inline-block;
    }
  }
  .row-total {
    margin: 20px 0;
  }
  .amount {
    flex-grow: 1;
    text-align: right;
    font-size: 16px;
    .amount-deleted {
      color: $mdtAmountColor;
      text-decoration: line-through;
    }
    .amount-highlighted {
      font-size: 28px;
    }
  }
  .remark {
    color: $secondary-text-color;
  }
}
</style>
