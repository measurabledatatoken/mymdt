
<script>
import { mapMutations } from 'vuex';
import { SET_NAVIGATION_TITLE, SET_IS_LOADING } from '@/store/modules/common';

export default {
  metaInfo() {
    return {};
  },
  created() {
    // if title is not set, inherit from previous screen. This behaviour is to cater WebView
    if (this.$metaInfo.title) {
      this.setNavigationTitle(this.$metaInfo.title);
    }
  },
  methods: {
    ...mapMutations({
      setNavigationTitle: SET_NAVIGATION_TITLE,
      setIsLoading: SET_IS_LOADING,
    }),
  },
};
</script>
