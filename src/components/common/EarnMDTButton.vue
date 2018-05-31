<template>
  <md-button :to="earnMDTUrl" class="earn-mdt md-raised md-primary">{{ $t('message.home.earn_mdt') }} </md-button>
</template>

<script>
import { RouteDef } from '@/constants';

export default {
  data() {
    return {
      earnMDTUrl: `${RouteDef.EarnMDT.path}`,
    };
  },
};
</script>

<style lang="scss" scoped>
  .md-button.earn-mdt {
    @include primaryButtonStyle;
    @include center_horizontal;
  }
</style>

