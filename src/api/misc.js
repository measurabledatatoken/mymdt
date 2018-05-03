
import axios from 'axios';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getMDTUSDPrice() {
    return axios.get(`${APIScheme}://${APIEndPoint}/api/mdtprice`)
      .then((response) => {
        if (response.data) {
          return Promise.resolve(response.data.price_usd);
        }
        return Promise.reject(Error('getMDTUSDPrice data should not be null if the request is successed'));
      })
      .catch((error) => {
        Promise.reject(error);
      });
  },
};