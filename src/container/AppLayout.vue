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

    <md-dialog-alert :md-active.sync="showErrorPrompt" :md-title="errorTitle" :md-content="errorMessage"
      :md-confirm-text="$t('message.common.okay')" />

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SET_SHOW_ERROR_PROMPT, SET_LOCALE } from '@/store/modules/common';
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
    ...mapState({
      navigationTitle: state => state.common.navigationTitle,
      errorMessage(state) {
        if (state.common.errorMessage instanceof String) {
          return state.common.errorMessage;
        }
        return this.$t(state.common.errorMessage.messageId);
      },
      errorTitle(state) {
        if (state.common.errorTitle instanceof String) {
          return state.common.errorTitle;
        }
        return this.$t(state.common.errorTitle.messageId);
      },
      locale: state => state.common.locale,
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
    ...mapMutations(
      {
        setShowErrorPrompt: SET_SHOW_ERROR_PROMPT,
        setLocale: SET_LOCALE,
      },
    ),
  },
};
</script>

<style lang="scss" scoped>
@mixin animation-active() {
  will-change: transform;
  transition: transform 500ms ease-out;
  position: absolute;
}

.appcontainer {
  height: inherit;
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
  min-height: calc(100% - #{$header-height});
  display: flex;
}

.content-router-view {
  width: 100%;
  bottom: 0;
  flex: 1;
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

