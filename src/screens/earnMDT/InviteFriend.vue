<template>
  <div class="app-view">
    <CardInExtendedHeader
      :title="$t('message.earnMDT.inviteFriend.cardTitle')"
      :subheading="$t('message.earnMDT.inviteFriend.cardDescription')"
    >
      <div class="card-content-row">
        <span class="md-subheading">{{ $t('message.earnMDT.inviteFriend.invitationCode') }}</span>
        <div class="card-content-copy">
          <span
            v-if="!!inviteInfo" 
            class="md-subheading"
          >{{ inviteInfo.invite_code }}</span>
          <MDTMediumButton v-clipboard="inviteInfo ? inviteInfo.invite_code : null">
            {{ $t('message.earnMDT.inviteFriend.copy') }}
          </MDTMediumButton>
        </div>
      </div>
      <div class="card-content-row">
        <span class="md-subheading">{{ $t('message.earnMDT.inviteFriend.shareDownloadLinkAndCode') }}</span>
        <MDTMediumButton @click="onClickShareButton">
          {{ $t('message.earnMDT.inviteFriend.share') }}
        </MDTMediumButton>
      </div>
    </CardInExtendedHeader>
    <pull-to
      ref="rewardHistoryContainer"
      :top-load-method="topLoad" 
      :bottom-load-method="bottomLoad" 
      :top-config="PULLTO_TOP_CONFIG"
      :bottom-config="PULLTO_BOTTOM_CONFIG"
      :top-block-height="26"
      @infinite-scroll="getOldRewardHistory"
      @bottom-state-change="foo"
    >
      <ClaimMDTCard
        :is-loading="uiState.isFetching"
        :unclaimed="rewardHistory ? rewardHistory.claimable_reward_value : 0"
        :earned="rewardHistory ? rewardHistory.total_reward_value : 0"
        :claimed="rewardHistory ? rewardHistory.claimed : 0"
      />
      <div class="history-section">
        <h3 class="md-caption history-section-title">{{ $t('message.earnMDT.inviteFriend.history') }}</h3>
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
                      <span class="item-col-title">{{ $t('message.earnMDT.inviteFriend.status') }}</span>
                      <span>{{ getStatusText(!!item.reward_id) }}</span>
                    </div>
                  </div>
                  <div class="item-row-info">
                    <div class="item-row-info-day label-info">
                      <span class="item-col-title">{{ $t('message.earnMDT.inviteFriend.loginDate') }}</span>
                      <span>{{ $d(new Date(item.created_at), 'short') }}</span>
                    </div>
                  </div>
                </div>
                <div class="history-item-right">
                  <div :class="['action-info-amount', { 'action-info-amount-claimable': item.claimable }]">
                    {{ formatClaimableAmount(item.value, item.status, item.claimable) }}
                  </div>
                  <div 
                    v-if="item.reward_id"
                    class="label-info"
                  >
                    {{ getExpiryText(item.status, item.expiry_time) }}
                  </div>
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
import PullTo from 'vue-pull-to';
import throttle from 'lodash.throttle';

import BasePage from '@/screens/BasePage';

import CardInExtendedHeader from '@/components/common/CardInExtendedHeader';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';
import BasePopup from '@/components/popup/BasePopup';
import Skeleton from '@/components/common/Skeleton';
import ClaimMDTCard from '@/components/common/ClaimMDTCard';

import { formatAmount } from '@/utils';

import { FETCH_INVITE_FRIEND_REWARD_HISTORIES } from '@/store/modules/inviteFriend';
import { FETCH_INVITE_INFO } from '@/store/modules/inviteFriend';

import RewardStatus from '@/enum/rewardStatus';

export default {
  components: {
    CardInExtendedHeader,
    MDTMediumButton,
    MDTSecondaryButton,
    WebViewLink,
    BasePopup,
    Skeleton,
    PullTo,
    ClaimMDTCard,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.inviteFriend.screenTitle'),
    };
  },
  data() {
    return {
      numberOfItemsPerPage: 5,
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
      getRewardSummary: 'getRewardSummary',
      getInviteInfo: 'getInviteInfo',
    }),
    rewardHistory() {
      return this.getRewardSummary(this.selectedUser.emailAddress);
    },
    inviteInfo() {
      return this.getInviteInfo(this.selectedUser.emailAddress);
    },
  },
  mounted() {
    this.fetchRewardSummary({
      userId: this.selectedUser.emailAddress,
      limit: this.numberOfItemsPerPage,
    });

    this.fetchInviteInfo({
      userId: this.selectedUser.emailAddress,
    });
  },
  methods: {
    ...mapActions({
      fetchRewardSummary: FETCH_INVITE_FRIEND_REWARD_HISTORIES,
      fetchInviteInfo: FETCH_INVITE_INFO,
    }),
    getStatusText(hasReward) {
      if (hasReward) {
        return this.$t('message.earnMDT.inviteFriend.sharedDataPoints');
      }

      return this.$t('message.earnMDT.inviteFriend.noDataPoint');
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
    formatClaimableAmount(amount, rewardStatus, claimable) {
      switch (rewardStatus) {
        case RewardStatus.ACTIVE: {
          if (claimable) {
            return formatAmount(amount, { prefix: '+', suffix: ' MDT' });
          }
          return this.formatMDTAmount(amount);
        }
        default: {
          return this.formatMDTAmount(amount);
        }
      }
    },
    getExpiryText(rewardStatus, dateTime) {
      switch (rewardStatus) {
        case RewardStatus.ACTIVE: {
          if (!dateTime) {
            return '';
          }

          const expiryDate = new Date(dateTime);
          const now = new Date();
          const utc1 = Date.UTC(
            expiryDate.getFullYear(),
            expiryDate.getMonth(),
            expiryDate.getDate(),
          );
          const utc2 = Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
          );

          // https://stackoverflow.com/a/15289883
          const dateDiffInDays = Math.floor(
            (utc1 - utc2) / (1000 * 60 * 60 * 24),
          );

          if (dateDiffInDays >= 0) {
            return this.$t('message.earnMDT.inviteFriend.expiredAfter', {
              number: dateDiffInDays,
            });
          }

          return this.$t('message.earnMDT.inviteFriend.expired');
        }
        case RewardStatus.CLAIMED: {
          return '';
        }
        case RewardStatus.EXPIRED: {
          return this.$t('message.earnMDT.inviteFriend.expired');
        }
      }

      return this.$t('message.earnMDT.inviteFriend.expired');
    },
    foo(loaded) {
      if (typeof loaded === 'function') {
        loaded('done');
      }
    },
    async topLoad(loaded) {
      await this.getNewRewardHistory();
      loaded('done');
    },
    async bottomLoad(loaded) {
      await this.getOldRewardHistory();
      loaded('done');
    },
    getOldRewardHistory: throttle(
      async function() {
        return this.fetchRewardSummary({
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
    getNewRewardHistory() {
      return this.fetchRewardSummary({
        userId: this.selectedUser.emailAddress,
        cursorDirection: 'before',
        limit: this.numberOfItemsPerPage,
      });
    },
    onClickShareButton() {
      if (this.inviteInfo) {
        window.location.href = `mdtwallet://open-external-browser?url=${encodeURIComponent(
          this.inviteInfo.invite_url,
        )}`;
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
  overflow-y: hidden;
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
        line-height: normal;
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
    flex-wrap: wrap;

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
