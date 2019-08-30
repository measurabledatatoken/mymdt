<template>
  <div class="rewards-container">
    <padded-container class="account-selector-container">
      <AccountSelector
        :accounts="allUsers"
        :selected-account="selectedUser"
        @accountSelected="onAccountSelected"
      />
    </padded-container>
    <md-divider />
    <pull-to
      ref="rewardHistoryContainer"
      :top-load-method="topLoad"
      :bottom-load-method="bottomLoad"
      :top-config="PULLTO_TOP_CONFIG"
      :bottom-config="PULLTO_BOTTOM_CONFIG"
      @infinite-scroll="getOldDataPointRewards"
    >
      <ClaimMDTCard
        :is-loading="summaryUiState.isFetching && Object.keys(summary).length === 0"
        :unclaimed="unclaimed"
        :earned="earned"
        :claimed="claimed"
      >
        <template slot="header-caption">
          <div class="trust-wallet-button-container">
            <MDTMediumButton
              :style-type="1"
              class="trust-wallet-button"
              @click="handleClickTrustWalletButton"
            >
              <img
                class="header-caption-icon"
                src="/static/icons/logo-trust-wallet.svg"
                alt="Trust Wallet"
              >
              {{ $t('message.dataPointRewards.openTrustWalletToClaim') }}
            </MDTMediumButton>
          </div>
        </template>
      </ClaimMDTCard>
      <md-button 
        v-show="!selectedUser.smartContractETHAddress" 
        class="bind-button"
        @click="onBindingButtonClick"
      >
        <div class="bind-button-content">
          <div class="bind-button-content-left">
            <md-icon md-src="/static/icons/ic-info.svg" />
            {{ $t('message.dataPointRewards.bindWithETH') }}
          </div>
          <img 
            class="bind-button-arrow" 
            src="/static/icons/keyboard_arrow_down.svg"
          >
        </div>
      </md-button>
      <CountdownCard
        :is-loading="configUiState.isFetching && Object.keys(config).length === 0"
        :initial-remaining-time="config.time_left"
        :total-time="config.time_length"
      />
      <div class="history-section">
        <h3 class="md-caption history-section-title">{{ $t('message.dataPointRewards.history') }}</h3>
        <hr class="history-section-line" >
        <md-list class="history-section-main">
          <template v-if="rewardsUiState.isFetching">
            <template v-for="n in 4">
              <RewardLoadingItem :key="n" />
            </template>
          </template>
          <template v-if="!rewardsUiState.isFetching && rewards && rewards.length > 0">
            <template v-for="(item, index) in rewards">
              <md-list-item
                :key="index" 
                class="history-item"
                @click="onItemClick(item.id)"
              >
                <div class="history-item-section">
                  <div class="section-title">{{ getItemTitle(item.start_date) }}</div>
                  <div
                    class="section-description"
                  >{{ getItemDate(item.status, item.claimed_date, item.expiry_time) }}</div>
                </div>
                <div class="history-item-section">
                  <div class="section-title">{{ getAmount(item.value) }}</div>
                  <div
                    :class="['section-description', 'item-status', {
                      pending: item.status === dataPointRewardStatus.PENDING || dataPointRewardStatus.PROCESSING,
                      claimable: item.status === dataPointRewardStatus.CLAIMABLE
                    }]"
                  >{{ getStatusText(item.status) }}</div>
                </div>
                <!-- <span>testing</span> -->
              </md-list-item>
              <hr 
                :key="`hr-${index}`" 
                class="history-line"
              >
            </template>
          </template>
          <ListEmptyItem 
            v-else 
            :label="$t('message.dataPointRewards.noDataPointReward')"
          />
        </md-list>
      </div>
    </pull-to>
    <TrustWalletPopup :md-active.sync="showTrustWalletPopup" />
    <PinCodePopup
      :md-active.sync="showPinCode"
      :pin-setup-content="$t('message.ethBinding.pinSetupPopupDescription')"
      @codefilled="onPinCodeFilled"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import PullTo from 'vue-pull-to';
import throttle from 'lodash.throttle';

import BasePage from '@/screens/BasePage';
import Skeleton from '@/components/common/Skeleton';
import AccountSelector from '@/components/common/AccountSelector';
import PaddedContainer from '@/components/containers/PaddedContainer';
import ClaimMDTCard from '@/components/common/ClaimMDTCard';
import CountdownCard from '@/components/earnMDT/CountdownCard';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import TrustWalletPopup from '@/components/popup/TrustWalletPopup';
import RewardLoadingItem from '@/components/dataPointRewards/RewardLoadingItem';
import ListEmptyItem from '@/components/common/ListEmptyItem';
import PinCodePopup from '@/components/popup/PinCodePopup';

