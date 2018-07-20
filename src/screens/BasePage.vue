
<script>
import { mapMutations } from 'vuex';
import {
  SET_NAVIGATION_TITLE,
  SET_IS_LOADING,
  SET_HIDE_NAVIGATION_BACK_BUTTON,
} from '@/store/modules/common';

export default {
  metaInfo() {
    return {};
  },
  created() {
    // if title is not set, inherit from previous screen. This behaviour is to cater WebView
    if (this.$metaInfo.title) {
      this.setNavigationTitle(this.$metaInfo.title);
    }
    this.setHideNavigationBackButton(false);
  },
  methods: {
    ...mapMutations({
      setNavigationTitle: SET_NAVIGATION_TITLE,
      setHideNavigationBackButton: SET_HIDE_NAVIGATION_BACK_BUTTON,
      setIsLoading: SET_IS_LOADING,
    }),
  },
};
</script>
