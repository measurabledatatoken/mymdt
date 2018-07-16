<template>
  <div 
    :style="appContainerStyle" 
    class="appcontainer"
  >
    <header class="header">
      <transition :name=" 'header-' + transitionName">
        <HomeHeader 
          v-if="showHomeHeader && !showCustomHeader" 
          class="header-view" 
          @tutorialClick="onTutorialClicked"
        />
        <NavigationHeader 
          v-if="!showHomeHeader && !showCustomHeader" 
          :title="navigationTitle" 
          class="header-view"
        />
        <router-view 
          v-if="showCustomHeader" 
          class="view two" 
          name="header"
        />
      </transition>
    </header>
    <main class="content">
      <transition :name="'content-' + transitionName">
        <router-view class="content-router-view"/>
      </transition>
    </main>

    <md-dialog-alert 
      :md-active.sync="showErrorPrompt" 
      :md-title="errorTitle" 
      :md-content="errorMessage"
      :md-confirm-text="$t('message.common.okay')"
    />

    <LoadingPopup 
      v-if="isLoading" 
      src="/static/threedotsloader.gif"
    />

    <HomeTutorial :active.sync="showTutorial"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { trackEvent } from '@/utils';
import {
  DISMISS_ERROR_PROMPT,
  SET_LOCALE,
  ADD_NAVIGATION_STACK,
  POP_NAVIGATION_STACK,
  POP_NAVIGATION_STACK_TO_PATH,
  FLUSH_NAVIGATION_STACK,
} from '@/store/modules/common';
import HomeHeader from '@/components/header/HomeHeader';
import NavigationHeader from '@/components/header/NavigationHeader';
import LoadingPopup from '@/components/common/LoadingPopup';
import HomeTutorial from '@/components/tutorial/HomeTutorial';

export default {
  components: {
    HomeHeader,
    NavigationHeader,
    LoadingPopup,
    HomeTutorial,
  },
  data() {
    return {
      showHomeHeader: true,
      transitionName: 'pop-in',
      showTutorial: false,
      screenHeight: 0,
      setFixHeight: false,
    };
  },
  computed: {
    ...mapState({
      navigationTitle: state => state.common.navigationTitle,
      errorMessage(state) {
        if (typeof state.common.errorMessage === 'string') {
          return state.common.errorMessage;
        }

        if (state.common.errorMessage && state.common.errorMessage.messageId) {
          return this.$t(state.common.errorMessage.messageId);
        }

        return '';
      },
      errorTitle(state) {
        if (typeof state.common.errorTitle === 'string') {
          return state.common.errorTitle;
        }

        if (state.common.errorTitle && state.common.errorTitle.messageId) {
          return this.$t(state.common.errorTitle.messageId);
        }

        return '';
      },
      locale: state => state.common.locale,
      isLoading: state => state.common.isLoading,
      navigationStack: state => state.common.navigationStack,
    }),
    ...mapGetters({
      isPathExistInNavigationStack: 'isPathExistInNavigationStack',
    }),
    showErrorPrompt: {
      get() {
        return this.$store.state.common.showErrorPrompt;
      },
      set() {
        this.dismissErrorPrompt();
      },
    },
    showCustomHeader() {
      if (Array.isArray(this.$route.matched)) {
        const currentMatch = this.$route.matched[
          this.$route.matched.length - 1
        ];
        if (currentMatch.components && currentMatch.components.header) {
          return true;
        }
      }

      return false;
    },
    appContainerStyle() {
      const style = {};
      if (this.setFixHeight) {
        style.height = `${this.screenHeight}px`;
        style.overflow = 'scroll';
      }
      return style;
    },
  },
  watch: {
    $route(to, from) {
      // do not modify the stack if to and from are equal
      if (to.path !== from.path) {
        let isBack = false;
        const isPathExistInNavStack = this.isPathExistInNavigationStack(
          to.path,
        );

        if (isPathExistInNavStack) {
          isBack = true;
          this.popNavigationStackToPath(to.path);
        } else {
          this.addNavigationStack(from.path);
        }

        const toDepth = to.path.split('/').length;
        if (toDepth === undefined || toDepth <= 2) {
          this.showHomeHeader = true;
        } else {
          this.showHomeHeader = false;
        }

        this.transitionName = isBack ? 'pop-out' : 'pop-in';
      }
      this.checkRouteMeta();
    },
  },
  created() {
    let locale = this.$route.query.lang;
    if (locale === undefined) {
      const storeState = this.locale;
      if (storeState !== null) {
        locale = storeState;
      } else {
        locale = 'en-us';
      }
    } else {
      locale = locale.toLowerCase();
      this.setLocale(locale);
    }
    this.$i18n.locale = locale;

    this.flushNavigationStack();
  },
  mounted() {
    this.prepareMetaData();
    this.checkRouteMeta();
  },
  methods: {
    ...mapMutations({
      setLocale: SET_LOCALE,
      addNavigationStack: ADD_NAVIGATION_STACK,
      popNavigationStack: POP_NAVIGATION_STACK,
      popNavigationStackToPath: POP_NAVIGATION_STACK_TO_PATH,
      flushNavigationStack: FLUSH_NAVIGATION_STACK,
    }),
    ...mapActions({
      dismissErrorPrompt: DISMISS_ERROR_PROMPT,
    }),
    onTutorialClicked() {
      this.showTutorial = true;
      trackEvent('Click on Info button (the question mark button)');
    },
    prepareMetaData() {
      this.screenHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    },
    checkRouteMeta() {
      this.setFixHeight = !!this.$route.meta.setFixHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin animation-active() {
  will-change: transform;
  transition: transform 250ms ease-out;
  position: absolute;
  width: 100%;
  bottom: 0;
}

.appcontainer {
  height: inherit;
  display: flex;
  flex-direction: column;
}

.header {
  position: absolute;
  top: 0;
  z-index: 10;
  height: $header-height;
  background: $home-bgcolor;
  width: 100%;
}

.header-view {
  height: $header-height;
}

.content {
  width: 100%;
  margin-top: $header-height;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.content-router-view {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
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
  top: $header-height;
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

.md-dialog {
  text-align: left;

  /deep/ .md-dialog-container {
    width: 100%;
  }

  /deep/ .md-dialog-title {
    font-size: 20px;
    font-weight: bold;
  }

  /deep/ .md-dialog-content {
    word-wrap: break-word;
  }

  /deep/ .md-button {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
  }

  /deep/ .md-dialog-actions {
    padding: 8px;
  }
}

.home-tutorial {
  position: absolute;
  z-index: 10;
}
</style>
