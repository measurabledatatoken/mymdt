<template>

  <div class="home-header">
    <md-button 
      v-if="needExit" 
      class="md-icon-button closebtn" 
      @click="returnCallback"
    >
      <md-icon md-src="/static/icons/close-white.svg"/>
    </md-button>

    <md-button 
      class="md-icon-button settingsbtn"
      @click="onSettingsClick"
    >
      <md-icon md-src="/static/icons/settings-white.svg"/>
    </md-button>
    <md-button 
      class="md-icon-button tutorialbtn" 
      @click="$emit('tutorialClick')"
    >
      <md-icon md-src="/static/icons/question-mark-home.svg"/>
    </md-button>
  </div>

</template>


<script>
import { mapState } from 'vuex';
import { trackEvent } from '@/utils';
import { RouteDef, ExitFromWalletWebviewURL } from '@/constants';

export default {
  data() {
    return {
      RouteDef,
      transactionHistoryURL: `${RouteDef.TransactionHistory.path}`,
    };
  },
  computed: {
    ...mapState({
      needExit: state => state.home.needExit,
    }),
  },
  methods: {
    returnCallback() {
      window.location = ExitFromWalletWebviewURL;
    },
    onSettingsClick() {
      trackEvent('Click on Settings button');
      this.$router.push(RouteDef.Settings.path);
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-header {
  background-color: $home-bgcolor;
}

.closebtn {
  float: left;
  height: 100%;
}

.tutorialbtn,
.settingsbtn {
  float: right;
  height: 100%;
}

.md-icon {
  color: white;
}
</style>
