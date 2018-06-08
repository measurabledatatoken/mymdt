
import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getMDTUSDPrice() {
    const promise = axios.get(`${APIScheme}://${APIEndPoint}/mdtprice`);
    return handleGeneralResponse(promise, 'getAppConfig data should not be null if the request is successed');
  },
  getAppConfig() {
    const promise = axios.get(`${APIScheme}://${APIEndPoint}/system/config`);
    return handleGeneralResponse(promise, 'getAppConfig data should not be null if the request is successed');
  },
};
