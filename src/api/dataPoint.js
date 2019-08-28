import axios from 'axios';
import { schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const dataPointRewardSchema = new schema.Entity('dataPointRewards');
const dataPointRewardsSchema = [dataPointRewardSchema];

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
      schema: dataPointRewardsSchema,
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
