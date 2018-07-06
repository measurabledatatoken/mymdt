<template>
  <div v-if="active"
       class="home-tutorial">
    <swiper :options="swiperOption"
            ref="mySwiper">

      <!-- slides -->
      <swiper-slide>
        <TutorialItem imgSrc="/static/icons/tutorial-1.svg"
                      :title="$t('message.tutorial.slide_1_title')"
                      :description="$t('message.tutorial.slide_1_description')"
                      @click="onStartClicked" />
      </swiper-slide>
      <swiper-slide>
        <TutorialItem imgSrc="/static/icons/tutorial-2.svg"
                      :title="$t('message.tutorial.slide_2_title')"
                      :description="$t('message.tutorial.slide_2_description')"
                      @click="onStartClicked" />
      </swiper-slide>
      <swiper-slide>
        <TutorialItem imgSrc="/static/icons/tutorial-3.svg"
                      :title="$t('message.tutorial.slide_3_title')"
                      :description="$t('message.tutorial.slide_3_description')"
                      @click="onStartClicked" />
      </swiper-slide>
      <swiper-slide>
        <TutorialItem imgSrc="/static/icons/tutorial-4.svg"
                      :title="$t('message.tutorial.slide_4_title')"
                      :description="$t('message.tutorial.slide_4_description')"
                      :isFinalPage="true"
                      @click="onStartClicked" />
      </swiper-slide>

      <div class="swiper-pagination"
           slot="pagination">
      </div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import TutorialItem from '@/components/tutorial/TutorialItem';
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';


export default {
  props: {
    active: {
      type: Boolean,
    },
  },
  components: {
    swiper,
    swiperSlide,
    TutorialItem,
    MDTPrimaryButton,
    MDTSubtleButton,
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
  methods: {
    onStartClicked() {
      this.$emit('update:active', false);
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

  /deep/ .swiper-pagination-bullet{
    margin: 0 10px;
  }
}
</style>
