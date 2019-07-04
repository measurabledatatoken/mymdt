import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getTasks(appIds = '', locale, accessToken) {
    const promise = axios.get(`${APIScheme}://${APIEndPoint}/user/tasks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        appIds,
        locale,
      },
    });

    return handleGeneralResponse(promise, 'No tasks');
  },
  getFinishedTasks(appIds = '', locale, accessToken) {
    const promise = axios.get(`${APIScheme}://${APIEndPoint}/user/tasks/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        status: 'finished',
        appIds,
        locale,
      },
    });

    return handleGeneralResponse(promise, 'No tasks');
  },
  redeemSNSCode(code = '', accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/user/snscoderedeem/`,
      {
        code,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
};
