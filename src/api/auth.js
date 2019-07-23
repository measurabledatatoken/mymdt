import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  forgetPassword(emailAddress) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/account/forgetpw`,
      {
        email_address: emailAddress,
      },
    );
    return handleGeneralResponse(
      promise,
      'forgetPassword data should not be null if the request is successed',
    );
  },
  login(emailAddress, password, appID) {
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/account/login`, {
      email_address: emailAddress,
      password,
      app_id: appID,
    });
    return handleGeneralResponse(
      promise,
      'login data should not be null if the request is successed',
    );
  },
  // App Credentials should included display_name, email_address, token
  autoLogin(appCredentials, appID, locale, { inviterCode = '' } = {}) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/account/autologin`,
      {
        app_id: appID,
        app_credentials: appCredentials,
        locale,
        inviter_invite_code: inviterCode,
      },
    );
    return handleGeneralResponse(
      promise,
      'autologin data should not be null if the request is successed',
    );
  },
};
