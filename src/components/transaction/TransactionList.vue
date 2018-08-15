<template>    
  <div class="view-wrapper">
    <div class="header-wrapper">
      <md-subheader>{{ $t('message.account.transactions') }}</md-subheader>
      <md-divider />
    </div>
    <pull-to 
      ref="transactionContainer"
      :top-load-method="getNewTransactions" 
      :bottom-load-method="getOldTransactions" 
      :top-config="PULLTO_TOP_CONFIG"
      :bottom-config="PULLTO_BOTTOM_CONFIG"
      @bottom-state-change="bottomStateChange"
    >
      <div
        class="transaction-list"
      >
        <md-list 
          class="md-double-line"
        >
          <template v-if="uiState.isFetchingTransactions">
            <template v-for="n in numberOfLoadingItems">
              <TransactionListLoadingItem :key="n" />
            </template>
          </template>
          <template v-if="Array.isArray(transactions) && transactions.length > 0">

            <template v-for="transaction in transactions">
              <TransactionItem
                :key="transaction.id"
                :transaction="transaction"
                show-avatar
                @click="onTransactionItemClicked(transaction)"
              />
              <md-divider 
                :key="`${transaction.id}-divider`" 
                class="list-item-divider"
              />
            </template>
          </template>
          <TransactionListEmptyItem v-else />
        </md-list>
      </div>
      <template 
        slot="bottom-block" 
        slot-scope="props"
      >
        <p 
          v-show="showBottomText"
          class="default-text"
        >{{ props.stateText }}</p>
      </template>
    </pull-to>
  </div>
  
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { trackEvent } from '@/utils';

import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionListLoadingItem from '@/components/transaction/TransactionListLoadingItem';
import TransactionListEmptyItem from '@/components/transaction/TransactionListEmptyItem';
import Skeleton from '@/components/common/Skeleton';
import PullTo from 'vue-pull-to';

import { RouteDef } from '@/constants';
import { FETCH_TRANSACTIONS } from '@/store/modules/entities/transactions';
const PULLTO_TOP_CONFIG = {
  pullText: '下拉刷新',
  triggerText: '釋放更新',
  loadingText: '加載中...',
  doneText: '加載完成',
  failText: '加載失敗',
};
const PULLTO_BOTTOM_CONFIG = {
  pullText: '上拉加載',
  triggerText: '釋放更新',
  loadingText: '加載中...',
  doneText: '加載完成',
  failText: '加載失敗',
};
export default {
  components: {
    TransactionItem,
    TransactionListLoadingItem,
    TransactionListEmptyItem,
    Skeleton,
    PullTo,
  },
  data() {
    return {
      RouteDef,
      numberOfLoadingItems: 0,
      numberOfItemsPerPage: 5,
      PULLTO_TOP_CONFIG,
      PULLTO_BOTTOM_CONFIG,
      showBottomText: false,
    };
  },
  computed: {
    ...mapState({
      uiState: state => state.ui.transactionList,
    }),
    ...mapGetters({
      selectedUser: 'getSelectedUser',
      getTransactions: 'getTransactions',
    }),
    transactions() {
      return this.getTransactions(this.selectedUser.transactions).sort(
        (a, b) => {
          if (a.transaction_time > b.transaction_time) {
            return -1;
          } else if (a.transaction_time < b.transaction_time) {
            return 1;
          }
          return 0;
        },
      );
    },
  },
  mounted() {
    if (this.transactions.length > 0) {
      this.numberOfLoadingItems = 1;
      this.fetchTransactions({
        userId: this.selectedUser.emailAddress,
        limit: this.numberOfItemsPerPage,
      });
    } else {
      this.$nextTick(() => {
        const LOADING_ITEM_HEIGHT = 72;
        const contentHeight = this.$refs.transactionContainer.$el.offsetHeight;
        this.numberOfLoadingItems = this.numberOfItemsPerPage = Math.ceil(
          contentHeight / LOADING_ITEM_HEIGHT,
        );
        this.fetchTransactions({
          userId: this.selectedUser.emailAddress,
          limit: this.numberOfItemsPerPage,
        });
      });
    }
  },
  methods: {
    ...mapActions({
      fetchTransactions: FETCH_TRANSACTIONS,
    }),
    onTransactionItemClicked(transaction) {
      trackEvent('Click on one transction to view transaction details');
      this.$router.push({
        name: RouteDef.TransactionDetail.name,
        params: { transaction_id: transaction.id, transaction },
      });
    },
    async getNewTransactions(loaded) {
      await this.fetchTransactions({
        userId: this.selectedUser.emailAddress,
        cursorDirection: 'before',
        limit: this.numberOfItemsPerPage,
      });
      loaded('done');
    },
    async getOldTransactions(loaded) {
      await this.fetchTransactions({
        userId: this.selectedUser.emailAddress,
        cursorDirection: 'after',
        limit: this.numberOfItemsPerPage,
      });
      loaded('done');
    },
    bottomStateChange(state) {
      this.showBottomText = [
        'pull',
        'trigger',
        'loading',
        'loaded-done',
      ].includes(state);
    },
  },
};
</script>

<style lang="scss" scoped>
.view-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header-wrapper {
    .md-subheader {
      position: relative;
      z-index: 1;
      background: white;
    }
  }
  .vue-pull-to-wrapper {
    flex: 1;
    position: relative;
    /deep/ .scroll-container {
      z-index: 100;
    }
    /deep/ .action-block {
      position: absolute;
      &:last-child {
        bottom: 1.5rem;
        margin-bottom: 0 !important;
      }
      p {
        margin: 0;
      }
    }
  }
  .transaction-list {
    /deep/ .vue-pull-to-wrapper {
      .default-text {
        line-height: initial;
      }
    }
    .md-list > li {
      flex-shrink: 0;
    }
  }
}

.list-item__action {
  margin-left: 16px;
  color: $theme-font-color-btn;

  &.list-item__action--negative {
    color: $label-color;
  }
}

.list-item-divider {
  margin: 0 16px;
}
</style>
