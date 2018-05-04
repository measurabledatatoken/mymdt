import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  forgetPassword(emailAddress) {
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/api/account/forgetpw`,
      {
        email_address: emailAddress,
      },
    );
    return handleGeneralResponse(promise, 'forgetPassword data should not be null if the request is successed');
  },
  login(emailAddress, password, apiKey) {
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/api/account/login`,
      {
        email_address: emailAddress,
        password,
        api_key: apiKey,
      },
    );
    return handleGeneralResponse(promise, 'login data should not be null if the request is successed');
  },
  // App Credentials should included display_name, email_address, token
  autoLogin(appCredentials, apiKey) {
    const promise = axios.post(`${APIScheme}://${APIEndPoint}/api/account/autologinmulti`,
      {
        api_key: apiKey,
        app_credentials: appCredentials,
      },
    );
    return handleGeneralResponse(promise, 'autologinmulti data should not be null if the request is successed');
  },
};

