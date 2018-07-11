<template>
  <div id="app">
    <link 
      href="https://fonts.googleapis.com/css?family=Lato"
      rel="stylesheet"
    >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
#app {
  font-family: 'Lato', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

  -webkit-touch-callout: none;
  user-select: none; /* Disable selection/copy in UIWebView */
}

.md-menu-content-container .md-list {
  font-family: 'Lato', 'Avenir', Helvetica, Arial, sans-serif;
}

body {
  background-color: $app-bgcolor;
}
</style>
