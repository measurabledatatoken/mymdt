<template>
    <div>
        <button v-on:click="returnCallback">Back</button>
    </div>
</template>


<script>
import Constants from '@/constants';

export default {
  name: 'header',
  methods: {
    returnCallback() {
      window.location = Constants.ReturnFromWalletURL;
    },
  },
};


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
