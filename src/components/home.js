import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Current MDT Price:',
    };
  },
  computed: mapState({
    mdtPrice: state => state.mdtPrice,
  }),
  created() {
    this.$store.dispatch('getMDTPrice');
  },
};
