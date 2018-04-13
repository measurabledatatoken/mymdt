
import axios from 'axios';

const apiEndPoint = process.env.API_ENDPOINT;
const apiScheme = process.env.API_Scheme;

export default {
  getMDTUSDPrice(cb) {
    axios.get(`${apiScheme}://${apiEndPoint}/api/mdtprice`)
      .then((response) => {
        if (response.data) {
          cb(response.data.price_usd);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
