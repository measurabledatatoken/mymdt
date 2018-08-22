<template>
  <div class="navigation-bar">
    <md-button 
      v-if="!hideBackButton" 
      data-cy="back"
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
  methods: {
    goBack() {
      this.$router.back();
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
