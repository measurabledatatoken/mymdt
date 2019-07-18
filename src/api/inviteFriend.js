import axios from 'axios';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getRewardHistory(accessToken, paginationOptions) {
    const {
      sortby,
      order,
      limit,
      cursors: { after, before } = {},
    } = paginationOptions;
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/user/invitefriend/rewardhistory`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { sortby, order, limit, after, before },
      },
    );

    return handleGeneralResponse(promise, {
      includeMeta: true,
    });
  },
};
