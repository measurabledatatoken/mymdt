import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getUserAccountsData(accounts, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/api/getusersdata`,
      accounts,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(promise, 'getUsersAccountData data should not be null if the request is successed');
  },
  getAccountTransactions() {
    return new Promise(resolve => resolve(
      [
        {
          id: '0',
          name: 'Task Reward Claimed',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: 2.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '1',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -10.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '2',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: 19.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '3',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -10.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '4',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -10.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '5',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: 231.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '6',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -101.00,
          avatar: 'https://via.placeholder.com/150x150',
        },
      ],
    ));
  },
};

