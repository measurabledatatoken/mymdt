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
      new_confirmed_pin: confirmedPIN,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/pin/change`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  resetPIN(newPIN, confirmedPIN, verificationCode, accessToken) {
    const body = {
      new_pin: newPIN,
      confirmed_pin: confirmedPIN,
      verification_code: verificationCode,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/pin/reset`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  sendVerificationCodeToPhone(countryCode, phoneNum, accessToken) {
    const body = {
      country_code: countryCode,
      phone_num: phoneNum,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/phonenumber/requestotp`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  addPhoneNumber(countryCode, phoneNum, verificationCode, accessToken) {
    const body = {
      country_code: countryCode,
      phone_number: phoneNum,
      verification_code: verificationCode,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/phonenumber/add`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  changePhoneNumber(countryCode, phoneNum, verificationCode, pin, accessToken) {
    const body = {
      country_code: countryCode,
      phone_number: phoneNum,
      verification_code: verificationCode,
      pin,
    };
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/security/phonenumber/change`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
};

