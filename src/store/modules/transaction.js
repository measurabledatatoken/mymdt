import api from '@/api';
import { REQUEST } from '@/store/modules/api';
export const CANCEL_TRANSACTION = 'transaction/CANCEL_TRANSACTION';

const state = null;

const actions = {
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
  actions,
};
