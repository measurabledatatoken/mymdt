<template>
  <md-list class="price-unit-list">
    <template v-for="currency in currencyList">
      <price-unit-lis-item 
        :key="currency" 
        :title="currency" 
        :selected="currency === priceUnit" 
        @click="setPriceUnit(currency)"
      />
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
  components: {
    PriceUnitLisItem,
  },
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
  methods: {
    ...mapMutations({
      setPriceUnit: SET_PRICE_UNIT,
    }),
  },
};
</script>

<style lang="scss" scoped>
.price-unit-list {
  padding-top: 0;
}
</style>
