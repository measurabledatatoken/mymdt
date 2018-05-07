<template>
    <div id="layout">
        <div id='header'>
            <HomeHeader></HomeHeader>
            <NavigationHeader> </NavigationHeader>
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
  components: {
    HomeHeader,
    NavigationHeader,
  },
  },
};
</script>

<style scoped>

</style>

