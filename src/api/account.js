import axios from 'axios';
import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

export default {
  getUserAccountsData(accounts) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/usersdata`,
      accounts,
    );
    return handleGeneralResponse(promise, 'getUsersAccountData data should not be null if the request is successed');
  },
  getAccountTransactions() {
    return new Promise(resolve => resolve(
      [
        {
          id: '0',
          name: 'Task Reward Claimed',
          type: 0,
          status: 0,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: 2.00,
          fee: 10.000000011114321,
          balance: 1100000000.11111111,
          from: 'nametwo@email.com',
          to: '0xDFF034a213D5FD4aee68FA846C3357dC837CfCE0',
          note: 'xxxxxxx xxx xx xxxxx xxxxx xxx xxxx xxxxxxx xxx xxxx x xxx xxxx',
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '1',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          type: 0,
          status: 1,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -10.00,
          fee: 1.0000,
          balance: 4.10000,
          from: 'nametwo@email.com',
          to: '0xDFF034a213D5FD4aee68FA846C3357dC837CfCE0',
          note: 'Hi There',
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '2',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          type: 0,
          status: 2,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: 19.00,
          fee: 1.0000,
          balance: 4.10000,
          from: 'nametwo@email.com',
          to: '0xDFF034a213D5FD4aee68FA846C3357dC837CfCE0',
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '3',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          type: 0,
          status: 3,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -10.00,
          fee: 1.0000,
          balance: 4.10000,
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '4',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          type: 0,
          status: 2,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -10.00,
          fee: 1.0000,
          balance: 4.10000,
          from: 'nametwo@email.com',
          to: '0xDFF034a213D5FD4aee68FA846C3357dC837CfCE0',
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '5',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          type: 0,
          status: 0,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: 231.00,
          fee: 1.0000,
          balance: 4.10000,
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
        {
          id: '6',
          name: 'Transfer Out to Email Axxxx xxx xxxx xxxxxxx xxx xxxx',
          type: 0,
          status: 0,
          detail: 'Registration Reward',
          datetime: '2008-09-15T15:53:00+05:00',
          delta: -101.00,
          fee: 1.0000,
          balance: 4.10000,
          application: 'MailTime',
          avatar: 'https://via.placeholder.com/150x150',
        },
      ],
    ));
  },
};

