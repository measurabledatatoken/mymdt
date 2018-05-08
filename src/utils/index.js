import { RouteDef } from '@/constants';

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

export default isRouteHomePath;
