<template>
  <div class="home">
    <h1>Login Page</h1>
    <input v-model="emailAddress" placeholder="Email Address">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="confirmLogin">Login</button>

    <div><router-link to="/register">Register</router-link></div>
    <div><router-link to="/forgetpassword">Forget Password</router-link></div>
    <p>{{errorMessage}}</p>

  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import { REQUEST_LOGIN } from '@/store/modules/login';
import { RouteDef } from '@/constants';
import { ErrorCode } from '@/enum';
import BasePage from '@/screens/BasePage';

export default {
  extends: BasePage,
  props: [],
  data() {
    return {
      emailAddress: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      loginErrorCode: state => state.login.loginErrorCode,
      loginSuccess: state => state.login.loginSuccess,
    }),
    errorMessage() {
      switch (this.loginErrorCode) {
        case ErrorCode.NoApplicationFound: {
          return 'Application not exist.';
        }
        case ErrorCode.UserEmailAddressNotConfirmed: {
          return 'Email address is not confirmed. Resend confirmation email. Press here';
        }
        case ErrorCode.UserPasswordNotExist: {
          return 'You have not set any password yet. Please set';
        }
        case ErrorCode.UserCredentailWrong: {
          return 'This email passowrd combination do not exist';
        }
        case ErrorCode.UserDisabled: {
          return 'User disabled, please contact admin at support@matiltime.com.';
        }
        case null: {
          return '';
        }
        default: {
          return 'Unknown error, please try again';
        }
      }
    },
  },
  methods: {
    ...mapActions({
      requestLogin: REQUEST_LOGIN,
    }),
    confirmLogin() {
      this.requested = true;
      this.requestLogin(
        {
          emailAddress: this.emailAddress,
          password: this.password,
        },
      ).then(() => {
        if (this.loginSuccess) {
          this.$router.push(RouteDef.Home.path);
        }
      }).catch(() => ({}));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
