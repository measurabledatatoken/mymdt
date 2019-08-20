import axios from 'axios';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getRewards(accessToken, paginationOptions = {}) {
    const {
      sortby,
      order,
      limit,
      cursors: { after, before } = {},
    } = paginationOptions;
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/user/rewards/datapoint`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { sortby, order, limit, after, before },
      },
    );

    return handleGeneralResponse(promise, {
      includeMeta: true,
    });
  },
  getConfig(appId, accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/user/apps/${appId}/datapointconfig`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
  getSummary(accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/user/rewards/datapoint/summary`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
};
