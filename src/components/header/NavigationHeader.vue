<template>
  <div class='navigation-bar'>
    <md-button v-on:click="goBack">
      <md-icon md-src="/static/icons/arrow-back-white.svg">
      </md-icon>
    </md-button>
    <div class="title">
      <p>{{ title }}</p>
    </div>
  </div>
</template>


<script>

export default {
  name: 'NavigationHeader',
  props: ['title'],
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
  height: $header-height;
  margin: 0;
}

.title {
  float: left;
  color: white;
  width: 100%;
  font-size: 20px;
}
</style>
