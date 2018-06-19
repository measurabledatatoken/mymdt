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
            isPasscodeSet: user.is_passcode_set,
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
  getAccount(accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/account/data`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return handleGeneralResponse(
      promise,
      {
        emptyDataMsg: 'getAccount data should not be null if the request is successed',
      },
    )
      .then((user) => {
        const transformedUser = {
          displayName: user.display_name,
          emailAddress: user.email_address,
          avatarURL: user.avatar_url,
          isEmailConfirmed: user.is_email_confirmed,
          phoneNumber: user.phone_number,
          isPhoneConfirmed: user.is_phone_confirmed,
          isPasscodeSet: user.is_passcode_set,
          isAccountConfirmed: user.is_account_enabled,
          isTwofaEnabled: user.is_twofa_enabled,
          ethWalletAddress: user.eth_wallet_address,
          mdtBalance: user.mdtbalance,
          isWalletEnabled: user.is_wallet_enabled,
          accessToken,
        };

        return transformedUser;
      });
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

