<template>
  <div class="home" v-bind:style=" {'height': pageHeight }">
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

    <EarnMDTButton />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { SET_SELECTED_USER, REQUEST_MDT_PRICE, REQUEST_USER_ACCOUNTS, REQUEST_APP_CONFIG } from '@/store/modules/home';
import UserCard from '@/components/common/UserCard';
import EarnMDTButton from '@/components/common/EarnMDTButton';
import { RouteDef, HeaderHeight } from '@/constants';

export default {
  metaInfo() {
    return {
      title: this.$t('message.home.title'),
    };
  },
  data() {
    return {
      RouteDef,
      msg: 'Current MDT Price:',
      pageHeight: '0px',
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
  },
  mounted() {
    this.requstMDTPrice();
    this.requestUserAccounts();
    this.requestAppConfig();

    this.pageHeight = `${window.innerHeight - HeaderHeight}px`;
  },
  methods: {
    ...mapMutations({
      setSelectedUser: SET_SELECTED_USER,
    }),
    ...mapActions({
      requstMDTPrice: REQUEST_MDT_PRICE,
      requestUserAccounts: REQUEST_USER_ACCOUNTS,
      requestAppConfig: REQUEST_APP_CONFIG,
    }),
    goToTransfer(user) {
      this.setSelectedUser(user);
      this.$router.push(RouteDef.TransferList);
    },
    goToAccountDetail(user) {
      this.setSelectedUser(user);
      this.$router.push(RouteDef.AccountDetail);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  background-color: $home-bgcolor;
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
