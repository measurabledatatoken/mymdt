<template>
  <md-list class="app-view">
    <template v-for="currency in currencyList">
      <price-unit-lis-item :key="currency" :title="currency" :selected="currency === priceUnit" v-on:click="setPriceUnit(currency)" />
      <md-divider :key="`${currency}-divider`" />
    </template>
  </md-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import BasePage from '@/screens/BasePage';
import PriceUnitLisItem from '@/components/setting/PriceUnitLisItem';
import { SET_PRICE_UNIT } from '@/store/modules/home';
import currencyList from '@/data/currencyList.json';

export default {
  extends: BasePage,
  metaInfo() {
    return {
      title: this.$t('message.priceUnit.title'),
    };
  },
  data() {
    return {
      currencyList,
    };
  },
  computed: {
    ...mapState({
      priceUnit: state => state.home.priceUnit,
    }),
  },
  components: {
    PriceUnitLisItem,
  },
  methods: {
    ...mapMutations({
      setPriceUnit: SET_PRICE_UNIT,
    }),
  },
};
</script>

<style lang="scss" scoped>
.app-view {
    height: calc(100vh - #{$header-height});
    overflow-y: scroll;
    padding-top: 0;
}
</style>
