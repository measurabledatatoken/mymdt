<template>
  <div class="home">
    <h1>Forget Password</h1>
    <input v-model="emailAddress" placeholder="Email Address">
    <button v-on:click="confirmForgetPassword">Confirm</button>
    <p>{{
      forgetPasswordMessage
      }}</p>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'forgetpassword',
  created() {
  },
  data() {
    return {
      emailAddress: '',
      requested: false,
    };
  },
  computed: {
    ...mapGetters({
      forgetSuccess: 'forgetSuccess',
    }),
    forgetPasswordMessage() {
      if (this.requested === false) {
        return '';
      }

      if (this.forgetSuccess) {
        return `success, please check the email associated with ${this.emailAddress}`;
      }
      return 'failed, please try again';
    },
  },
  methods: {
    confirmForgetPassword() {
      this.requested = true;
      this.$store.dispatch('confirmForgetPassword', this.emailAddress);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
