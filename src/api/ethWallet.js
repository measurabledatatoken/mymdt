import axios from 'axios';
import { schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const transactionSchema = new schema.Entity(
  'transactions',
  {},
  {
    idAttribute: 'transaction_hash',
  },
);
const transactionsSchema = [transactionSchema];

export default {
  getTransactions(walletAddress) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/mdt/transactions/${walletAddress}`,
    );

    return handleGeneralResponse(promise, {
      schema: transactionsSchema,
    });
  },
};
