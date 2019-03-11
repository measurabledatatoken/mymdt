<template>
  <div class="tutorial-item">
    <div class="tutorial-item__img-container">
      <img 
        :src="imgSrc"
        class="icon"
      >
    </div>
    <div class="tutorial-item__title">{{ title }}</div>
    <div class="tutorial-item__description">{{ description }}</div>
    <template v-if="hasClickListener">
      <MDTSubtleButton 
        v-if="!isFinalPage" 
        class="action-button"
        @click="$emit('click')"
      >{{ $t("message.common.skip") }}</MDTSubtleButton>
      <MDTPrimaryButton 
        v-if="isFinalPage" 
        class="action-button"
        @click="$emit('click')"
      >{{ $t("message.tutorial.get_started") }}</MDTPrimaryButton>
    </template>
    <slot name="action" />
  </div>
</template>

<script>
import MDTPrimaryButton from '@/components/button/MDTPrimaryButton';
import MDTSubtleButton from '@/components/button/MDTSubtleButton';

export default {
  components: {
    MDTPrimaryButton,
    MDTSubtleButton,
  },
  props: {
    imgSrc: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    isFinalPage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasClickListener() {
      return this.$listeners && this.$listeners.click;
    },
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

  .action-button {
    position: absolute;
    width: calc(100% - #{24px * 2});
    bottom: 4%;
    margin: 0px;
    font-weight: normal;
  }
}
</style>
