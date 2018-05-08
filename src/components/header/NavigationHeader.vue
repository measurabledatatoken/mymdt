<template>
    <div>
        <div id='navigation-bar'>
          <button v-on:click="goBack">Back</button>
          Navigation Bar
        </div>
    </div>
</template>


<script>

export default {
  name: 'NavigationHeader',
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
