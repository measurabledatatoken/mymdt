// import axios from 'axios';

// import handleGeneralResponse from './helper';
// import { APIEndPoint, APIScheme } from './constants';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  getBetaTestingSession(deviceId) { // eslint-disable-line
    return delay(1500).then(() => false);
    // const promise = axios.get(
    //   `${APIScheme}://${APIEndPoint}/account/registered-apps`,
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   },
    // );

    // return handleGeneralResponse(promise, {
    //   allowEmptyData: true,
    // });
  },
  requestBetaTestingSession(accessCode) { // eslint-disable-line
    return delay(1500).then(() => true);
    // return delay(1500).then(() => Promise.reject(new Error()));
  },
};
