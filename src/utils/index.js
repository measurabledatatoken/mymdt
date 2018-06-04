import numeral from 'numeral';

import {
  RouteDef,
} from '@/constants';

const isRouteHomePath = (routePath) => {
  const keys = Object.keys(RouteDef);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (routePath !== RouteDef.Home.path) {
      if (routePath === RouteDef[key].path) {
        return false;
      }
    }
  }
  return true;
};


const isRouteChangeBack = (to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  return toDepth < fromDepth;
};

const isValidEthAddress = address => new RegExp('^0x[a-fA-F0-9]{40}$').test(address);

const isValidEmailAddress = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const re = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
  return re.test(phoneNumber);
};


const getEthAddressFromString = (str) => {
  const index = str.indexOf('0x');
  if (index < 0) {
    return null;
  }

  const substr = str.substring(index);
  if (!isValidEthAddress(substr)) {
    return null;
  }
  return substr;
};

function formatAmount(amount, options) {
  if (typeof amount !== 'number') {
    return '';
  }

  // eslint-disable-next-line
  options = {
    type: 'long',
    ...options,
  };

  switch (options.type) {
    case 'short': {
      return numeral(amount).format('0,0.00');
    }
    default: {
      return numeral(amount).format('0,0.0000[00000000000000]');
    }
  }
}

function extractNameInitials(name) {
  if (typeof name !== 'string' || name === '') {
    return '';
  }

  const parts = name.split(' ');

  switch (parts.length) {
    case 1: {
      return parts[0][0].toUpperCase();
    }
    default: {
      return `${parts[0][0].toUpperCase()}${parts[parts.length - 1][0].toUpperCase()}`;
    }
  }
}

export {
  isRouteHomePath,
  isRouteChangeBack,

  isValidEthAddress,
  isValidPhoneNumber,
  isValidEmailAddress,
  getEthAddressFromString,

  formatAmount,
  extractNameInitials,
};
