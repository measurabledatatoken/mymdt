import api from '@/api';
import router from '@/router';
import { RouteDef } from '@/constants';
import { REQUEST } from '@/store/modules/api';

export const REPORT_PROBLEM = 'reportProblem/REPORT_PROBLEM';

const state = null;

const actions = {
  async [REPORT_PROBLEM]({ dispatch, rootState, rootGetters }, payload) {
    try {
      await dispatch(REQUEST, {
        api: api.account.reportProblem,
        args: [
          rootState.home.appID,
          payload,
          rootGetters.getSelectedUser.accessToken,
        ],
        setLoading: true,
        openErrorPrompt: true,
        defaultErrorPromptMessage: {
          message: {
            messageId: 'message.reportProblem.errorMessage',
          },
          title: {
            messageId: 'message.common.error_title',
          },
        },
      });

      router.push(RouteDef.ReportProblemSuccess.path);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  actions,
};
