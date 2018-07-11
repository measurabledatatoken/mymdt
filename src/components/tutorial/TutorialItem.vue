<template>
  <div class="tutorial-item">
    <div class="tutorial-item__img-container">
      <img class="icon"
           :src="imgSrc">
    </div>
    <div class="tutorial-item__title">{{ title }}</div>
    <div class="tutorial-item__description">{{ description }}</div>
    <MDTSubtleButton v-if="!isFinalPage" @click="$emit('click')">{{ $t("message.tutorial.get_started") }}</MDTSubtleButton>
    <MDTPrimaryButton v-if="isFinalPage" @click="$emit('click')">{{ $t("message.tutorial.get_started") }}</MDTPrimaryButton>
  </div>
</template>

<script>
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  props: {
    imgSrc: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isFinalPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MDTPrimaryButton,
    MDTSubtleButton,
  },
};
</script>

<style lang="scss" scoped>
.tutorial-item {
  width: calc(100% - #{24px * 2});
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-left: 24px;
  padding-right: 24px;

  .tutorial-item__img-container {
    display: flex;
    justify-content: center;
    width: 100%;

    .icon {
      margin-top: 14%;
      width: 200px;
      height: 200px;
      object-fit: contain;
    }
  }

  .tutorial-item__title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 28px;
    margin-bottom: 14px;
  }

  .tutorial-item__description {
    font-size: 16px;
  }

  .md-button {
    position: absolute;
    width: calc(100% - #{24px * 2});
    bottom: 4%;
    margin: 0px;
    font-weight: normal;
  }
}
</style>
