import axios from 'axios';
import { normalize, schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const userSchema = new schema.Entity('users', {}, {
  idAttribute: 'emailAddress',
});
const usersSchema = [userSchema];

export default {
  getUserAccountsData(credentials) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/usersdata`,
      credentials,
    );
    return handleGeneralResponse(
      promise,
      {
        emptyDataMsg: 'getUsersAccountData data should not be null if the request is successed',
      },
    )
      .then((users) => {
        const transformedUsers = users.map((user) => {
          const userCredential = credentials.find(credential => credential.email_address === user.email_address);
          return {
            displayName: user.display_name,
            emailAddress: user.email_address,
            avatarURL: user.avatar_url,
            isEmailConfirmed: user.is_email_confirmed,
            phoneNumber: user.phone_number,
            isPhoneConfirmed: user.is_phone_confirmed,
            isAccountConfirmed: user.is_account_enabled,
            isTwofaEnabled: user.is_twofa_enabled,
            ethWalletAddress: user.eth_wallet_address,
            mdtBalance: user.mdtbalance,
            isWalletEnabled: user.is_wallet_enabled,
            accessToken: userCredential ? userCredential.access_token : '',
          };
        });

        const normalizedUsers = normalize(transformedUsers, usersSchema);

        return normalizedUsers;
      });
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
  reportProblem(appId, payload, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/apps/${appId}/user/problems`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
};

