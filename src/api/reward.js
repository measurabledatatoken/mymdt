import axios from 'axios';
import { schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const rewardSchema = new schema.Entity('rewards');
const rewardsSchema = [rewardSchema];

export default {
  getRewards(appIds = '', locale, accessToken) {
    const promise = axios.get(`${APIScheme}://${APIEndPoint}/user/rewards`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        appIds,
        locale,
      },
    });

    return handleGeneralResponse(promise, {
      emptyDataMsg: 'No rewards',
      schema: rewardsSchema,
    });
  },
  claimReward(rewardId, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/user/rewards/${rewardId}/claim`,
      null,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
};
