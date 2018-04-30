
import axios from 'axios';

const apiEndPoint = process.env.API_ENDPOINT;
const apiScheme = process.env.API_Scheme;

export default {


  getMDTUSDPrice() {
    return axios.get(`${apiScheme}://${apiEndPoint}/api/mdtprice`)
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
  forgetPassword(emailAddress) {
    return axios.post(`${apiScheme}://${apiEndPoint}/api/account/forgetpw`,
      {
        email_address: emailAddress,
      },
    )
    .then((response) => {
      if (response.data) {
        return Promise.resolve(null);
      }
      return Promise.reject(Error('forgetPassword data should not be null if the request is successed'));
    })
    .catch((error) => {
        Promise.reject(error);
      });
  },
};
