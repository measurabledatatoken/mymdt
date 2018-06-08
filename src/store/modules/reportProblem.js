import api from '@/api';
import router from '@/router';
import { RouteDef } from '@/constants';
import {
  SET_IS_LOADING,
  OPEN_ERROR_PROMPT,
} from '@/store/modules/common';

export const REPORT_PROBLEM = 'reportProblem/REPORT_PROBLEM';

const state = null;

const actions = {
  [REPORT_PROBLEM]({ commit, dispatch, rootState }, payload) {
    commit(SET_IS_LOADING, true);
    return api.account.reportProblem(rootState.home.appID, payload, rootState.home.selectedUser.accessToken)
      .then(() => {
        commit(SET_IS_LOADING, false);
        router.push(RouteDef.ReportProblemSuccess.path);
      })
      .catch(() => {
        commit(SET_IS_LOADING, false);
        dispatch(OPEN_ERROR_PROMPT, {
          message: {
            messageId: 'message.reportProblem.errorMessage',
          },
          title: {
            messageId: 'message.common.error_title',
          },
        });
      });
  },
};

export default {
  state,
  actions,
};
