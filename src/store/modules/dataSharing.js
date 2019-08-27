import api from '@/api';
import { REQUEST } from '@/store/modules/api';

import { FETCH_USER } from '@/store/modules/entities/users';

export const SET_DATA_SHARING = 'dataSharing/SET_DATA_SHARING';

const state = null;

const actions = {
  async [SET_DATA_SHARING]({ dispatch, rootState, rootGetters }, enabled) {
    try {
      await dispatch(REQUEST, {
        api: api.account.setDataSharing,
        args: [
          { is_data_sharing: enabled },
          rootGetters.getSelectedUser.accessToken,
        ],
        setLoading: true,
        openErrorPrompt: true,
      });

      await dispatch(FETCH_USER, {
        userId: rootState.home.selectedUserId,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default {
  state,
  actions,
};
