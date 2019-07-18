<template>
  <div class="app-view">
    <CardInExtendedHeader
      :title="$t('message.earnMDT.inviteFriendCardTitle')"
      :subheading="$t('message.earnMDT.inviteFriendCardDescription')"
    >
      <div class="card-content-row">
        <span class="md-subheading">{{ $t('message.earnMDT.invitationCode') }}</span>
        <div class="card-content-copy">
          <span class="md-subheading">Ft2p0m5</span>
          <MDTMediumButton>
            {{ $t('message.earnMDT.copy') }}
          </MDTMediumButton>
        </div>
      </div>
      <div class="card-content-row">
        <span class="md-subheading">{{ $t('message.earnMDT.shareDownloadLinkAndCode') }}</span>
        <MDTMediumButton>
          {{ $t('message.earnMDT.share') }}
        </MDTMediumButton>
      </div>
    </CardInExtendedHeader>
    <pull-to
      ref="rewardHistoryContainer"
      :top-load-method="foo" 
      :bottom-load-method="getOldRewardHistory" 
      :top-config="PULLTO_TOP_CONFIG"
      :bottom-config="PULLTO_BOTTOM_CONFIG"
      :top-block-height="26"
      @scroll="foo"
      @bottom-state-change="foo"
    >
      <md-card class="reward-card">
        <md-card-header>
          <div class="label">总额</div>
          <Skeleton v-if="uiState.isFetching" />
          <div 
            v-if="!uiState.isFetching && !!rewardHistory"
            class="md-title"
          >
            {{ formatMDTAmount(rewardHistory.total_reward_value) }}
          </div>
        </md-card-header>
        <hr >
        <md-card-content>
          <div class="box">
            <div class="box-row label">
              已领取
            </div>
            <Skeleton v-if="uiState.isFetching" />
            <div 
              v-if="!uiState.isFetching && !!rewardHistory"
              class="box-row amount"
            >
              {{ formatMDTAmount(rewardHistory.claimed_reward_value) }}
            </div>
          </div>
          <div class="box">
            <div class="box-row label">
              未领取
            </div>
            <Skeleton v-if="uiState.isFetching" />
            <div 
              v-if="!uiState.isFetching && !!rewardHistory"
              class="box-row amount"
            >
              {{ formatMDTAmount(rewardHistory.claimable_reward_value) }}
            </div>
          </div>
        </md-card-content>
      </md-card>
      <div class="history-section">
        <h3 class="md-caption history-section-title">奖励历史</h3>
        <hr class="history-section-line">
        <div class="history-section-main">
          <template v-if="!uiState.isFetching && !!rewardHistory && rewardHistory.reward_history">
            <template v-for="(item, index) in rewardHistory.reward_history">
              <div
                :key="item.id"
                class="history-item"
              >
                <div>
                  <div class="item-row-email">{{ item.email_address }}</div>
                  <div class="item-row-info">
                    <div class="item-row-info-status label-info">
                      <span class="item-col-title">狀態</span>
                      <span>{{ getStatusText(item.status) }}</span>
                    </div>
                  </div>
                  <div class="item-row-info">
                    <div class="item-row-info-day label-info">
                      <span class="item-col-title">登录日期</span>
                      <span>{{ $d(new Date(item.created_at), 'short') }}</span>
                    </div>
                  </div>
                </div>
                <div class="history-item-right">
                  <div :class="['action-info-amount', { 'action-info-amount-claimable': item.claimable }]">
                    {{ formatClaimableAmount(item.value, item.claimable) }}
                  </div>
                  <div 
                    v-if="item.reward_id && item.expiry_time"
                    class="label-info"
                  >
                    {{ getExpiryText(item.status, item.expiry_time) }}
                  </div>
                  <!-- <div class="action-info-day">
                    {{ item.expiry_time }}
                  </div> -->
                  <MDTSecondaryButton 
                    v-if="item.claimable" 
                    class="action-claim"
                    color="secondary"
                  >
                    {{ getButtonText(item.claimable) }}
                  </MDTSecondaryButton>
                </div>
              </div>
              <hr 
                :key="`hr-${index}`" 
                class="history-line"
              >
            </template>

          </template>
        </div>
      </div>
    </pull-to>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import BasePage from '@/screens/BasePage';

import CardInExtendedHeader from '@/components/common/CardInExtendedHeader';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';
import BasePopup from '@/components/popup/BasePopup';
import Skeleton from '@/components/common/Skeleton';
import PullTo from 'vue-pull-to';

import { formatAmount } from '@/utils';

import { FETCH_INVITE_FRIEND_REWARD_HISTORIES } from '@/store/modules/inviteFriend';

