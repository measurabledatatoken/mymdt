<template>
  <BaseField class="recaptcha-field" v-bind="$attrs">
    <vue-recaptcha
      class="recaptcha"
      sitekey="6LcyaVoUAAAAAO4bHCKeCJTsdJDbgq04n-3OUOSF"
      v-on="$listeners"
    />
  </BaseField>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import BaseField from '@/components/input/BaseField';

export default {
  components: {
    VueRecaptcha,
    BaseField,
  },
};
</script>

<style lang="scss" scoped>
.recaptcha-field {
  margin-bottom: 0px;

  /deep/ .md-field {
    justify-content: center;

    &::after {
      display: none;
    }
  }
}

.recaptcha {
  /deep/ > div {
    margin: auto;
  }

  /deep/ iframe {
    height: 4.875rem;
  }
}
</style>
