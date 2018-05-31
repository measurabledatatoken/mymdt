
<script>
import { mapMutations } from 'vuex';
import { SET_NAVIGATION_TITLE } from '@/store/modules/common';

export default {
  metaInfo() {
    return {
    };
  },
  created() {
    this.setNavigationTitle(this.$metaInfo.title);
  },
  methods: {
    ...mapMutations({
      setNavigationTitle: SET_NAVIGATION_TITLE,
    }),
  },
};
</script>

<style>

</style>