export default {
  components: {
    CardInExtendedHeader,
    MDTMediumButton,
    MDTSecondaryButton,
    WebViewLink,
    BasePopup,
    Skeleton,
    PullTo,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.inviteFriendTitle'),
    };
  },
  data() {
    return {
      numberOfItemsPerPage: 5,
      items: [
        {
          email: 'yon***@g***.com',
          status: 1,
          loginDate: '2019年4月12日',
          amount: 50,
          expiryDay: 30,
          redeemed: false,
        },
        {
          email: 'yon***@g***.com',
          status: 0,
          loginDate: '2019年4月12日',
          amount: 50,
          expiryDay: 30,
          redeemed: true,
        },
      ],
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
      uiState: state => state.ui.inviteFriend,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getRewardHistory: 'getRewardHistory',
    }),
    rewardHistory() {
      return this.getRewardHistory(this.selectedUser.emailAddress);
    },
  },
  mounted() {
    this.fetchRewardHistory({
      userId: this.selectedUser.emailAddress,
      limit: this.numberOfItemsPerPage,
    });
  },
  methods: {
    ...mapActions({
      fetchRewardHistory: FETCH_INVITE_FRIEND_REWARD_HISTORIES,
    }),
    getStatusText(status) {
      if (status) {
        return '已数据分享';
      }

      return '未有数据分享';
    },
    getButtonText(claimable) {
      if (claimable) {
        return '领取';
      }

      return '已领取';
    },
    formatMDTAmount(amount) {
      return formatAmount(amount, { suffix: ' MDT' });
    },
    formatClaimableAmount(amount, claimable) {
      if (claimable) {
        return formatAmount(amount, { prefix: '+', suffix: ' MDT' });
      }

      return this.formatMDTAmount(amount);
    },
    getExpiryText(rewardStatus, dateTime) {
      // if (rewardStatus === ) {

      // }
      const expiryDate = new Date(dateTime);
      const now = new Date();
      const utc1 = Date.UTC(
        expiryDate.getFullYear(),
        expiryDate.getMonth(),
        expiryDate.getDate(),
      );
      const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

      // https://stackoverflow.com/a/15289883
      const dateDiffInDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));

      if (dateDiffInDays >= 0) {
        return this.$t('message.earnMDT.expiredAfter', {
          number: dateDiffInDays,
        });
      }

      return this.$t('message.earnMDT.expired');
    },
    foo(loaded) {
      if (typeof loaded === 'function') {
        loaded('done');
      }
    },
    getOldRewardHistory(loaded) {
      this.items = [...this.items, ...this.items.slice(0, 2)];
      if (typeof loaded === 'function') {
        loaded('done');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$header-padding-top: 0.5rem;

.app-view {
  display: flex;
  flex-direction: column;
}

.md-card {
  .md-card-content {
    .card-content-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;

      .md-subheading {
        margin-right: 0.5rem;
      }
    }

    .card-content-row:not(:first-child) {
      margin-top: 1rem;
    }
  }

  .card-content-copy {
    display: flex;
    justify-content: space-between;
    align-items: center;

    *:first-child {
      margin-right: 0.5rem;
    }

    .md-subheading {
      color: $secondary-text-color;
    }
  }
}

.reward-card {
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);

  .md-title {
    font-size: 1.75rem;
  }

  .label {
    font-size: 0.625rem;
    font-weight: 600;
    color: #aab1c0;
  }

  hr {
    border: solid 1px #eef3f8;
    margin: 0 1rem;
  }

  .md-card-content {
    display: flex;
    justify-content: center;
    padding: 1rem;

    .box {
      margin: 0 0.25rem;
      border-radius: 0.25rem;
      flex: 1;

      .box-row {
        margin: 0.25rem 0;

        &.amount {
          font-size: 1.25rem;
          font-weight: bold;
        }
      }
    }
  }
}

.md-title {
  font-weight: 600;
}

hr {
  border: solid 1px #eeeeee;
}

.history-section {
  .md-button {
    margin: 0;
  }

  .history-section-line {
    margin: 0.5rem 1rem 1rem 1rem;
  }

  .history-section-title {
    font-size: 0.875rem;
    color: #aab1c0;
    margin: 0;
    text-align: left;
    padding: 0 1rem;
  }

  .history-item {
    text-align: left;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;

    .history-item-right {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .item-row-email {
      font-size: 16px;
      font-weight: 600;
      color: $primary-text-color;
      margin-bottom: 0.5rem;
      line-height: normal;
    }

    .item-row-info {
      display: flex;
      margin: 0.25rem 0;

      .item-row-info-status {
        flex: 3;
      }

      .item-row-info-day {
        flex: 5;
      }

      .item-col-title {
        margin-right: 0.5rem;
        font-weight: 600;
      }
    }

    .label-info {
      color: $theme-placeholder-color;
      font-size: 0.75rem;
      line-height: normal;
    }

    .action-info-amount {
      font-size: 1rem;
      font-weight: bold;
      color: $theme-disable-color-font;

      &.action-info-amount-claimable {
        color: $theme-secondary-color;
      }
    }

    .action-claim {
      margin-top: 0.5rem;
    }
  }

  .history-line {
    margin: 1rem;
  }

  .history-section-main {
    position: relative;

    .scrolling-placeholder {
      position: absolute;
      top: 0;
      width: 100%;
      white-space: pre;

      &::before {
        content: ' ';
      }
    }
  }
}

/deep/ .md-card {
  z-index: 2;
}

/deep/ .default-text {
  line-height: 20px;
  margin: 0;
}

.foo {
  width: 100%;
  white-space: pre;

  &::before {
    content: ' ';
  }
}
</style>
