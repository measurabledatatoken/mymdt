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
    <md-card class="reward-card">
      <md-card-header>
        <div class="label">总额</div>
        <div class="md-title">120.00 MDT</div>
      </md-card-header>
      <hr >
      <md-card-content>
        <div class="box">
          <div class="box-row label">
            已领取
          </div>
          <div class="box-row amount">
            100.00 MDT
          </div>
        </div>
        <div class="box">
          <div class="box-row label">
            未领取
          </div>
          <div class="box-row amount">
            20.00 MDT
          </div>
        </div>
      </md-card-content>
    </md-card>
    <div class="history-section">
      <h3 class="md-caption history-section-title">奖励历史</h3>
      <hr >
      <template
        v-for="(item, index) in items"
      >
        <div
          :key="`item-${index}`"
          class="history-item"
        >
          <div class="item-row item-row-email">{{ item.email }}</div>
          <div class="item-row item-row-info">
            <div class="item-row-info-status">
              <span class="item-col-title">狀態</span>
              <span>{{ getStatusText(item.status) }}</span>
            </div>
            <div class="item-row-info-day">
              <span class="item-col-title">登录日期</span>
              <span>{{ item.loginDate }}</span>
            </div>
          </div>
          <div class="item-row item-row-action">
            <div class="action-info">
              <div class="action-info-amount">
                {{ formatAmount(item.amount) }} MDT
              </div>
              <div class="action-info-day">
                {{ item.expiryDay }}
              </div>
            </div>
            <MDTSecondaryButton 
              :disabled="!!item.redeemed" 
              color="secondary"
            >
              {{ getButtonText(item.redeemed) }}
            </MDTSecondaryButton>
          </div>
        </div>
        <hr 
          :key="`hr-${index}`" 
          class="history-line"
        >
      </template>
    </div>
  </div>
</template>

<script>
import BasePage from '@/screens/BasePage';

import CardInExtendedHeader from '@/components/common/CardInExtendedHeader';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';
import BasePopup from '@/components/popup/BasePopup';

import { formatAmount } from '@/utils';

export default {
  components: {
    CardInExtendedHeader,
    MDTMediumButton,
    MDTSecondaryButton,
    WebViewLink,
    BasePopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.earnMDT.inviteFriendTitle'),
    };
  },
  data() {
    return {
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
    };
  },
  methods: {
    getStatusText(status) {
      if (status) {
        return '已数据分享';
      }

      return '未有数据分享';
    },
    getButtonText(redeemed) {
      if (redeemed) {
        return '已领取';
      }

      return '领取';
    },
    formatAmount,
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

    .item-row {
      margin: 0.5rem 0;
    }

    .item-row-info {
      display: flex;
      color: $theme-placeholder-color;
      font-size: 0.75rem;

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

    .item-row-action {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .action-info {
        line-height: normal;

        .action-info-amount {
          font-size: 0.875rem;
          font-weight: bold;
          color: $theme-secondary-color;
        }

        .action-info-day {
          font-size: 0.75rem;
          color: $theme-placeholder-color;
        }
      }
    }
  }

  .history-line {
    margin-left: 1rem;
  }
}
</style>
