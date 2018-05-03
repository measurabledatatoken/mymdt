import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getUserAccountsData(accounts, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/api/getusersdata`,
      accounts,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, 'getUsersAccountData data should not be null if the request is successed');
  },
};

