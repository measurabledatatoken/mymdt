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
      lastEmailAddress: '',
    };
  },
  watch: {
    emailAddress: function emailChanged(newEmailAddress, oldEmailAddress) {
      // TODO: Do real time validation
      this.$store.commit('setForgetSuccess', null);
      console.log(`watch emailAddress ${newEmailAddress} ${oldEmailAddress}`);
    },
  },
  computed: {
    ...mapGetters({
      forgetSuccess: 'forgetSuccess',
    }),
    forgetPasswordMessage() {
      if (this.forgetSuccess === null) {
        return '';
      }

      if (this.forgetSuccess) {
        return `success, please check the email associated with ${this.lastEmailAddress}`;
      }
      return 'failed, please try again';
    },
  },
  methods: {
    confirmForgetPassword() {
      this.lastEmailAddress = this.emailAddress;
      this.$store.dispatch('confirmForgetPassword', this.emailAddress);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
