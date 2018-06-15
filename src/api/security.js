import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  validatePIN(pin, accessToken) {
    const body = {
      pin,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/pin/verify`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  setupPIN(pin, confirmedPIN, accessToken) {
    const body = {
      pin,
      confirmed_pin: confirmedPIN,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/pin/setup`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  changePIN(oldPIN, newPIN, confirmedPIN, accessToken) {
    const body = {
      old_pin: oldPIN,
      new_pin: newPIN,
      confirmed_pin: confirmedPIN,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/pin/change`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
};

