import {
  RouteDef,
} from '@/constants';

const isRouteHomePath = (routePath) => {
  const keys = Object.keys(RouteDef);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (routePath !== RouteDef.Home) {
      if (routePath === RouteDef[key]) {
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

export {
  isRouteHomePath,
  isRouteChangeBack,

  isValidEthAddress,
  getEthAddressFromString,
};
