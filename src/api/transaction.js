import axios from 'axios';
import { schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const transactionSchema = new schema.Entity('transactions');
const transactionsSchema = [transactionSchema];

export default {
  getTransactions(accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/user/transactions`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise, {
      schema: transactionsSchema,
    });
  },
  cancelTransaction(applicationId, transactionId, pin, accessToken) {
    const body = {
      pin,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/apps/${applicationId}/user/transactions/${transactionId}/cancel`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise, {
      schema: transactionsSchema,
    });
  },
};
