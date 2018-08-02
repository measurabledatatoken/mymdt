import api from '@/api';
import { delay } from '@/utils';

import { REQUEST } from '@/store/modules/api';
import { FETCH_USER } from '@/store/modules/entities/users';

export const FETCHING_TRANSACTIONS = 'transaction/FETCHING_TRANSACTIONS';
export const FETCHING_TRANSACTIONS_SUCCESS =
  'transaction/FETCHING_TRANSACTIONS_SUCCESS';
export const FETCHING_TRANSACTIONS_FAILURE =
  'transaction/FETCHING_TRANSACTIONS_FAILURE';

export const FETCH_TRANSACTIONS = 'transaction/FETCH_TRANSACTIONS';
export const CANCEL_TRANSACTION = 'transaction/CANCEL_TRANSACTION';

const state = {
  byId: {},
  allIds: [],
};

const moduleGetters = {
  getTransaction: state => id => state.byId[id],
  getTransactions: (state, getters) => (ids = []) =>
    ids.map(id => getters.getTransaction(id)),
};

const mutations = {
  [FETCHING_TRANSACTIONS_SUCCESS](state, payload) {
    const { data } = payload;
    state.byId = {
      ...state.byId,
      ...data.entities.transactions,
    };
    state.allIds = [...new Set([...state.allIds, ...data.result])];
  },
};

function getLatestTimeFromTransactions(transactions) {
  return transactions.reduce((latestTime, transaction) => {
    const transactionTime = new Date(transaction.transaction_time);
    if (transactionTime > latestTime) {
      return transactionTime;
    }

    return latestTime;
  }, new Date(0));
}

const actions = {
  [FETCH_TRANSACTIONS]({ commit, dispatch, getters, rootGetters }, { userId }) {
    commit(FETCHING_TRANSACTIONS, {
      userId,
    });
    return delay(750)
      .then(() =>
        api.transaction.getTransactions(
          rootGetters.getUser(userId).accessToken,
        ),
      )
      .then(data => {
        const currentTransactionIds = rootGetters.getUser(userId).transactions;
        const currentTransactions = getters
          .getTransactions(currentTransactionIds)
          .filter(transactions => transactions);
        const currentLatestTime = getLatestTimeFromTransactions(
          currentTransactions,
        );
        const fetchedTransactions = data.result.map(
          tranactionId => data.entities.transactions[tranactionId],
        );
        const fetchedLatestTime = getLatestTimeFromTransactions(
          fetchedTransactions,
        );

        if (fetchedLatestTime > currentLatestTime) {
          dispatch(FETCH_USER, {
            userId,
          });
        }

        commit(FETCHING_TRANSACTIONS_SUCCESS, {
          userId,
          data,
        });
      })
      .catch(error =>
        commit(FETCHING_TRANSACTIONS_FAILURE, {
          userId,
          error,
        }),
      );
  },
  [CANCEL_TRANSACTION](
    { dispatch, rootGetters },
    { applicationId, transactionId, pin },
  ) {
    const account = rootGetters.getSelectedUser;

    return dispatch(REQUEST, {
      api: api.transaction.cancelTransaction,
      args: [applicationId, transactionId, pin, account.accessToken],
      setLoading: true,
      openErrorPrompt: true,
    });
  },
};

export default {
  state,
  getters: moduleGetters,
  mutations,
  actions,
};
