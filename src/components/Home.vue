<template>
  <div class="home">
    <h1>{{ msg + mdtPrice}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Current MDT Price:',
    };
  },
  computed: {
    ...mapGetters({
      mdtPrice: 'mdtPrice',
    }),
  },
  created() {
    this.$store.dispatch('getMDTPrice');
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
