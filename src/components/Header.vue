<template>
    <div>
        <button v-on:click="returnCallback">Back</button>
    </div>
</template>


<script>
import { ErrorCode } from '@/constants';

export default {
  name: 'header',
  methods: {
    returnCallback() {
      window.location = ErrorCode.ReturnFromWalletURL;
    },
  },
};


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
