
<script>
import { mapMutations } from 'vuex';
import { SET_NAVIGATION_TITLE, SET_IS_LOADING } from '@/store/modules/common';

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
      setIsLoading: SET_IS_LOADING,
    }),
  },
};
</script>

