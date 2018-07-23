<template>
  <div class="navigation-bar">
    <md-button 
      v-if="!hideBackButton" 
      @click="goBack"
    >
      <md-icon md-src="/static/icons/arrow-back-white.svg"/>
    </md-button>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { SET_BACK_PATH } from '@/store/modules/security';
import { BACK_TO_PATH } from '@/store/modules/common';
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    hideBackButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      backPath: state => state.security.backPath,
    }),
  },
  methods: {
    ...mapActions({
      backToPath: BACK_TO_PATH,
    }),
    ...mapMutations({
      setBackPath: SET_BACK_PATH,
    }),
    goBack() {
      if (this.backPath) {
        this.backToPath(this.backPath);
        this.setBackPath(null);
      } else {
        this.$router.back();
      }
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navigation-bar {
  background-color: $home-bgcolor;
}

.md-button {
  position: absolute;
  left: 0;
  min-width: 56px;
  height: $header-height;
  margin: 0;
}

.title {
  float: left;
  color: white;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  font-size: 20px;
}
</style>
