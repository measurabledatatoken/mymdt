
import axios from 'axios';

const apiEndPoint = process.env.API_ENDPOINT;
const apiScheme = process.env.API_Scheme;


const handleGeneralResponse = (promise, emptyDataMsg) => promise
  .then((response) => {
    if (response.data) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(Error(emptyDataMsg));
  })
  .catch(error => Promise.reject(error));


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
    const promise = axios.post(`${apiScheme}://${apiEndPoint}/api/account/forgetpw`,
      {
        email_address: emailAddress,
      },
    );
    return handleGeneralResponse(promise, 'forgetPassword data should not be null if the request is successed');
  },
  login(emailAddress, password, apiKey) {
    const promise = axios.post(`${apiScheme}://${apiEndPoint}/api/account/login`,
      {
        email_address: emailAddress,
        password,
        api_key: apiKey,
      },
    );
    return handleGeneralResponse(promise, 'login data should not be null if the request is successed');
  },
};
