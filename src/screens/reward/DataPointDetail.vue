<template>
  <div>
    <user-info-card 
      :user="selectedUser" 
      :small="true"
    /> 
    <div class="title-time label-bolded">Time</div>
    <md-list md-expand-single="true">
      <md-list-item 
        v-for="reward in getRewardsWithDataPoints(selectedUser.rewards).filter(reward => reward)"
        :key="reward.id" 
        :md-expanded.sync="activeReward[reward.id]"
        md-expand 
      >
        <span class="md-list-item-text">{{ formateDate(reward.startDate) }} - {{ formateDate(reward.endDate) }}</span>
        <md-list slot="md-expand">
          <md-list-item> 
            <div class="md-body-1 description">
              Because you opted in for anonymous data sharing through MyMDT, you will get rewards on a monthly basis. See below for your reward details. 
            </div>
          </md-list-item>
          <md-list-item>
            <div class="chart-container">
              <v-chart 
                v-if="activeReward[reward.id]"
                :options="createChartOption(reward.data_point)"
                autoresize
              />
            </div>
          </md-list-item>
          <md-list-item
            v-for="(category, index) in reward.data_point"
            :key="category.label"
            class="legend"
          >
            <span 
              :style="`background-color: ${COLORS[index]}`"  
              class="color-box"
            />
            <span class="label-bolded">{{ category.label }}</span>
            <span class="amount">{{ `${formatAmount(category.value)} MDT` }} </span> 
          </md-list-item>
          <md-divider/>
          <md-list-item>
            <span class="label-bolded">
              Total
            </span> 
            <span class="amount"><span class="amount-total">{{ `${formatAmount(reward.value)}` }}</span> MDT</span> 
          </md-list-item>
          <md-list-item>
            <div class="remark">Reward expires on {{ formateDate(reward.expiry_time) }}. </div>
          </md-list-item>
          <md-list-item>
            <div class="remark">Terms and conditions apply.</div>
          </md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
</div></template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/pie';

import { mapGetters, mapActions } from 'vuex';
import BasePage from '@/screens/BasePage';

import UserInfoCard from '@/components/common/UserInfoCard';
import PaddedContainer from '@/components/containers/PaddedContainer';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import { formatAmount } from '@/utils';
import { FETCH_REWARDS } from '@/store/modules/entities/rewards';

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
    PaddedContainer,
    MDTSecondaryButton,
    'v-chart': ECharts,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.transaction.monthlyReward'),
    };
  },
  data() {
    return {
      COLORS,
      activeReward: {},
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
  },
  created() {
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
    createChartOption(dataPoints) {
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
          data: dataPoints.map((datum, index) => ({
            value: datum.value,
            name: datum.label,
            itemStyle: { color: COLORS[index] },
          })),
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bolded {
  font-weight: bold;
}
.title-time {
  text-align: left;
  margin: 16px 0 0 16px;
}
.padded-container {
  width: 100%;
}
.description {
  color: $secondary-text-color;
  white-space: normal;
}
.remark {
  color: $secondary-text-color;
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
.color-box {
  width: 12px;
  height: 12px;
  margin-right: 4px;
}
.amount {
  flex-grow: 1;
  text-align: right;
  .amount-total {
    font-size: 28px;
  }
}
.md-list {
  /deep/ .md-list-item {
    .md-list-item-expand.md-active {
      border: none;
    }
    .md-list-item-content {
      min-height: 36px;
      .md-list-item-text {
        color: $theme-color;
      }
      svg {
        fill: $theme-color;
      }
    }
    &.legend {
      .md-list-item-content {
        align-items: baseline;
      }
    }
    &.button-claim {
      align-self: flex-end;
    }
  }
}
</style>
