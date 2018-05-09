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
import { ErrorCode, RouteDef } from '@/constants';

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
        case ErrorCode.NoApplicationFound: {
          return 'Application not exist.';
        }
        case ErrorCode.NoEndpointForApplication: {
          return 'Application Endpoint not set yet.';
        }
        case ErrorCode.GetAutoLoginTokenValidateFailedError: {
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
    const tokensStr = this.$route.query.tokens;

    if (apiKey === undefined || tokensStr === undefined) {
      this.$router.push(RouteDef.Login);
      return;
    }

    const authTokens = tokensStr.split(',');

    this.$store.dispatch('autoLogin',
      {
        authTokens,
        apiKey,
      },
    ).then(() => {
      if (this.loginSuccess) {
        this.$router.push(RouteDef.Home);
      }
    }).catch(
      () => {
        this.$router.push(RouteDef.Login);
      },
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
