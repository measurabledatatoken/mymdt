import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  validatePIN(pin, accessToken) {
    const body = {
      code: pin,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/pin/verify`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, 'autologin data should not be null if the request is successed');
  },
};

