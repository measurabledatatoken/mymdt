<template>
<SmartCaptcha class="captcha" appkey="FFFF0N0000000000643E" scene="ic_other_h5" v-bind="$attrs" v-on="$listeners" :option="captchaOption"></SmartCaptcha>
</template>

<script>
import SmartCaptcha from '@/components/input/SmartCaptcha';

export default {
  computed: {
    captchaOption() {
      return {
        default_txt: this.$t('message.recaptcha.default_txt'),
        success_txt: this.$t('message.recaptcha.success_txt'),
        fail_txt: this.$t('message.recaptcha.fail_txt'),
        scaning_txt: this.$t('message.recaptcha.scaning_txt'),
        ggk_guide: this.$t('message.recaptcha._ggk_guide'),
        ggk_success: this.$t('message.recaptcha._ggk_success'),
        ggk_loading: this.$t('message.recaptcha._ggk_loading'),
        ggk_fail: this.$t('message.recaptcha._ggk_fail'),
        ggk_action_timeout: this.$t('message.recaptcha._ggk_action_timeout'),
        ggk_net_err: this.$t('message.recaptcha._ggk_net_err'),
        ggk_too_fast: this.$t('message.recaptcha._ggk_too_fast'),
        nc_loading: this.$t('message.recaptcha.nc_loading'),
        nc_startText: this.$t('message.recaptcha.nc_startText'),
        nc_yesText: this.$t('message.recaptcha.nc_yesText'),
        nc_error300: this.$t('message.recaptcha.nc_error300'),
        nc_errorServer: this.$t('message.recaptcha.nc_errorServer'),
        nc_errorNetwork: this.$t('message.recaptcha.nc_errorNetwork'),
      };
    },
  },
  components: {
    SmartCaptcha,
  },
};
</script>

<style lang="scss" scoped>
.captcha {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
