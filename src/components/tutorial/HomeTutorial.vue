<template>
  <div 
    v-if="active"
    class="home-tutorial"
  >
    <swiper 
      ref="mySwiper"
      :options="swiperOption"
      @slideChange="onSlideChanged"
    >

      <!-- slides -->
      <swiper-slide>
        <TutorialItem 
          :title="$t('message.tutorial.slide_1_title')"
          :description="$t('message.tutorial.slide_1_description')"
          img-src="/static/icons/tutorial-1.svg"
          @click="onStartClicked"
        />
      </swiper-slide>
      <swiper-slide>
        <TutorialItem 
          :title="$t('message.tutorial.slide_2_title')"
          :description="$t('message.tutorial.slide_2_description')"
          img-src="/static/icons/tutorial-2.svg"
          @click="onStartClicked"
        />
      </swiper-slide>
      <swiper-slide>
        <TutorialItem 
          :title="$t('message.tutorial.slide_3_title')"
          :description="$t('message.tutorial.slide_3_description')"
          img-src="/static/icons/tutorial-3.svg"
          @click="onStartClicked"
        />
      </swiper-slide>
      <swiper-slide>
        <TutorialItem 
          :title="$t('message.tutorial.slide_4_title')"
          :description="$t('message.tutorial.slide_4_description')"
          :is-final-page="true"
          img-src="/static/icons/tutorial-4.svg"
          @click="onStartClicked"
        />
      </swiper-slide>

      <div 
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import TutorialItem from '@/components/tutorial/TutorialItem';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';
import { trackEvent } from '@/utils';

export default {
  components: {
    swiper,
    swiperSlide,
    TutorialItem,
    MDTPrimaryButton,
    MDTSubtleButton,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  watch: {
    active(newValue) {
      if (newValue == true) {
        trackEvent(`View tutorial slide 0`);
      }
    },
  },
  methods: {
    onStartClicked() {
      this.$emit('update:active', false);
    },
    onSlideChanged() {
      trackEvent(
        `View tutorial slide ${this.$refs.mySwiper.swiper.activeIndex}`,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.home-tutorial {
  background-color: white;
  width: 100%;
  height: 100%;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swipe-slide {
  width: 100%;
  height: 100%;
}

.swiper-pagination {
  bottom: 20%;

  /deep/ .swiper-pagination-bullet {
    margin: 0 10px;
  }
}
</style>
