import axios from 'axios';
import { normalize, schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: 'emailAddress',
  },
);
const usersSchema = [userSchema];

export default {
  getUserAccountsData(credentials) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/usersdata`,
      credentials,
    );
    return handleGeneralResponse(promise, {
      emptyDataMsg:
        'getUsersAccountData data should not be null if the request is successed',
    }).then(users => {
      const transformedUsers = users.map(user => {
        const userCredential = credentials.find(
          credential => credential.email_address === user.email_address,
        );
        return {
          displayName: user.display_name,
          emailAddress: user.email_address,
          avatarURL: user.avatar_url,
          isEmailConfirmed: user.is_email_confirmed,
          countryDialCode: user.country_code,
          countryCode: user.iso2_country_code,
          phoneNumber: user.phone_number,
          isPhoneConfirmed: user.is_phone_confirmed,
          isPasscodeSet: user.is_passcode_set,
          isAccountConfirmed: user.is_account_enabled,
          isTwofaEnabled: user.is_2fa_enabled,
          twofaMethod: user['2fa_method'],
          twofaUsage: user['2fa_usage'],
          isGoogleAuthEnabled: user.is_google_auth_enabled,
          hasGoogleAuthSecret: user.has_google_auth_secret,
          ethWalletAddress: user.eth_wallet_address,
          mdtBalance: user.mdtbalance,
          isWalletEnabled: user.is_wallet_enabled,
          userDataShares: user.user_data_shares || [],
          smartContractETHAddress: user.smart_contract_eth_address,
          smartContractPendingETHAddress:
            user.smart_contract_pending_eth_address,
          smartContractPendingETHAddressStatus:
            user.smart_contract_pending_eth_address_status,
          accessToken: userCredential ? userCredential.access_token : '',
        };
      });

      const normalizedUsers = normalize(transformedUsers, usersSchema);

      return normalizedUsers;
    });
  },
  getAccount(accessToken) {
    const promise = axios.get(`${APIScheme}://${APIEndPoint}/account/data`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return handleGeneralResponse(promise, {
      emptyDataMsg:
        'getAccount data should not be null if the request is successed',
    }).then(user => {
      const transformedUser = {
        displayName: user.display_name,
        emailAddress: user.email_address,
        avatarURL: user.avatar_url,
        isEmailConfirmed: user.is_email_confirmed,
        countryDialCode: user.country_code,
        countryCode: user.iso2_country_code,
        phoneNumber: user.phone_number,
        isPhoneConfirmed: user.is_phone_confirmed,
        isPasscodeSet: user.is_passcode_set,
        isAccountConfirmed: user.is_account_enabled,
        isTwofaEnabled: user.is_2fa_enabled,
        twofaMethod: user['2fa_method'],
        twofaUsage: user['2fa_usage'],
        isGoogleAuthEnabled: user.is_google_auth_enabled,
        hasGoogleAuthSecret: user.has_google_auth_secret,
        ethWalletAddress: user.eth_wallet_address,
        mdtBalance: user.mdtbalance,
        isWalletEnabled: user.is_wallet_enabled,
        userDataShares: user.user_data_shares || [],
        smartContractETHAddress: user.smart_contract_eth_address,
        smartContractPendingETHAddress: user.smart_contract_pending_eth_address,
        smartContractPendingETHAddressStatus:
          user.smart_contract_pending_eth_address_status,
        accessToken,
      };

      return transformedUser;
    });
  },
  reportProblem(appId, payload, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/user/apps/${appId}/problems`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
  setDataSharing(payload, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/user/data-share`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
  setETHAddress(payload, accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/account/setethaddress`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
  confirmETHAddressStatus(accessToken) {
    const promise = axios.post(
      `${APIScheme}://${APIEndPoint}/account/ethaddress/status/confirm`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise);
  },
  // emailsStr with email with , seperator
  checkAccountsExist(emailsStr) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/account/exist?emails=${emailsStr}`,
    );

    return handleGeneralResponse(promise);
  },
};
