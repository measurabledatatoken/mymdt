<template>
  <div class="home">
    <h1>Forget Password</h1>
    <input 
      v-model="emailAddress" 
      placeholder="Email Address"
    >
    <button @click="confirmForgetPassword">Confirm</button>
    <p>
      {{
        errorMessage
      }}
    </p>
  </div>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  SET_FORGET_SUCCESS,
  REQUEST_FORGET_PASSWORD,
} from '@/store/modules/forgetpassword';
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  data() {
    return {
      emailAddress: '',
      lastEmailAddress: '',
    };
  },
  computed: {
    ...mapState({
      forgetSuccess: state => state.forgetPassword.forgetSuccess,
    }),
    errorMessage() {
      if (this.forgetSuccess === null) {
        return '';
      }

      if (this.forgetSuccess) {
        return `success, please check the email associated with ${
          this.lastEmailAddress
        }`;
      }
      return 'failed, please try again';
    },
  },
  watch: {
    emailChanged() {
      // TODO: Do real time validation
      this.setForgetSuccess(null);
    },
  },
  methods: {
    ...mapMutations({
      setForgetSuccess: SET_FORGET_SUCCESS,
    }),
    ...mapActions({
      requestForgetPassword: REQUEST_FORGET_PASSWORD,
    }),
    confirmForgetPassword() {
      this.lastEmailAddress = this.emailAddress;
      this.requestForgetPassword(this.emailAddress);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
