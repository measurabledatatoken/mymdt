<template>
  <div class="app-view">
    <div class="header">
      <div class="header-wrapper">
        <div class="header__background"/>
        <md-card>
          <md-card-header>
            <div class="md-title">{{ $t('message.earnMDT.inviteFriendCardTitle') }}</div>
            <div class="md-subhead">{{ $t('message.earnMDT.inviteFriendCardDescription') }}</div>
          </md-card-header>
          <md-card-content>
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
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="reward-section">
      <h3 class="md-title">{{ $t('message.earnMDT.earnRewards') }}</h3>
      <h2 class="reward-main-number">120.00 MDT</h2>
      <div class="reward-sub-numbers">
        <div class="box">
          <div class="box-row amount">
            100.00 MDT
          </div>
          <div class="box-row caption">
            已领取奖励
          </div>
        </div>
        <div class="box">
          <div class="box-row amount">
            100.00 MDT
          </div>
          <div class="box-row caption">
            已领取奖励
          </div>
        </div>
      </div>
    </div>
    <div class="history-section">
      <h3 class="md-title history-section-title">奖励历史</h3>
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
              :disabled="item.redeemed" 
              color="secondary"
            >
              {{ getButtonText(item.status) }}
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

import BaseField from '@/components/input/BaseField';
import MDTSecondaryButton from '@/components/button/MDTSecondaryButton';
import MDTMediumButton from '@/components/button/MDTMediumButton';
import WebViewLink from '@/components/common/WebViewLink';
import BasePopup from '@/components/popup/BasePopup';

import { formatAmount } from '@/utils';

export default {
  components: {
    BaseField,
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

.header {
  .header-wrapper {
    padding-top: $header-padding-top;
    position: relative;
  }

  .header__background {
    background-color: $home-bgcolor;
    height: calc(8em + 0.5em + #{$header-padding-top});
    width: 100%;
    position: absolute;
    top: 0;
  }
}

.md-card {
  border-radius: 0.5em;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin: 0 0.5em 0.5em 0.5em;

  .md-card-header {
    .md-title {
      margin-bottom: 0.5rem;
    }
  }

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

.reward-section {
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  .md-title {
    margin: 0 0 0.5rem 0;
  }

  .reward-main-number {
    margin: 0.5rem 0 1rem 0;
    font-size: 26px;
    line-height: 1.5;
  }

  .reward-sub-numbers {
    display: flex;
    justify-content: center;
    padding: 0 1.5rem;

    .box {
      background-color: #f3f6fb;
      padding: 0.25rem;
      margin: 0 0.25rem;
      border-radius: 0.25rem;
      flex: 1;

      .box-row {
        margin: 0.25rem 0;

        &.amount {
          font-size: $primary-font-size;
        }

        &.caption {
          font-size: 0.75rem;
          color: #5d6c89;
          line-height: 1.75;
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
