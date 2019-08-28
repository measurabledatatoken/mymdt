<template>
  <div class="home">
    <div class="top-content">
      <div class="balance-title">{{ $t('message.home.total_balance') }}</div>
      <div class="balance-count">{{ formatAmount(totalMDTBalance) }} MDT</div>

      <div class="account-content">
        <div class="accountnum">{{ accountNumStr }}</div>
      </div>
    </div>

    <div 
      class="bottom-content" 
      data-cy="account-list"
    >
      <div
        v-for="user in allUsers"
        :key="user.emailAddress"
      >
        <UserInfoCard
          :user="user"
          :hover="false"
          @transfer="goToTransfer(user)"
          @goToAccountDetail="goToAccountDetail(user)"
        />
      </div>

      <div
        v-for="user in invalidUser"
        :key="user.emailAddress"
      >
        <UserInfoCard
          :user="user"
          :hover="false"
          disabled
          @transfer="invalidUserClicked(user)"
          @goToAccountDetail="invalidUserClicked(user)"
        />
      </div>
    </div>

    <SuccessPopup 
      :md-active.sync="showTotalClaimedPopup"
      :title="$t('message.home.claimed_mdt', {num: loginTotalClaimed})"
      :confirm-text="$t('message.common.okay')"
      icon-src="/static/icons/claim-popup.svg"
    />
    
    <SuccessPopup
      :md-active.sync="showTotalClaimablePopup"
      :title="$t('message.home.claimable_mdt', {num: loginClaimableMDT})"
      :confirm-text="$t('message.common.claim')"
      :cancel-text="$t('message.common.later')"
      icon-src="/static/icons/claim-popup.svg"
      @md-confirm="onEarnClicked"
    />
    <div class="buttons">
      <MDTPrimaryButton
        :style-type="1"
        @click="goToDataPointRewards"
      >{{ $t('message.dataPointRewards.dataRewards') }}</MDTPrimaryButton>
      <MDTPrimaryButton
        :class="[' btn-earn-mdt', { 'mdt-claimable' : loginClaimableMDT > 0 }]"
        @click="onEarnClicked"
      >
        <span class="btn-content">{{ $t('message.home.earn_mdt') }} </span>
      </MDTPrimaryButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { trackEvent, delay } from '@/utils';

import {
  SET_ERROR_MESSAGE,
  SET_ERROR_TITLE,
  SET_SHOW_ERROR_PROMPT,
  SET_SHOW_HOME_LOADING_END,
} from '@/store/modules/common';
import {
  REQUEST_MDT_PRICE,
  REQUEST_APP_CONFIG,
  REQUEST_USER_ACCOUNTS,
  SET_IS_USER_ACCOUNTS_DIRTY,
  SET_NEED_EXIT_BTN,
} from '@/store/modules/home';
import { REQUEST_AUTO_LOGIN } from '@/store/modules/login';
import UserInfoCard from '@/components/common/UserInfoCard';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import LoadingPopup from '@/components/common/LoadingPopup';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import { formatAmount } from '@/utils';
import SuccessPopup from '@/components/popup/SuccessPopup';
import { FETCH_ALL_REWARDS } from '@/store/modules/entities/rewards';

