<template>
  <div class="home">
    <div class="top-content">
      <div class="balance-title">{{ $t('message.home.total_balance') }}</div>
      <div class="balance-count">{{ totalMDTBalance }} MDT</div>

      <div class="account-content">
        <div class="balance-value">≈ {{ totalMDTValues.toFixed(2) }} USD</div>
        <div class="accountnum">{{ accountNumStr }}</div>
      </div>
    </div>

    <div class="bottom-content">
      <div v-for="user in userAccounts" :key="user.emailAddress">
        <UserCard v-on:transfer="goToTransfer(user)" v-on:goToAccountDetail="goToAccountDetail(user)" v-bind:user="user">
        </UserCard>
      </div>
    </div>
    <LoadingPopup v-if="showHomeLoadingEnd" src="static/loadersecondhalf.gif" />
    <EarnMDTButton />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { SET_SELECTED_USER, REQUEST_MDT_PRICE, REQUEST_APP_CONFIG, SET_NEED_EXIT_BTN } from '@/store/modules/home';
import { REQUEST_AUTO_LOGIN } from '@/store/modules/login';
import UserCard from '@/components/common/UserCard';
import EarnMDTButton from '@/components/common/EarnMDTButton';
import LoadingPopup from '@/components/common/LoadingPopup';
import { RouteDef } from '@/constants';
import BasePage from '@/screens/BasePage';

export default {
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
      showHomeLoadingEnd: false,
    };
  },
  computed: {
    ...mapState({
      mdtPrice: state => state.home.mdtPrice,
      userAccounts: state => state.home.userAccounts,
    }),
    totalMDTBalance() {
      let totalMDTBalance = 0;
      this.userAccounts.forEach((userAccount) => {
        totalMDTBalance += userAccount.mdtBalance;
      });
      return totalMDTBalance;
    },
    totalMDTValues() {
      return this.totalMDTBalance * this.mdtPrice;
    },
    accountNumStr() {
      if (this.userAccounts.length <= 1) {
        return '';
      }
      return this.$t('message.home.accountnum', this.userAccounts.length, { num: this.userAccounts.length });
    },
  },
  components: {
    UserCard,
    EarnMDTButton,
    LoadingPopup,
  },
  mounted() {
    const redirectFrom = this.$route.redirectedFrom;
    if (redirectFrom !== undefined && redirectFrom.indexOf('autologin') >= 0) {
      const apiKey = this.$route.query.apikey;
      const tokensStr = this.$route.query.tokens;
      const needExit = this.$route.query.needexit;

      this.setNeedExitBtn(needExit);
      this.autoLogin(apiKey, tokensStr);
    }
    this.requstMDTPrice();
    this.requestAppConfig();
  },
  methods: {
    ...mapMutations({
      setNeedExitBtn: SET_NEED_EXIT_BTN,
      setSelectedUser: SET_SELECTED_USER,
    }),
    ...mapActions({
      requestAutoLogin: REQUEST_AUTO_LOGIN,
      requstMDTPrice: REQUEST_MDT_PRICE,
      requestAppConfig: REQUEST_APP_CONFIG,
    }),
    goToTransfer(user) {
      this.setSelectedUser(user);
      this.$router.push(RouteDef.TransferList);
    },
    goToAccountDetail(user) {
      this.setSelectedUser(user);
      this.$router.push({
        name: 'accountDetail',
        params: {
          account_id: user.emailAddress, // TODO: change to user id when API is ready
        },
      });
    },
    autoLogin(apiKey, tokensStr) {
      if (apiKey === undefined || tokensStr === undefined) {
        this.$router.push(RouteDef.Login);
        return;
      }
      const authTokens = tokensStr.split(',');
      this.requestAutoLogin(
        {
          authTokens,
          apiKey,
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
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  background-color: $home-bgcolor;
  height: calc(100vh - #{$header-height});
}

.top-content {
  position: sticky;
  top: $header-height;
  z-index: 9;
  background-color: $home-bgcolor;
  height: 174px;
}

.bottom-content {
  z-index: 1;
  background-color: $home-bgcolor;
  height: calc(100% - 174px);
  overflow-y: scroll;
  padding-bottom: 80px;
  -webkit-overflow-scrolling: touch;
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

.md-button.earn-mdt {
  @include primaryButtonStyle;
  @include center_horizontal;
}
</style>
