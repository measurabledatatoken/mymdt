import api from '@/api';
import { REQUEST } from '@/store/modules/api';
import { ErrorCode } from '@/enum';

import { FETCH_USER } from '@/store/modules/entities/users';

export const SET_ETH_ADDRESS = 'ethBinding/SET_ETH_ADDRESS';

const state = null;

const actions = {
  async [SET_ETH_ADDRESS]({ dispatch, rootState, rootGetters }, payload) {
    try {
      await dispatch(REQUEST, {
        api: api.account.setETHAddress,
        args: [payload, rootGetters.getSelectedUser.accessToken],
        setLoading: true,
        openErrorPrompt: true,
        defaultErrorPromptMessage: {
          message: {
            messageId: 'message.ethBinding.errorMessage',
          },
          title: {
            messageId: 'message.common.error_title',
          },
        },
        openErrorPromptForErrorCodes: {
          [ErrorCode.InvalidParameterValue]: 'message.error.addressIsTheSame',
          [ErrorCode.ActionNotAvaliable]: 'message.error.cannotSetETHAddress',
        },
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
