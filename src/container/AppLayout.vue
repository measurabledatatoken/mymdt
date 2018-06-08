<template>
  <div class="appcontainer">
    <header class="header">
      <transition :name=" 'header-' + transitionName">
        <HomeHeader v-if="showHomeHeader" class="header-view"></HomeHeader>
        <NavigationHeader v-if="!showHomeHeader" :title="navigationTitle" class="header-view"> </NavigationHeader>
      </transition>
    </header>
    <main class="content">
      <transition :name="'content-' + transitionName">
        <router-view class="content-router-view"></router-view>
      </transition>
    </main>

    <md-dialog-alert :md-active.sync="showErrorPrompt" :md-title="errorTitle" :md-content="errorMessage"
      :md-confirm-text="$t('message.common.okay')" />

    <LoadingPopup v-if="isLoading" src="static/threedotsloader.gif"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SET_SHOW_ERROR_PROMPT, SET_LOCALE } from '@/store/modules/common';
import HomeHeader from '@/components/header/HomeHeader';
import NavigationHeader from '@/components/header/NavigationHeader';
import LoadingPopup from '@/components/common/LoadingPopup';

export default {
  data() {
    return {
      showHomeHeader: true,
      transitionName: 'pop-in',
      navigationStack: [],
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
    }),
    showErrorPrompt: {
      get() {
        return this.$store.state.common.showErrorPrompt;
      },
      set(newValue) {
        this.setShowErrorPrompt(newValue);
      },
    },
  },
  components: {
    HomeHeader,
    NavigationHeader,
    LoadingPopup,
  },
  watch: {
    $route(to, from) {
      let lastPath = '';
      const navigationStackLength = this.navigationStack.length;
      if (navigationStackLength > 0) {
        lastPath = this.navigationStack[this.navigationStack.length - 1];
      }
      let isBack = false;
      if (to.path === lastPath) {
        isBack = true;
        this.navigationStack.pop();
      } else {
        this.navigationStack.push(from.path);
      }

      const toDepth = to.path.split('/').length;
      if (toDepth === undefined || toDepth <= 2) {
        this.showHomeHeader = true;
      } else {
        this.showHomeHeader = false;
      }

      this.transitionName = isBack ? 'pop-out' : 'pop-in';
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
      this.setLocale(locale);
    }
    this.$i18n.locale = locale;
  },
  methods: {
    ...mapMutations({
      setShowErrorPrompt: SET_SHOW_ERROR_PROMPT,
      setLocale: SET_LOCALE,
    }),
  },
};
</script>

<style lang="scss" scoped>
@mixin animation-active() {
  will-change: transform;
  transition: transform 500ms ease-out;
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
  position: sticky;
  top: 0;
  z-index: 3;
  height: $header-height;
  background: $home-bgcolor;
}

.header-view {
  width: 100%;
  height: $header-height;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.content-router-view {
  flex: 1;
  overflow-y: scroll;
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

  /deep/ .md-dialog-title {
    font-size: 20px;
    font-weight: bold;
  }

  /deep/ .md-button {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
  }
}

</style>

