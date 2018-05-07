<template>
    <div id="layout">
        <div id='header'>
            <HomeHeader v-if="isHome"></HomeHeader>
            <NavigationHeader v-if="!isHome"> </NavigationHeader>
        </div>
        <div id='content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HomeHeader from '@/components/header/HomeHeader';
import NavigationHeader from '@/components/header/NavigationHeader';

import { RouteDef } from '@/constants';

export default {
  data() {
    return {
      isHome: true,
    };
  },
  components: {
    HomeHeader,
    NavigationHeader,
  },
  watch: {
    $route(to, from) {
      const toPath = to.path.replace('/', '');
      if (toPath === RouteDef.Home) {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    },
  },
};
</script>

<style scoped>

</style>

