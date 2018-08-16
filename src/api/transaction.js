import axios from 'axios';
import { schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const transactionSchema = new schema.Entity('transactions');
const transactionsSchema = [transactionSchema];

export default {
  getTransactions(accessToken, paginationOptions) {
    const {
      sortby,
      order,
      limit,
      cursors: { after, before } = {},
    } = paginationOptions;
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/user/transactions`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { sortby, order, limit, after, before },
      },
    );

    return handleGeneralResponse(promise, {
      schema: transactionsSchema,
      includeMeta: true,
    });
  },
  cancelTransaction(transactionId, pin, accessToken) {
    const body = {
      pin,
    };
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/user/transactions/${transactionId}/cancel`,
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
