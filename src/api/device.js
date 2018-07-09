import axios from 'axios';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getBetaTestingSession(deviceId) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/devices/${deviceId}/beta-testing-session`,
    );

    return handleGeneralResponse(promise);
  },
  requestBetaTestingSession(deviceId, accessCode) {
    console.log('accessCode', accessCode);
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/devices/${deviceId}/beta-testing-session/create`,
      {
        access_code: accessCode,
      },
    );

    return handleGeneralResponse(promise);
  },
};
