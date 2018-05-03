<template>
  <div class="home">
     <atom-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#5d9bec'"
    />
    <p>{{ errorMessage }}</p>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { AtomSpinner } from 'epic-spinners';
import Constants from '@/constants';

export default {
  props: [],
  name: 'AutoLogin',
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
        case Constants.ErrorCode.NoEndpointForApplication: {
          return 'Application Endpoint not set yet.';
        }
        case Constants.ErrorCode.GetAutoLoginTokenValidateFailedError: {
          return 'Token validate failed.';
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
  created() {
    const apiKey = this.$route.query.apikey;

    const userNamesStr = this.$route.query.usernames;
    const emailAddressesStr = this.$route.query.emailaddresses;
    const tokensStr = this.$route.query.tokens;

    const userNames = userNamesStr.split(',');
    const emailAddresses = emailAddressesStr.split(',');
    const authTokens = tokensStr.split(',');

    this.$store.dispatch('autoLogin',
      {
        userNames,
        emailAddresses,
        authTokens,
        apiKey,
      },
    ).then(() => {
      if (this.loginSuccess) {
        this.$router.push({ path: 'home' });
      }
    }).catch(() => ({}));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
