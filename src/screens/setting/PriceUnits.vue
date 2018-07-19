<template>
  <md-list class="price-unit-list">
    <template v-for="currency in currencyList">
      <price-unit-list-item 
        :key="currency" 
        :title="currency" 
        :selected="currency === priceUnit" 
        @click="onPriceUnitClicked(currency)"
      />
      <md-divider :key="`${currency}-divider`" />
    </template>
  </md-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import BasePage from '@/screens/BasePage';
import PriceUnitListItem from '@/components/setting/PriceUnitListItem';
import { SET_PRICE_UNIT } from '@/store/modules/home';
import currencyList from '@/data/currencyList.json';
import { trackEvent } from '@/utils';

export default {
  components: {
    PriceUnitListItem,
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
    onPriceUnitClicked(currency) {
      trackEvent('Change Price Unit');
      this.setPriceUnit(currency);
    },
  },
};
</script>

<style lang="scss" scoped>
.price-unit-list {
  padding-top: 0;

  .md-list-item {
    flex-shrink: 0;
  }
}
</style>
