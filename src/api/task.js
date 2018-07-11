import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getTasks(appId, accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/apps/${appId}/user/tasks`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise, 'No tasks');
  },
  getFinishedTasks(appId, accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/apps/${appId}/user/tasks/finished`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise, 'No tasks');
  },
};