export default {
  components: {
    UserInfoCard,
    MDTPrimaryButton,
    LoadingPopup,
    SuccessPopup,
  },
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.home.title'),
    };
  },
  data() {
    return {
      RouteDef,
      msg: 'Current MDT Price:',
      loginTotalClaimed: 0,
      loginClaimableMDT: 0,
      showTotalClaimedPopup: false,
      showTotalClaimablePopup: false,
      claimablePopupContent: '',
    };
  },
  computed: {
    ...mapState({
      mdtPrice: state => state.home.mdtPrice,
      appConfig: state => state.home.appConfig,
      priceUnit: state => state.home.priceUnit,
      isUserAccountsDirty: state => state.home.isUserAccountsDirty,
      credentials: state => state.login.credentials,
      showHomeLoadingEnd: state => state.common.showHomeLoadingEnd,
    }),
    ...mapGetters({
      allUsers: 'getAllUsers',
      getUser: 'getUser',
      getRewardsOfAllUsers: 'getRewardsOfAllUsers',
      invalidUser: 'getInvalidUser',
    }),
    totalMDTBalance() {
      let totalMDTBalance = 0;
      this.allUsers.forEach(userAccount => {
        totalMDTBalance += userAccount.mdtBalance;
      });
      return totalMDTBalance;
    },
    totalMDTValues() {
      return this.totalMDTBalance * this.mdtPrice;
    },
    accountNumStr() {
      if (this.allUsers.length <= 1) {
        return '';
      }
      return this.$t('message.home.accountnum', this.allUsers.length, {
        num: this.allUsers.length,
      });
    },
  },
  async mounted() {
    if (this.$route.query.appid && this.$route.query.tokens) {
      const appID = this.$route.query.appid;
      const tokensStr = this.$route.query.tokens;
      const emailsStr = this.$route.query.emails;
      const needExit = this.$route.query.needexit;

      // clear url
      this.$router.replace(RouteDef.Home);

      this.setNeedExitBtn(needExit);
      this.autoLogin(appID, tokensStr, emailsStr, this.$i18n.locale);
    } else {
      // navigate from other pages
      await this.requestAppConfig();
      if (this.appConfig.server_status !== 'active') {
        this.$router.replace(RouteDef.Welcome.path);
        return;
      }
    }
    this.requstMDTPrice();

    if (this.isUserAccountsDirty) {
      this.requestUserAccounts();
      this.setIsUserAcctionsDirty(false);
    }

    trackEvent('Home view', { 'Email Number': this.allUsers.length });
  },
  methods: {
    ...mapMutations({
      setNeedExitBtn: SET_NEED_EXIT_BTN,
      setErrorMessage: SET_ERROR_MESSAGE,
      setErrorTitle: SET_ERROR_TITLE,
      setShowErrorPrompt: SET_SHOW_ERROR_PROMPT,
      setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
      setShowHomeLoadingEnd: SET_SHOW_HOME_LOADING_END,
    }),
    ...mapActions({
      requestAutoLogin: REQUEST_AUTO_LOGIN,
      requstMDTPrice: REQUEST_MDT_PRICE,
      requestAppConfig: REQUEST_APP_CONFIG,
      requestUserAccounts: REQUEST_USER_ACCOUNTS,
      fetchAllRewards: FETCH_ALL_REWARDS,
    }),
    goToTransfer(user) {
      trackEvent('Click on transfer from Home');
      this.$router.push({
        name: RouteDef.TransferList.name,
        params: {
          account_id: user.emailAddress,
        },
      });
    },
    goToAccountDetail(user) {
      trackEvent('Click on account cards from home page to account page');
      this.$router.push({
        name: RouteDef.AccountDetail.name,
        params: {
          account_id: user.emailAddress,
        },
      });
    },
    invalidUserClicked(user) {
      window.location.href = `mdtwallet://relogin?email=${user.emailAddress}`;
    },
    async autoLogin(appID, tokensStr, emailsStr) {
      if (appID === undefined) {
        this.setErrorTitle(this.$t('message.common.unknown_error'));
        this.setErrorMessage('Need to define appid in url parameter');
        this.setShowErrorPrompt(true);
        return;
      }

      if (tokensStr === undefined) {
        this.setErrorTitle(this.$t('message.common.unknown_error'));
        this.setErrorMessage('Need to define tokens in url parameter');
        this.setShowErrorPrompt(true);
        return;
      }

      if (emailsStr === undefined) {
        this.setErrorTitle(this.$t('message.common.unknown_error'));
        this.setErrorMessage('Need to define emails in url parameter');
        this.setShowErrorPrompt(true);
        return;
      }

      const authTokens = tokensStr.split(',');
      const emails = emailsStr.split(',');
      try {
        await this.requestAutoLogin({
          authTokens,
          emails,
          appID,
        });
        trackEvent('Successfully logged in ');

        let showPopup = null;

        this.loginTotalClaimed = this.credentials
          .map(credential => credential.claimed_amount)
          .reduce((a, b) => {
            return a + b;
          });
        if (this.loginTotalClaimed > 0) {
          showPopup = 'claimed';
        } else {
          this.loginClaimableMDT = this.credentials
            .map(credential => credential.claimable_amount)
            .reduce((a, b) => {
              return a + b;
            });
          if (this.loginClaimableMDT > 0) {
            showPopup = 'claimable';
          }
        }

        this.setShowHomeLoadingEnd(true);
        await delay(1000);
        this.setShowHomeLoadingEnd(false);

        switch (showPopup) {
          case 'claimed':
            this.showTotalClaimedPopup = true;
            break;
          case 'claimable':
            this.showTotalClaimablePopup = true;
            break;
        }
      } catch (error) {
        this.setIsLoading(false);
        this.setErrorTitle(this.$t('message.common.error_title'));
        this.setErrorMessage(this.$t('message.common.unknow_error'));
        this.setShowErrorPrompt(true);
      }
    },
    onEarnClicked() {
      trackEvent('Click on Earn MDT button from home page');
      this.$router.push(RouteDef.EarnMDT.path);
    },
    goToDataPointRewards() {
      this.$router.push({
        name: RouteDef.DataPointRewardListing.name,
      });
    },
    formatAmount,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  background-color: $home-bgcolor;
  display: flex;
  flex-direction: column;
}

.top-content {
  top: 0;
  z-index: 9;
  background-color: $home-bgcolor;
}

.bottom-content {
  z-index: 1;
  background-color: $home-bgcolor;
  overflow-y: scroll;
  padding-bottom: 80px;
  flex: 1;
}

.balance-title {
  font-size: 16px;
  color: white;
  line-height: 40px;
}

.balance-count {
  font-size: 28px;
  color: white;
  line-height: 60px;
  font-weight: bold;
}

.account-content {
  background-image: url('/static/background/sub-header-background.svg');
  background-size: cover;
  width: 100%;
  bottom: 0;
  margin-top: -40px; //To make the background image to move upward
}

.accountnum {
  font-size: 14px;
  min-height: 24px;
  font-weight: bold;
  margin-left: 16px;
  padding-top: 40px;
  padding-bottom: 4px;
  text-align: left;
  color: white;
}

.btn-earn-mdt.mdt-claimable {
  .btn-content::after {
    content: '';
    width: 8px;
    height: 8px;
    background: white;
    opacity: 0.5;
    border-radius: 50%;
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.buttons {
  position: fixed;
  bottom: 1.5rem;
  @include center_horizontal;
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 0 8px;
  z-index: 2;

  .md-button.md-raised {
    flex: 1;
    margin: 0 8px;
  }
}
</style>
