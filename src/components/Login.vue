<template>
  <div class="home">
    <h1>Login Page</h1>
    
    <atom-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#5d9bec'"
    />

  </div>
</template>


<script>
import { AtomSpinner } from 'epic-spinners';

export default {
  props: ['apikey'],
  name: 'Login',
  components: {
    AtomSpinner,
  },
  created() {
    console.log(`props: ${this.query}`);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
