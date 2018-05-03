<template>
  <div class="home">
    <h1>Login Page</h1>
    <input v-model="emailAddress" placeholder="Email Address">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="confirmLogin">Login</button>
    <p>{{errorMessage}}</p>
    <atom-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#5d9bec'"
    />

  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { AtomSpinner } from 'epic-spinners';
import Constants from '@/constants';

export default {
  props: [],
  name: 'Login',
  data() {
    return {
      emailAddress: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters({
      loginErrorCode: 'loginErrorCode',
      loginSuccess: 'loginSuccess',
    }),
    errorMessage() {
      switch (this.loginErrorCode) {
        case Constants.ErrorCode.NoApplicationFound: {
          return 'Application not exist.';
        }
        case Constants.ErrorCode.UserEmailAddressNotConfirmed: {
          return 'Email address is not confirmed. Resend confirmation email. Press here';
        }
        case Constants.ErrorCode.UserPasswordNotExist: {
          return 'You have not set any password yet. Please set';
        }
        case Constants.ErrorCode.UserCredentailWrong: {
          return 'This email passowrd combination do not exist';
        }
        case Constants.ErrorCode.UserDisabled: {
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
  components: {
    AtomSpinner,
  },
  methods: {
    confirmLogin() {
      this.requested = true;
      this.$store.dispatch(
        'confirmLogin',
        {
          emailAddress: this.emailAddress,
          password: this.password,
        },
      ).then(() => {
        if (this.loginSuccess) {
          this.$router.push({ path: 'home' });
        }
      }).catch(() => ({}));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
