import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  transfer(toAddress, transferType, amount, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/api/transfer`,
      {
        transfer_type: transferType,
        to_address: toAddress,
        amount,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, 'transfer data should not be null if the request is successed');
  },
};

