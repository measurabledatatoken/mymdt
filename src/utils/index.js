import numeral from 'numeral';
import mixpanel from 'mixpanel-browser';

import { RouteDef } from '@/constants';

const isRouteHomePath = routePath => {
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

const isValidEthAddress = address =>
  new RegExp('^0x[a-fA-F0-9]{40}$').test(address);

const isValidEmailAddress = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isValidPhoneNumber = phoneNumber => {
  const re = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
  return re.test(phoneNumber);
};

const getEthAddressFromString = str => {
  if (typeof str !== 'string') {
    return null;
  }

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

const isStringEthAddress = str => {
  if (typeof str !== 'string') {
    return false;
  }

  const index = str.indexOf('0x');
  if (index !== 0) {
    return false;
  }

  if (!isValidEthAddress(str)) {
    return false;
  }
  return true;
};

function formatAmount(amount, options) {
  if (typeof amount !== 'number') {
    return '';
  }

  // eslint-disable-next-line
  options = {
    type: 'short',
    suffix: '',
    prefix: '',
    ...options,
  };

  let result;
  switch (options.type) {
    case 'short': {
      result = numeral(amount).format('0,0.00');
      break;
    }
    case 'medium': {
      result = numeral(amount).format('0,0.0000');
      break;
    }
    default: {
      result = numeral(amount).format('0,0.0000[00000000000000]');
    }
  }

  result = `${options.prefix}${result}${options.suffix}`;

  return result;
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
      return `${parts[0][0].toUpperCase()}${parts[
        parts.length - 1
      ][0].toUpperCase()}`;
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function forcePromiseToRunForAtLeast(promise, ms) {
  return Promise.all([
    promise
      .then(data => ({
        valid: true,
        data,
      }))
      .catch(error => ({
        valid: false,
        error,
      })),
    delay(ms),
  ]).then(([result]) => {
    if (result.valid) {
      return result.data;
    }
    throw result.error;
  });
}

// Event Tracking related function
function trackEvent(event, properties) {
  properties = properties || {};
  mixpanel.track(event, properties);
}

function regTrackingSuperProperties(properties) {
  mixpanel.register(properties);
}

const mapLocale = originalLocale => {
  if (typeof originalLocale != 'string') {
    originalLocale = 'en-us';
  }
  originalLocale = originalLocale.toLowerCase();
  switch (originalLocale) {
    case 'zh-hk':
    case 'zh-hant': {
      return 'zh-hk';
    }
    case 'zh-cn':
    case 'zh-hans': {
      return 'zh-cn';
    }
    default: {
      return 'en-us';
    }
  }
};

const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const isIOS =
  /ipad|iphone|ipod/.test(userAgent.toLowerCase()) && !window.MSStream;
const isAndroid = /android/.test(userAgent.toLowerCase()) && !window.MSStream;

function openExternalBrowser(url) {
  window.location.href = `mdtwallet://open-external-browser?url=${encodeURIComponent(
    url,
  )}`;
}

export {
  isRouteHomePath,
  isRouteChangeBack,
  isValidEthAddress,
  isValidPhoneNumber,
  isValidEmailAddress,
  getEthAddressFromString,
  isStringEthAddress,
  formatAmount,
  extractNameInitials,
  delay,
  forcePromiseToRunForAtLeast,
  trackEvent,
  regTrackingSuperProperties,
  mapLocale,
  isIOS,
  isAndroid,
  openExternalBrowser,
};
