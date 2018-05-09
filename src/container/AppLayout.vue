<template>
    <div id="layout">
        <div id='header'>
            <transition :name=" 'header-' + transitionName">
              <HomeHeader v-if="isHome" class="header-view"></HomeHeader>
              <NavigationHeader v-if="!isHome" class="header-view"> </NavigationHeader>
            </transition>
        </div>
          <div id='content'>
            <transition :name="'content-' + transitionName">
              <router-view class="content-router-view"></router-view>
            </transition>
          </div>
    </div>
</template>

<script>
import HomeHeader from '@/components/header/HomeHeader';
import NavigationHeader from '@/components/header/NavigationHeader';

import { isRouteHomePath, isRouteChangeBack } from '@/utils';

export default {
  data() {
    return {
      isHome: true,
      transitionName: 'pop-in',
    };
  },
  components: {
    HomeHeader,
    NavigationHeader,
  },
  computed: {
  },
  watch: {
    $route(to, from) {
      const toPath = to.path;
      if (isRouteHomePath(toPath)) {
        this.isHome = true;
      } else {
        this.isHome = false;
      }

      this.transitionName = isRouteChangeBack(to, from) ? 'pop-out' : 'pop-in';
    },
  },
  created() {

  },
};
</script>

<style lang="scss" scoped>


@mixin animation-active (){
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}


.header-view {
  padding: 1em;
  width: 100%;
  height: 3em;
}

.content-router-view, .header-view {
  width: 100%;
}


.header-pop-out-enter-active,
.header-pop-out-leave-active,
.header-pop-in-enter-active,
.header-pop-in-leave-active {
  @include animation-active();
}

.header-pop-out-enter {
  transform: translateX(-100%);
}
.header-pop-out-leave-active {
  transform: translateX(100%);
}
.header-pop-in-enter {
  transform: translateX(100%);
}
.header-pop-in-leave-active {
  transform: translateX(-100%);
}

.content-pop-out-enter-active,
.content-pop-out-leave-active,
.content-pop-in-enter-active,
.content-pop-in-leave-active {
 @include animation-active;
  Top: 5em;
}

.content-pop-out-enter {
  transform: translateX(-100%);
}
.content-pop-out-leave-active {
  transform: translateX(100%);
}
.content-pop-in-enter {
  transform: translateX(100%);
}
.content-pop-in-leave-active {
  transform: translateX(-100%);
}
</style>