import {
  FETCH_DATA_POINT_REWARDS,
  FETCH_DATA_POINT_CONFIG,
  FETCH_DATA_POINT_SUMMARY,
} from '@/store/modules/dataPoint';
import { SET_SELECTED_USER } from '@/store/modules/home';
import { trackEvent, formatAmount } from '@/utils';
import dataPointRewardStatus from '@/enum/dataPointRewardStatus';
import { RouteDef } from '@/constants';

export default {
  components: {
    PullTo,
    PaddedContainer,
    AccountSelector,
    Skeleton,
    ClaimMDTCard,
    CountdownCard,
    MDTMediumButton,
    TrustWalletPopup,
    RewardLoadingItem,
    ListEmptyItem,
    PinCodePopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.title'),
    };
  },
  data() {
    return {
      dataPointRewardStatus,
      numberOfItemsPerPage: 5,
      showTrustWalletPopup: false,
      showPinCode: false,
      PULLTO_TOP_CONFIG: {
        pullText: this.$t('message.transaction.listing.pullDownText'),
        triggerText: this.$t('message.transaction.listing.triggerText'),
        loadingText: this.$t('message.transaction.listing.loadingText'),
        doneText: this.$t('message.transaction.listing.doneText'),
        failText: this.$t('message.transaction.listing.failText'),
      },
      PULLTO_BOTTOM_CONFIG: {
        pullText: this.$t('message.transaction.listing.pullUpText'),
        triggerText: this.$t('message.transaction.listing.triggerText'),
        loadingText: this.$t('message.transaction.listing.loadingText'),
        doneText: this.$t('message.transaction.listing.doneText'),
        failText: this.$t('message.transaction.listing.failText'),
        triggerDistance: 10,
      },
    };
  },
  computed: {
    ...mapState({
      locale: state => state.common.locale,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getDataPointRewards: 'getDataPointRewards',
      getDataPointRewardIdsByUser: 'getDataPointRewardIdsByUser',
      getDataPointConfig: 'getDataPointConfig',
      getDataPointSummary: 'getDataPointSummary',
      getDataPointRewardsUiState: 'getDataPointRewardsUiState',
      getDataPointConfigUiState: 'getDataPointConfigUiState',
      getDataPointSummaryUiState: 'getDataPointSummaryUiState',
      allUsers: 'getAllUsers',
    }),
    rewards() {
      return this.getDataPointRewards(
        this.getDataPointRewardIdsByUser(this.selectedUser.emailAddress),
      );
    },
    config() {
      return this.getDataPointConfig(this.selectedUser.emailAddress);
    },
    summary() {
      return this.getDataPointSummary(this.selectedUser.emailAddress);
    },
    rewardsUiState() {
      return this.getDataPointRewardsUiState(this.selectedUser.emailAddress);
    },
    configUiState() {
      return this.getDataPointConfigUiState(this.selectedUser.emailAddress);
    },
    summaryUiState() {
      return this.getDataPointSummaryUiState(this.selectedUser.emailAddress);
    },
    unclaimed() {
      return this.summary[dataPointRewardStatus.CLAIMABLE] || 0;
    },
    earned() {
      return Object.keys(this.summary).reduce((prev, curr) => {
        return prev + (this.summary[curr] || 0);
      }, 0);
    },
    claimed() {
      return this.summary[dataPointRewardStatus.CLAIMED] || 0;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
    }),
    ...mapActions({
      fetchDataPointConfig: FETCH_DATA_POINT_CONFIG,
      fetchDataPointRewards: FETCH_DATA_POINT_REWARDS,
      fetchDataPointSummary: FETCH_DATA_POINT_SUMMARY,
    }),
    onAccountSelected(account) {
      trackEvent('Switch accounts on data point reward List');
      this.setSelectedUser(account.emailAddress);
      this.fetchData();
    },
    handleClickTrustWalletButton() {
      this.showTrustWalletPopup = true;
    },
    async topLoad(loaded) {
      await this.fetchNewData();
      loaded('done');
    },
    async bottomLoad(loaded) {
      await this.getOldDataPointRewards();
      loaded('done');
    },
    getItemTitle(dateStr) {
      const date = new Date(dateStr);
      return this.$t('message.dataPointRewards.earnedOn', {
        date: date.toLocaleDateString(),
      });
    },
    getItemDate(status, claimedDateStr, expiryStr) {
      switch (status) {
        case dataPointRewardStatus.PENDING:
        case dataPointRewardStatus.PROCESSING: {
          if (!this.config.last_distribute_date) {
            return '';
          }

          return this.$t('message.dataPointRewards.distributeOn', {
            date: this.$d(
              new Date(this.config.last_distribute_date),
              'long-date',
            ),
          });
        }
        case dataPointRewardStatus.CLAIMABLE: {
          const expiryDate = new Date(expiryStr);
          return this.$t('message.dataPointRewards.dueOn', {
            date: this.$d(expiryDate, 'long-date'),
          });
        }
        case dataPointRewardStatus.CLAIMED: {
          const claimedDate = new Date(claimedDateStr);
          return this.$t('message.dataPointRewards.claimedOn', {
            date: this.$d(claimedDate, 'long-date'),
          });
        }
        case dataPointRewardStatus.EXPIRED: {
          const expiryDate = new Date(expiryStr);
          return this.$t('message.dataPointRewards.expiredOn', {
            date: this.$d(expiryDate, 'long-date'),
          });
        }
        default: {
          return '';
        }
      }
    },
    getStatusText(status) {
      switch (status) {
        case dataPointRewardStatus.PENDING: {
          return this.$t('message.dataPointRewards.pending');
        }
        case dataPointRewardStatus.PROCESSING: {
          return this.$t('message.dataPointRewards.processing');
        }
        case dataPointRewardStatus.CLAIMABLE: {
          return this.$t('message.dataPointRewards.claimable');
        }
        case dataPointRewardStatus.CLAIMED: {
          return this.$t('message.dataPointRewards.claimed');
        }
        case dataPointRewardStatus.EXPIRED: {
          return this.$t('message.dataPointRewards.expired');
        }
        default: {
          return '';
        }
      }
    },
    getAmount(amount) {
      return formatAmount(amount, { prefix: '+ ', suffix: ' MDT' });
    },
    fetchData() {
      this.fetchDataPointConfig({
        userId: this.selectedUser.emailAddress,
      });

      this.fetchDataPointSummary({
        userId: this.selectedUser.emailAddress,
      });

      this.fetchDataPointRewards({
        userId: this.selectedUser.emailAddress,
        limit: this.numberOfItemsPerPage,
      });
    },
    fetchNewData() {
      this.fetchDataPointConfig({
        userId: this.selectedUser.emailAddress,
      });

      this.fetchDataPointSummary({
        userId: this.selectedUser.emailAddress,
      });

      this.fetchDataPointRewards({
        userId: this.selectedUser.emailAddress,
        cursorDirection: 'before',
        limit: this.numberOfItemsPerPage,
      });
    },
    getOldDataPointRewards: throttle(
      async function() {
        return this.fetchDataPointRewards({
          userId: this.selectedUser.emailAddress,
          cursorDirection: 'after',
          limit: this.numberOfItemsPerPage,
        });
      },
      1000,
      {
        trailing: false,
      },
    ),
    onBindingButtonClick() {
      this.showPinCode = true;
    },
    onPinCodeFilled() {
      this.$router.push({
        name: RouteDef.ETHBinding.name,
      });
    },
    onItemClick(id) {
      this.$router.push({
        name: RouteDef.DataPointRewardDetailNew.name,
        params: { userId: this.selectedUser.emailAddress, rewardId: id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.account-selector-container {
  display: inline-block;
  width: 100%;
  background-color: white;
  z-index: 1;
  position: relative;
}

.rewards-container {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .vue-pull-to-wrapper {
    flex: 1;
  }
}

.header-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $theme-font-color-btn;

  .header-caption-icon {
    width: 0.625rem;
    height: 0.625rem;
    margin-right: 0.25rem;
  }
}

.trust-wallet-button-container {
  margin-top: 0.5rem;

  .trust-wallet-button {
    text-transform: initial;
  }
}

.md-divider {
  margin: 0;
}

.bind-button-container {
  display: flex;
  flex-direction: column;
}

.bind-button {
  display: block;
  width: calc(100% - 16px);
  height: 52px;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffb602;
  color: white;
  text-transform: none;

  /deep/ .md-button-content {
    flex: 1;
  }

  .bind-button-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bind-button-content-left {
      display: flex;
      align-items: center;
    }

    .bind-button-arrow {
      transform: rotate(-90deg);
      filter: brightness(0) invert(1);
    }
  }
}

hr {
  border: solid 1px #eeeeee;
}

.history-section {
  .md-button {
    margin: 0;
  }

  .history-section-line {
    margin: 0.5rem 1rem 0rem 1rem;
  }

  .history-section-title {
    font-size: 0.875rem;
    color: #aab1c0;
    margin: 0;
    text-align: left;
    padding: 0 1rem;
  }

  .history-line {
    margin: 0;
  }

  .history-section-main {
    position: relative;
    padding: 0 1rem;
  }
}

.history-item {
  display: flex;
  justify-content: space-between;

  /deep/ .md-list-item-content {
    padding: 1rem 0;
  }

  .history-item-section {
    .section-title {
      font-size: 1rem;
      font-weight: 600;
      color: $primary-text-color;
    }

    .section-description {
      font-size: 0.75rem;
      color: #9b9b9b;
      text-align: right;
    }

    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
    }
  }

  .item-status {
    font-weight: bold;
    text-transform: uppercase;

    &.pending {
      color: #ffb602;
    }

    &.claimable {
      color: #75ce4a;
    }
  }
}
</style>
