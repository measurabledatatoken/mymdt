import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  validatePIN(pin, accessToken) {
    const body = {
      pin,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/pin/verify`,
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
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/pin/setup`,
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
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/pin/change`,
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
      new_confirmed_pin: confirmedPIN,
      otp: verificationCode,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/pin/reset`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  sendVerificationCodeToPhone(phoneNum, action, accessToken) {
    const body = {
      phone_number: phoneNum,
      action,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/sms/requestotp`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  addPhoneNumber(verificationCode, pin, accessToken) {
    const body = {
      pin,
      otp: verificationCode,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/phonenumber/add`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  changePhoneNumber(oldVerificationCode, verificationCode, pin, accessToken) {
    const body = {
      old_phone_otp: oldVerificationCode,
      new_phone_otp: verificationCode,
      pin,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/phonenumber/change`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
  verifyCodeForPhoneNumber(action, verificationCode, accessToken) {
    const body = {
      action,
      otp: verificationCode,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/security/sms/verifyotp`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, { allowEmptyData: true });
  },
};
