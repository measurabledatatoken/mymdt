<template>
  <div class="appcontainer">
    <div class='header'>
      <transition :name=" 'header-' + transitionName">
        <HomeHeader v-if="showHomeHeader" class="header-view"></HomeHeader>
        <NavigationHeader v-if="!showHomeHeader" :title="navigationTitle" class="header-view"> </NavigationHeader>
      </transition>
    </div>
    <div class='content'>
      <transition :name="'content-' + transitionName">
        <router-view class="content-router-view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HomeHeader from '@/components/header/HomeHeader';
import NavigationHeader from '@/components/header/NavigationHeader';

import { isRouteChangeBack } from '@/utils';

export default {
  data() {
    return {
      showHomeHeader: true,
      transitionName: 'pop-in',
    };
  },
  computed: {
    ...mapGetters({
      navigationTitle: 'navigationTitle',
    }),
  },
  components: {
    HomeHeader,
    NavigationHeader,
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      if (toDepth === undefined || toDepth <= 2) {
        this.showHomeHeader = true;
      } else {
        this.showHomeHeader = false;
      }

      this.transitionName = isRouteChangeBack(to, from) ? 'pop-out' : 'pop-in';
    },
  },
  created() {
    let locale = this.$route.query.lang;
    if (locale === undefined) {
      const storeState = this.$store.state.home.locale;
      if (storeState !== null) {
        locale = storeState;
      } else {
        locale = 'en-us';
      }
    } else {
      this.$store.commit('setLocale', locale);
    }
    this.$i18n.locale = locale;
  },
};
</script>

<style lang="scss" scoped>
@mixin animation-active () {
  will-change: transform;
  @include transition(transform 500ms);
  position: absolute;
}

.appcontainer {
  height: inherit;
}

.header {
  position: sticky;
  top: 0;
  z-index: 3;
}
.header-view {
  width: 100%;
  height: $header-height;
}

.content-router-view {
  width: 100%;
  height: 100%;
}

.header-view {
  width: 100%;
}

.content {
  height: calc(100% - #{$header-height});
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
  Top: $header-height;
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

