import axios from 'axios';
import { TransferType } from '@/constants';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  transfer(toAddress, transferType, amount, pin, note, accessToken) {
    let transferEndpoint = '';
    let body = {};

    if (transferType === TransferType.EthWallet) {
      transferEndpoint = 'transfer/eth-address';
      body = {
        eth_address: toAddress,
        pin,
        amount,
        note,
      };
    } else if (transferType === TransferType.Email) {
      transferEndpoint = 'transfer/email';
      body = {
        email_address: toAddress,
        pin,
        amount,
        note,
      };
    }

    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/${transferEndpoint}`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(
      promise,
      'transfer data should not be null if the request is successed',
    );
  },
};
