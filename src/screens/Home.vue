<template>
  <div class="home">
    <div class="top-content">
      <div class="balance-title">{{ $t('message.home.total_balance') }}</div>
      <div class="balance-count">{{ formatAmount(totalMDTBalance) }} MDT</div>

      <div class="account-content">
        <div class="balance-value">≈ {{ formatAmount(totalMDTValues, { type: 'short' }) }} USD</div>
        <div class="accountnum">{{ accountNumStr }}</div>
      </div>
    </div>

    <div class="bottom-content">
      <div v-for="user in allUsers" :key="user.emailAddress">
        <UserInfoCard v-on:transfer="goToTransfer(user)" v-on:goToAccountDetail="goToAccountDetail(user)" v-bind:user="user">
        </UserInfoCard>
      </div>
    </div>
    <LoadingPopup v-if="showHomeLoadingEnd" src="static/loadersecondhalf.gif" />
    <MDTPrimaryButton :to="RouteDef.EarnMDT.path" :bottom="true">{{ $t('message.home.earn_mdt') }}</MDTPrimaryButton>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

import { SET_ERROR_MESSAGE, SET_ERROR_TITLE, SET_SHOW_ERROR_PROMPT } from '@/store/modules/common';
import {
  SET_SELECTED_USER, REQUEST_MDT_PRICE,
  REQUEST_APP_CONFIG, REQUEST_USER_ACCOUNTS,
  SET_IS_USER_ACCOUNTS_DIRTY, SET_NEED_EXIT_BTN,
} from '@/store/modules/home';
import { REQUEST_AUTO_LOGIN } from '@/store/modules/login';
import UserInfoCard from '@/components/common/UserInfoCard';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import LoadingPopup from '@/components/common/LoadingPopup';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';
import { formatAmount } from '@/utils';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.home.title'),
    };
  },
  components: {
    UserInfoCard,
    MDTPrimaryButton,
    LoadingPopup,
  },
  data() {
    return {
      RouteDef,
      msg: 'Current MDT Price:',
      showHomeLoadingEnd: false,
    };
  },
  computed: {
    ...mapState({
      mdtPrice: state => state.home.mdtPrice,
      isUserAccountsDirty: state => state.home.isUserAccountsDirty,
    }),
    ...mapGetters({
      allUsers: 'getAllUsers',
    }),
    totalMDTBalance() {
      let totalMDTBalance = 0;
      this.allUsers.forEach((userAccount) => {
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
      return this.$t('message.home.accountnum', this.allUsers.length, { num: this.allUsers.length });
    },
  },
  mounted() {
    const redirectFrom = this.$route.redirectedFrom;
    if (redirectFrom !== undefined && redirectFrom.indexOf('autologin') >= 0) {
      const appID = this.$route.query.appid;
      const tokensStr = this.$route.query.tokens;
      const needExit = this.$route.query.needexit;

      this.setNeedExitBtn(needExit);
      this.autoLogin(appID, tokensStr);
    }
    this.requstMDTPrice();
    this.requestAppConfig();

    if (this.isUserAccountsDirty) {
      this.requestUserAccounts();
      this.setIsUserAcctionsDirty(false);
    }
  },
  methods: {
    ...mapMutations({
      setNeedExitBtn: SET_NEED_EXIT_BTN,
      setSelectedUser: SET_SELECTED_USER,
      setErrorMessage: SET_ERROR_MESSAGE,
      setErrorTitle: SET_ERROR_TITLE,
      setShowErrorPrompt: SET_SHOW_ERROR_PROMPT,
      setIsUserAcctionsDirty: SET_IS_USER_ACCOUNTS_DIRTY,
    }),
    ...mapActions({
      requestAutoLogin: REQUEST_AUTO_LOGIN,
      requstMDTPrice: REQUEST_MDT_PRICE,
      requestAppConfig: REQUEST_APP_CONFIG,
      requestUserAccounts: REQUEST_USER_ACCOUNTS,
    }),
    goToTransfer(user) {
      this.setSelectedUser(user.emailAddress);
      this.$router.push(RouteDef.TransferList.path);
    },
    goToAccountDetail(user) {
      this.setSelectedUser(user.emailAddress);
      this.$router.push({
        name: RouteDef.AccountDetail.name,
        params: {
          account_id: user.emailAddress, // TODO: change to user id when API is ready
        },
      });
    },
    autoLogin(appID, tokensStr) {
      if (appID === undefined || tokensStr === undefined) {
        this.setErrorTitle(this.$t('message.common.unknown_error'));
        this.setErrorMessage('AppID is undefined');
        this.setShowErrorPrompt(true);
        return;
      }
      const authTokens = tokensStr.split(',');
      this.requestAutoLogin(
        {
          authTokens,
          appID,
        },
      ).then(
        () => {
          this.showHomeLoadingEnd = true;

          setTimeout(
            () => {
              this.showHomeLoadingEnd = false;
            },
            1000,
          );
        },
      ).catch(
        (error) => {
          this.setErrorTitle(this.$t('message.common.unknown_error'));
          this.setErrorMessage(`Error Code:${error.response.data.error_message}`);
          this.setShowErrorPrompt(true);
        },
      );
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
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: $home-bgcolor;
}

.bottom-content {
  z-index: 1;
  background-color: $home-bgcolor;
  overflow-y: scroll;
  padding-bottom: 80px;
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
  background-image: url("/static/background/sub-header-background.svg");
  background-size: cover;
  width: 100%;
  bottom: 0;
  margin-top: -40px; //To make the background image to move upward
}

.balance-value {
  font-size: 16px;
  color: white;
  line-height: 70px;
  padding-top: 20px;
}

.accountnum {
  font-size: 14px;
  min-height: 24px;
  font-weight: bold;
  margin-left: 16px;
  padding-bottom: 4px;
  text-align: left;
  color: white;
}
</style>
